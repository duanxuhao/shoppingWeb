var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Goods = require("./../models/goods");

mongoose.connect('mongodb://127.0.0.1:27017/imocmall');
mongoose.connection.on("connected", function() {
    console.log("success");
});
mongoose.connection.on("error", function() {
    console.log("fail");
});
mongoose.connection.on("disconnected", function() {
    console.log("disconnected");
});

//查询商品列表
router.get("/list", function(req, res, next) {
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let skip = (page - 1) * pageSize;
    let params = {};
    let priceLevel = req.param("priceLevel");
    var priceGt = '',
        priceLte = '';
    if (priceLevel != "all") {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 1999;
                break;
            case '1':
                priceGt = 2000;
                priceLte = 2999;
                break;
            case '2':
                priceGt = 3000;
                priceLte = 3999;
                break;
            case '3':
                priceGt = 4000;
                priceLte = 4999;
                break;
            case '4':
                priceGt = 5000;
                priceLte = 5999;
                break;
            case '5':
                priceGt = 6000;
                priceLte = 7000;
                break;
        }
        params = {
            productPrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({ "productPrice": sort });
    goodsModel.exec(function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

//加入到购物车
router.post("/addCart", function(req, res, next) {
    var userId = "100000077",
        productId = req.body.productId;
    var User = require("../models/users");

    User.findOne({
        userId: userId
    }, function(err, userDoc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            // console.log("userDoc:" + userDoc);
            if (userDoc) {
                let goodsItem = "";
                userDoc.carList.forEach(function(item) {
                    if (item.productId == productId) {
                        goodsItem = item;
                        item.productNum++;
                    }
                });
                if (goodsItem) {
                    userDoc.save(function(err2, doc2) {
                        if (err2) {
                            res.json({
                                    status: "1",
                                    msg: err2.message
                                })
                                // console.log(doc2);
                        } else {
                            res.json({
                                status: "0",
                                msg: "",
                                result: "success"
                            })
                        }
                    })
                } else {
                    Goods.findOne({ productId: productId }, function(err1, doc) {
                        if (err1) {
                            res.json({
                                status: "1",
                                msg: err1.message
                            })
                        } else {
                            // console.log(doc);"productChecked": String,"productNum": String
                            if (doc) {
                                doc.productNum = 1;
                                doc.productChecked = 1;
                                // console.log(doc);
                                userDoc.carList.push(doc);

                                userDoc.save(function(err2, doc2) {

                                    if (err2) {
                                        res.json({
                                                status: "1",
                                                msg: err2.message
                                            })
                                            // console.log(doc2);
                                    } else {
                                        res.json({
                                            status: "0",
                                            msg: "",
                                            result: "success"
                                        })
                                    }
                                })
                            }
                        }
                    })
                }

            }
        }
    })
})
module.exports = router;