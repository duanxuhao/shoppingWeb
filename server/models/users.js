var mongoose = require("mongoose");

var usersProduct = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "oderList": Array,
    "carList": [{
        "productId": String,
        "productName": String,
        "productPrice": String,
        "productImage": String,
        "productChecked": String,
        "productNum": String
    }],
    "addressList": [{
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
    }]
});

module.exports = mongoose.model("Users", usersProduct);