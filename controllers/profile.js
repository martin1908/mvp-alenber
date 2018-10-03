// const bcrypt = require('bcrypt')
const request = require('request');
const jwt = require('jsonwebtoken')

exports.getOrders = (req, res) => {
	res.render('profile/orders')
}

exports.getOrderDetail = (req, res, next) => {
	request.get({ url: process.env.API_URL +'/order/' + req.params.id, headers: { authorization: 'Bearer ' + req.user.token } },(error, response, body) => {
		if(error) return next(error);
		const bodyJSON = JSON.parse(body)
		const err = bodyJSON.error || bodyJSON.err3;
		const msg = err || bodyJSON.message;
		console.log(bodyJSON)
		if(response.statusCode == 500 || response.statusCode == 401 || response.statusCode == 404) {
			req.flash(response.statusCode == 500 ? 'errors' : 'info', { msg })
			return res.redirect('back');
		}
		req.flash('success', { msg })
		res.render('profile/orderDetail', { order: bodyJSON.getOneOrder })
	})
}

exports.getUpdateOrder = (req, res) => {
	console.log(req.params);
	request.get({ url: process.env.API_URL +'/order/' + req.params.id, headers: { authorization: 'Bearer ' + req.user.token } },(error, response, body) => {
		if(error) return next(error);
		const bodyJSON = JSON.parse(body)
		const err = bodyJSON.error || bodyJSON.err3;
		const msg = err || bodyJSON.message;
		console.log(bodyJSON.getOneOrder)
		if(response.statusCode == 500 || response.statusCode == 401 || response.statusCode == 404) {
			req.flash(response.statusCode == 500 ? 'errors' : 'info', { msg })
			return res.redirect('back');
		}
		req.flash('success', { msg })
		res.render('profile/updateOrder', { order: bodyJSON.getOneOrder })
	})
}

exports.postUpdateOrder = (req, res) => {
	const { itemTitle } = req.body;
	const { itemQuantity } = req.body;
	const { itemUnity } = req.body;
	const { itemDescription } = req.body;
	const body = {
		title: req.body.title,
		placeDelivery: req.body.deliveryPlace,
		dateDelivery: req.body.deliveryDate,
		moreDescription: req.body.moreDescription,
		isUrgente: req.body.isUrgent 
	};
	body.isUrgente = body.isUrgente ? parseInt(body.isUrgente) : 0;
	console.log(body)
	const Item = [];
	if(!Array.isArray(itemTitle)){
		Item.push({
			titleItem: itemTitle,
			quantity: parseInt(itemQuantity),
			unity: parseInt(itemUnity),
			description: itemDescription
		});
	}else{
		for(var i=0; i<itemTitle.length; i++){
			Item.push({
				titleItem: itemTitle[i],
				quantity: parseInt(itemQuantity[i]),
				unity: parseInt(itemUnity[i]),
				description: itemDescription[i]
			});
		}
	}
	body.Item = Item;

	request.patch({ url: 'http://localhost:3009/api/order/'+req.params.id, headers: { authorization: 'Bearer ' + req.user.token }, form: body }, (error, response, body) => {
		if(error) return next(error);
		const bodyJSON = JSON.parse(body)
		const err = bodyJSON.error || bodyJSON.err3;
		const msg = err || bodyJSON.message;
		if(response.statusCode == 500 || response.statusCode == 401 || response.statusCode == 404) {
			req.flash(response.statusCode == 500 ? 'errors' : 'info', { msg })
			return res.redirect('back');
		}
		req.flash('success', { msg })
		res.redirect('/perfil')
	});
}

exports.getCreateOrder = (req, res) => {
	console.log(req.user)
	res.render('profile/createOrder')
}

exports.postCreateOrder = (req, res) => {
	const { itemTitle } = req.body;
	const { itemQuantity } = req.body;
	const { itemUnity } = req.body;
	const { itemDescription } = req.body;
	const body = {
		title: req.body.title,
		placeDelivery: req.body.deliveryPlace,
		dateDelivery: req.body.deliveryDate,
		moreDescription: req.body.moreDescription,
		isUrgente: req.body.isUrgent ? parseInt(req.body.isUrgent) : 0
	};
	const Item = [];
	if(!Array.isArray(itemTitle)){
		Item.push({
			titleItem: itemTitle,
			quantity: parseInt(itemQuantity),
			unity: parseInt(itemUnity),
			description: itemDescription
		});
	}else{
		for(var i=0; i<itemTitle.length; i++){
			Item.push({
				titleItem: itemTitle[i],
				quantity: parseInt(itemQuantity[i]),
				unity: parseInt(itemUnity[i]),
				description: itemDescription[i]
			});
		}
	}
	body.Item = Item;

	request.post({ url: process.env.API_URL + '/order', headers: { authorization: 'Bearer ' + req.user.token }, form: body }, (error, response, body) => {
		if(error) return next(error);
		const bodyJSON = JSON.parse(body)
		const err = bodyJSON.error || bodyJSON.err3;
		const msg = err || bodyJSON.message;
		if(response.statusCode == 500 || response.statusCode == 401 || response.statusCode == 404) {
			req.flash(response.statusCode == 500 ? 'errors' : 'info', { msg })
			return res.redirect('back');
		}
		req.flash('success', { msg })
		res.redirect('back')
	})
	
}
exports.getCreateQuotation = (req, res) => {
	res.render('profile/createQuotation')
}

exports.postCreateQuotation = (req, res) => {
	res.send('ok')
}

exports.getOrderQuotation = (req, res) => {
	res.render('profile/orderQuotation')
}

