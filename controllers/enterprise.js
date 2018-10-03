const request = require('request')

exports.getDetail = (req, res) => {
	request.get({
		url: process.env.API_URL+'/enterprise',
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		var data = JSON.parse(body)
		console.log('Viendo la data de la empresa: ', data)
		res.render('enterprise/detail', {
			empresa: data.foundEnterprise,
			productos: data.foundProduct,
			certificaciones: data.foundCertification,
			premios: data.foundAward,
			videos: data.foundVideo
		})
	})
}

exports.postUpdateDescription = (req, res) => {
	res.send('ok')
}

exports.postUpdateAbout = (req, res) => {
	res.send('ok')
}

exports.postUpdateCertification = (req, res) => {
	res.send('ok')
}

exports.postUpdatePrize = (req, res) => {
	res.send('ok')
}

exports.postUpdateVideo = (req, res) => {
	res.send('ok')
}

exports.postCreateRecommendation = (req, res) => {
	res.send('ok')
}

exports.postCreateVideo = (req, res) => {
	console.log('Viendo la data que entra: ', req.body)
	request.post({
		url: process.env.API_URL+'/video', 
		form: req.body,
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Video creado con éxito"})
		res.redirect('back')
	})
}

exports.postDeleteVideo = (req, res) => {
	request.delete({
		url: process.env.API_URL+'/video/'+req.params.id, 
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Video eliminado"})
		res.redirect('back')
	})
}

exports.postCreatePrize = (req, res) => {
	console.log('Viendo la data que entra: ', req.body)
	request.post({
		url: process.env.API_URL+'/award', 
		form: req.body,
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Premio creada con éxito"})
		res.redirect('back')
	})
}

exports.postDeletePrize = (req, res) => {
	request.delete({
		url: process.env.API_URL+'/award/'+req.params.id, 
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Premio eliminada"})
		res.redirect('back')
	})
}

exports.postCreateCertification = (req, res) => {
	console.log('Viendo la data que entra: ', req.body)
	request.post({
		url: process.env.API_URL+'/certificate', 
		form: req.body,
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Certificación creada con éxito"})
		res.redirect('back')
	})
}

exports.postDeleteCertification = (req, res) => {
	request.delete({
		url: process.env.API_URL+'/certificate/'+req.params.id, 
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Certificación eliminada"})
		res.redirect('back')
	})
}

exports.getContact = (req, res) => {
	res.render('enterprise/contact')
}

exports.getOrders = (req, res) => {
	res.render('enterprise/orders')
}

exports.getOrderDetail = (req, res) => {
	res.render('enterprise/orderDetail')
}

exports.getQuotationDetail = (req, res) => {
	res.render('enterprise/quotationDetail')
}

exports.getCreateProduct = (req, res) => {
  request.get({
		url: process.env.API_URL+'/product',
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		var data = JSON.parse(body)
		console.log('Viendo la data: ', data)
		res.render('enterprise/createProduct', {
			clasificaciones: data.foundAllCla,
			subclasificaciones: data.foundAllSubCla,
			categorias: data.foundCategories,
		})
	})
}

exports.postCreateProduct = (req, res) => {
	const SpecificationSumary = [];
	if(!Array.isArray(req.body.attribute)){
		SpecificationSumary.push({
			attribute: req.body.attribute,
			value: req.body.value,
		})
	}else{
		for(var i=0; i<req.body.attribute.length; i++){
			SpecificationSumary.push({
				attribute: req.body.attribute[i],
				value: req.body.value[i],
			})
		}
	}
	req.body.SpecificationSumary = SpecificationSumary;
	request.post({
		url: process.env.API_URL+'/product', 
		form: req.body,
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Producto creado con éxito"})
		res.redirect('/empresa/productos')
	})
}

exports.postUpdateProduct = (req, res) => {
	res.send('ok')
}

exports.getUpdateProduct = (req, res) => {
	res.render('enterprise/updateProduct')
}
exports.getUpdate = (req, res) => {
	request.get({
		url: process.env.API_URL+'/enterprise',
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		var data = JSON.parse(body)
		console.log(data)
		res.render('enterprise/editEnterprise', {
			empresa: data.foundEnterprise,
			productos: data.foundProduct,
			certificaciones: data.foundCertification,
			premios: data.foundAward,
			videos: data.foundVideo
		})
	})
}

exports.getProductDetail = (req, res) => {
	request.get({
		url: process.env.API_URL+'/product/'+req.params.id,
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		var data = JSON.parse(body)
		console.log(data.foundProduct.idSpecificationSumary)
		res.render('enterprise/productDetail', {
			producto: data.foundProduct
		})
	})
}

exports.getCreateService = (req, res) => {
	res.render('enterprise/createService')
}

exports.postCreateService = (req, res) => {
	res.send('ok')
}

exports.getUpdateService = (req, res) => {
	res.render('enterprise/updateService')
}

exports.getServiceDetail = (req, res) => {
	res.render('enterprise/serviceDetail')
}

exports.getRecomendations = (req, res) => {
	res.render('enterprise/recomendations')
}


exports.getProducts = (req, res) => {
	request.get({
		url: process.env.API_URL+'/products',
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		var data = JSON.parse(body)
		console.log(data)
		res.render('enterprise/products', {
			productos: data.foundProducts,
			categorias: data.foundCategories,
		})
	})
}

exports.postUpdateCategory = (req, res) => {
	res.send('ok')
}

exports.postCreateCategory = (req, res) => {
	res.send('ok')
}

exports.postUpdateEnterprise = (req, res) => {
	console.log('Viendo la data que entra: ', req.body)
	request.patch({
		url: process.env.API_URL+'/enterprise', 
		form: req.body,
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Empresa editada con éxito"})
		res.redirect('back')
	})
}
