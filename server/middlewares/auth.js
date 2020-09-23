const {User, Cart} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = async (req, res, next) => {    
    const {access_token} = req.headers
    try {
        const user = verifyToken(access_token)
        const data = await User.findOne({
            where: {
                email : user.email
            }
        })
        if(data){
            req.user = user
            next()
        }else{
            throw {name: `NotAuthenticated`, message: `User not authenticated`}
        }

    } catch(err) {
        return next(err)
    }
}

const authorization = async (req, res, next) => {
    try{
        const user = await User.findOne({
            where: {
                id: +req.user.id
            }
        })
        if(user && user.role === 'admin'){
            next()
        }else{
            throw {name: `ForbidenAccess`}
        }
    }catch(err){
        return next(err)
    }
}

const cartAuthorization = async (req, res, next) => {
    try{
        const cart = await Cart.findOne({
            where: {
                ProductId: req.params.productId
            }
        })
        if(cart && req.user.id === cart.UserId){
            next()
        }else{
            throw {name: `ForbidenAccess`}
        }
    }catch(err){
        return next(err)
    }
}

const customerAuthorization = async (req, res, next) => {
    try{
        const user = await User.findOne({
            where: {
                id: +req.user.id
            }
        })
        if(user && user.role === 'customer'){
            next()
        }else{
            throw {name: `ForbidenAccess`}
        }
    }catch(err){
        return next(err)
    }
}

module.exports = {authentication, authorization, cartAuthorization, customerAuthorization}