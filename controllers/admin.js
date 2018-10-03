const dotenv = require('dotenv');
dotenv.load({ path: '.env' });
const request = require('request');

exports.getHome = (req, res) => {
	console.log('*********')
	console.log(req.user)
	res.render('admin/home', {
		userData: req.user
	})
}

exports.getUsers = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/users', 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body).allUsers)
		res.render('admin/getUsers', {
			users: JSON.parse(body).allUsers
		})
	})
}

exports.getUserDetail = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/users/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		var data = JSON.parse(body)
		console.log('Viendo la data del usuario: ', data)
		res.render('admin/userDetail', {
			userData: data
		})
	})
}

exports.getUpdateUser = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/users/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body).user)
		res.render('admin/updateUser', {
			userData: JSON.parse(body).user
		})
	})
}

exports.postUpdateUser = (req, res) => {
	request.patch({
		url: process.env.API_URL+'/admin/users/'+req.params.id,
		form: req.body,
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Editado"})
		res.redirect('/admin/usuarios/editar/'+req.params.id)
	})
}

exports.getDeleteUser = (req, res) => {
	// res.send(req.params.id)
	request.delete({
		url: process.env.API_URL+'/admin/users/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Usuario eliminado"})
		res.redirect('/admin/usuarios')
	})
}

exports.postMakeUserPremium = (req, res) => {
	res.send('ok')
}

exports.getTestimonies = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/testimonies', 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('admin/testimonies', {
			allTestimonies: JSON.parse(body).allTestimonies
		})
	})
}

exports.getTestimonyDetail = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/testimony/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('admin/testimonyDetail', {
			testimonyData: JSON.parse(body).foundTestimony
		})
	})
}

exports.getUpdateTestimony = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/testimony/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('admin/updateTestimony', {
			testimonyData: JSON.parse(body).foundTestimony
		})
	})
}

exports.postUpdateTestimony = (req, res) => {
	request.patch({
		url: process.env.API_URL+'/admin/testimony/'+req.params.id, 
		form: req.body,
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Editado"})
		res.redirect('back')
	})

}

exports.getDeleteTestimony = (req, res) => {
	request.delete({
		url: process.env.API_URL+'/admin/testimony/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Testimonio eliminado"})
		res.redirect('/admin/testimonios')
	})
}

exports.getCreateTestimony = (req, res) => {
	res.render('admin/createTestimony')
}

exports.postCreateTestimony = (req, res) => {
	res.send('ok')
}

exports.getAdvertisings = (req, res) => {
	request.get({
		url: process.env.API_URL+'/admin/publicities', 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('admin/advertising', {
			allPublicities: JSON.parse(body).allPublicities
		})
	})
}

exports.getCreateAdvertising = (req, res) => {
	res.render('admin/createAdvertising')
}

exports.postCreateAdvertising = (req, res) => {
	res.send('ok')
}

exports.getAdvertisingDetail = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/publicity/'+req.params.id, 
		headers: {
		'authorization': 'Bearer ' + req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('admin/advertisingDetail', {
			publicity: JSON.parse(body).getPublicity
		})
	})
}

exports.getUpdateAdvertising = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/publicity/'+req.params.id, 
		headers: {
		'authorization': 'Bearer ' + req.user.token
		}
	}, (err, response, body) => {
		let data = JSON.parse(body)
		console.log(data)
		res.render('admin/updateAdvertising', {
			publicity: data.getPublicity
		})
	})
}

exports.postUpdateAdvertising = (req, res) => {
	request.patch({
		url: process.env.API_URL+'/admin/publicity/'+req.params.id, 
		form: req.body,
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Editado"})
		res.redirect('back')
	})
}

exports.postDeleteAdvertising = (req, res) => {
	request.delete({
		url: process.env.API_URL+'/admin/publicity/'+req.params.id, 
		form: req.body,
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Publicidad eliminada"})
		res.redirect('/admin/publicidad')
	})
}

exports.getLogos = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/logos', 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('admin/logos', {
			allLogos: JSON.parse(body).allLogos
		})
	})
}

exports.getLogoDetail = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/logo/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('admin/logoDetail', {
			logoData: JSON.parse(body).foundLogo
		})
	})
}

exports.getUpdateLogo = (req, res) => {
	request({
		url: process.env.API_URL+'/admin/logo/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('admin/updateLogo', {
			logoData: JSON.parse(body).foundLogo
		})
	})
}

exports.postUpdateLogo = (req, res) => {
	request.patch({
		url: process.env.API_URL+'/admin/logo/'+req.params.id, 
		form: req.body,
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Editado"})
		res.redirect('back')
	})
}

exports.getCreateLogo = (req, res) => {
	res.render('admin/createLogo')
}

exports.postCreateLogo = (req, res) => {
	res.send('ok')
}

exports.getDeleteLogo = (req, res) => {
	request.delete({
		url: process.env.API_URL+'/admin/logo/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Logo eliminado"})
		res.redirect('/admin/logos')
	})
}
