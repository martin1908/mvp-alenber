const dotenv = require('dotenv');
const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
const request = require('request');
const jwt = require('jsonwebtoken')

dotenv.load({ path: '.env' });

/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
  console.log(process.env.API_URL)
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {

  const credenciales = {
    email: req.body.email,
    password: req.body.password
  }

  request.post({url:process.env.API_URL+'/login', form: credenciales }, (err, response, body) => {
    if (err) return res.status(500).send(err)
    
    var data = JSON.parse(body)

    if (response.statusCode == 500) {
      req.flash('errors', { msg: `${data.message}`})
      return res.redirect('/login');
    }
    if (response.statusCode == 400) {
      req.flash('errors', { msg: `${data.message}`})
      return res.redirect('/login');
    }
    if (response.statusCode == 401) {
      req.flash('errors', { msg: `${data.message}`})
      return res.redirect('/login');
    }
    if (response.statusCode == 200) {
      passport.authenticate('local', (err, user, info) => {
        console.log('Dentro de authenticate: ', user)
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, (err) => {
          if (err) { return next(err); }
          req.flash('success', { msg: `${data.message}` });
          res.redirect(req.session.returnTo || '/');
        });
      })(req, res, next);
    }
  })
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Crear Cuenta'
  });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {

  const credencialesR = {
    tradename: req.body.tradename,
    ruc: req.body.ruc,
    name: req.body.name,
    surnames: req.body.surnames,
    typeUser: req.body.typeUser,
    email: req.body.email,
    password: req.body.password,
    position: req.body.position,
    whatsapp: req.body.whatsapp,
    phone: req.body.phone
  }
  console.log('Viendo las credenciales: ', credencialesR)
  request.post({
    url:process.env.API_URL+'/signup',
    form: credencialesR
  }, (err, response, body) => {
    if (err) return res.status(500).send(err)

    var data = JSON.parse(body)

    if (response.statusCode == 500) {
      req.flash('errors', { msg: `${data.message}`})
      return res.redirect('/signup')
    }
    if (response.statusCode == 409) {
      req.flash('errors', { msg: `${data.message}`})
      return res.redirect('/signup')
    }
    if (response.statusCode == 201) {
      passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) { return res.redirect('/signup') }
        req.logIn(user, (err) => {
          if (err) { return next(err) }
          req.flash('success', { msg: `${data.message}` })
          res.redirect(req.session.returnTo || '/')
        })
      })(req, res, next)
    }
  })
}

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = (req, res) => {
  res.render('account/profile', {
    title: 'Perfil'
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.password = req.body.password;
    user.save((err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
  User.remove({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    req.flash('info', { msg: 'Your account has been deleted.' });
    res.redirect('/');
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = (req, res, next) => {
  const provider = req.params.provider;
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user[provider] = undefined;
    user.tokens = user.tokens.filter(token => token.kind !== provider);
    user.save((err) => {
      if (err) { return next(err); }
      req.flash('info', { msg: `${provider} account has been unlinked.` });
      res.redirect('/account');
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  request.get({
		url: process.env.API_URL+'/token-reset/'+req.params.token
	}, (err, response, body) => {
    console.log(body)
    if (err) { return next(err); }
    let user = JSON.parse(body).foundUser
    console.log(user)
    if (!user) {
      req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('/forgot');
    }
    res.render('account/reset', {
      title: 'Reiniciar Contraseña',
      user
    })
	})
}

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
  req.assert('password', 'Password must be at least 4 characters long.').len(4);
  req.assert('confirm', 'Passwords must match.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  request.post({
    url: process.env.API_URL+'/token-reset/'+req.params.token,
    form: {
      password: req.body.password,
      passwordResetToken : undefined,
      passwordResetExpires: undefined
    }
  }, (err, response, body) => {
    let data = JSON.parse(body).savedForgot
    console.log('Viendo al usuario con su pass nueva: ',data)
    if (!data) {
      req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('back')
    }
    
    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    })
    const mailOptions = {
      to: data.email,
      from: 'no-reply@alenber.com',
      subject: 'Su contraseña de Alenber ha sido cambiada',
      text: `Hola,\n\nEsta es una confirmación de que la contraseña de su cuenta ${data.email} acaba de ser modificada.\n`
    }
    transporter.sendMail(mailOptions)

    const credenciales = {
      email: data.email,
      password: req.body.password
    }
    console.log('Viendo las credenciales:', credenciales)

    request.post({url:process.env.API_URL+'/login', form: credenciales }, (err, response, body) => {
      if (err) return res.status(500).send(err)
      var data = JSON.parse(body)
      console.log('Viendo el inicio de sesion luego de cambiar el pass: ', data)

      passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
          req.flash('success', { msg: '¡Éxito! Tu contraseña ha sido cambiada. Ahora inicia sesión con tu nueva contraseña.' })
          return res.redirect('/login'); 
        }
        req.logIn(user, (err) => {
          console.log('Dentro de authenticate: ', user)
          if (err) { return next(err); }
          res.redirect('/')
        })
      })(req, res, next)
    })
  })
}

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Recuperar Contraseña'
  });
};

exports.getForgot2 = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot2', {
    title: 'Enviando correo'
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  const token = jwt.sign(
    {
      email: req.body.email
    },
    process.env.JWT_KEY,
    {
      expiresIn: '1h'
    }
  )
  request.post({
    url: 'https://alenber.herokuapp.com/api/email-passport/'+req.body.email,
    form: {
      passwordResetToken : token,
      passwordResetExpires: Date.now() + 3600000
    }
  }, (err, response, data) => {
    let usuario = JSON.parse(data).savedForgot
    console.log(usuario)
    if (!usuario) {
      req.flash('errors', { msg: 'Account with that email address does not exist.' });
    }
    else {
      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      })
      const mailOptions = {
        to: usuario.email,
        from: 'no-reply@alenber.com',
        subject: 'Reinicia tu contraseña en Alenber',
        text: `Has recibido este correo porque solicitaste reiniciar tu contraseña (o quizás alguien más lo hizo).\n\n
              Para continuar, haz click o copia en tu navegador el siguiente enlace:\n\n
              http://${req.headers.host}/reset/${token}\n\n
              Si tu no solicitaste esto, ignora el mensaje.\n`
      }
      transporter.sendMail(mailOptions)
      req.flash('info', { msg: `Se envió un correo a ${usuario.email} con las instrucciones de recuperación.` })
      res.redirect('/forgot2')
    }
  })
}