exports.postQuotationDetail = (req, res) => {
	res.render('profile/QuotationDetail')
}
exports.getOrderQuotationDetail = (req, res) => {
	res.render('profile/orderQuotationDetail')
}

exports.getUpdateProfile = (req, res) => {
	res.render('profile/updateProfile')
}

exports.postUpdateProfile = (req, res) => {
	console.log(req.user.token)
	console.log(req.body)
	request.patch({
		url: process.env.API_URL+'/profile', 
		form: req.body,
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Usuario Editado con éxito"})
		res.redirect('/perfil')
	})
}

exports.getHome = (req, res) => {
	request.get({
		url: process.env.API_URL+'/profile',
		'auth': {
			'bearer': req.user.token
		}
	}, 
	(err, response, body) => {
		if (err) return res.status(500).send(err)
			
		var data = JSON.parse(body)
		console.log(data)
		if (response.statusCode == 500) {
			req.flash('errors', { msg: `${data.message}`})
			return res.redirect('/login');
		}
			
		if (response.statusCode == 400) {
			req.flash('errors', { msg: `${data.message}`})
			return res.redirect('/login');
		}

		if (response.statusCode == 200) {
			console.log(data)
			res.render('profile/home', {
				usuario: data.user
			})
		}
	})
}

exports.getSavedOrders = (req, res) => {
	res.render('profile/savedOrders')
}

exports.getQuotations = (req, res) => {
	res.render('profile/quotations')
}

exports.getQuotationDetail = (req, res) => {
	request.get({
		url: process.env.API_URL+'/quotation/'+ req.params.id,
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		data = JSON.parse(body)
		console.log(data.foundQuotation)
		req.flash('success', {msg: "Viendo detalle de la cotización"})
		res.render('profile/quotationDetail', {
			cotizacion: data.foundQuotation
		})
	})
}

exports.getUpdateQuotation = (req, res) => {
	res.render('profile/updateQuotation')
}

exports.postUpdateQuotation = (req, res) => {
	res.send('ok')
}

exports.getCreateQuotation = (req, res) => {
	request.get({ url: process.env.API_URL +'/order/' + req.params.id, headers: { authorization: 'Bearer ' + req.user.token } },(error, response, body) => {
		if(error) return next(error);
		const bodyJSON = JSON.parse(body)
		const err = bodyJSON.error || bodyJSON.err3;
		const msg = err || bodyJSON.message;
		console.log(bodyJSON.getOneOrder)
		if(response.statusCode == 500 || response.statusCode == 401 || response.statusCode == 404) {
			req.flash(response.statusCode == 500 ? 'errors' : 'info', { msg })
			return res.redirect('back');
		}
		req.flash('success', { msg })
		res.render('profile/createQuotation', { order: bodyJSON.getOneOrder })
	})
}

exports.postCreateQuotation = (req, res) => {
	const ItemQuotation = [];
	if(!Array.isArray(req.body.quantity)){
		ItemQuotation.push({
			quantity: req.body.quantity,
			price: req.body.price,
			typeCurrency: req.body.typeCurrency,
			idItem: req.body.idItem
		})
	}else{
		for(var i=0; i<req.body.quantity.length; i++){
			ItemQuotation.push({
				quantity: req.body.quantity[i],
				price: req.body.price[i],
				typeCurrency: req.body.typeCurrency[i],
				idItem: req.body.idItem[i],
			})
		}
	}
	req.body.ItemQuotation = ItemQuotation;
	request.post({
		url: process.env.API_URL+'/order/'+ req.params.id +'/quotation', 
		form: req.body,
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		req.flash('success', {msg: "Cotización enviada con éxito"})
		res.redirect('perfil/cotizaciones')
	})
}

exports.getMembership = (req, res) => {
	res.render('profile/membership')
}

exports.getPayMembership = (req, res) => {
	res.render('profile/payMembership')
}

exports.getUsers = (req, res) => {
	res.render('profile/users')
}

exports.getCreateUser = (req, res) => {
	res.render('profile/createUser')
}

exports.postCreateUser = (req, res) => {
	res.send('ok')
}

exports.getUpdateUser = (req, res) => {
	res.render('profile/updateUser')
}

exports.postUpdateUser = (req, res) => {
	res.send('ok')
}

exports.getAdvertisings = (req, res) => {
	console.log(req.user.token)
	request({
		url: process.env.API_URL + '/publicities', 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body).foundAllPublicities)
		res.render('profile/advertisings', {
			advertisings: JSON.parse(body).foundAllPublicities
		})
	})
}

exports.getCreateAdvertising = (req, res) => {
	res.render('profile/createAdvertising')
}

exports.postCreateAdvertising = (req, res) => {
	res.send('ok')
}

exports.getUpdateAdvertising = (req, res) => {
	console.log(req.user.token)
	request({
		url: process.env.API_URL + '/publicity/'+req.params.id, 
		headers: {
		'authorization': 'Bearer '+req.user.token
		}
	}, (err, response, body) => {
		console.log(JSON.parse(body))
		res.render('profile/updateAdvertising', {
			advertisings: JSON.parse(body).foundAllPublicities
		})
	})
}

exports.postUpdateAdvertising = (req, res) => {
	res.send('ok')
}

exports.getProducts = (req, res) => {
	res.render('profile/products')
}

exports.getDashboard = (req, res) => {
	request.get({
		url: process.env.API_URL+'/dashboard', 
		'auth': {
			'bearer': req.user.token
		}
	}, (err, response, body) => {
		var data = JSON.parse(body)
		console.log('Viendo la data: ', data)
		res.render('profile/dashboard', {
			user: JSON.parse(body).user
		})
	})
}