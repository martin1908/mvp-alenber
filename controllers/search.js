exports.getHome = (req, res) => {
	res.render('search/home',{
		title: 'Buscar'
	})
}

exports.getProducts = (req, res) => {
	res.render('search/products', {
		title: 'Buscar productos',
		search: true
	})
}

exports.getServices = (req, res) => {
	res.render('search/services', {
		title: 'Buscar servicios',
		search: true
	})
}

exports.getOrders = (req, res) => {
	res.render('search/orders', {
		title: 'Buscar pedidos',
		search: true
	})
}

exports.getEnterprises = (req, res) => {
	res.render('search/enterprises', {
		title: 'Ver empresa',
		search: true
	})
}