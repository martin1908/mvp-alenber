/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'NodeJS Base'
  });
};

exports.getFaq = (req, res) => {
  res.render('faq')
}

exports.getSubscripcion = (req, res) => {
  res.render('subscripcion')
}