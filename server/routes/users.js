var express = require('express');
var router = express.Router();
var User = require('./../models/users')
require('./../util/util')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
    var param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    User.findOne(param, function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            if (doc) {
                res.cookie("userId", doc.userId, {
                    path: "/",
                    maxAge: 1000 * 60 * 60
                });
                res.cookie("userName", doc.userName, {
                    path: "/",
                    maxAge: 1000 * 60 * 60
                });
                // req.session.user = doc;
                res.json({
                    status: "0",
                    msg: "",
                    result: {
                        userName: doc.userName,

                    }
                })
            }
        }
    })
})

router.post("/logout", function(req, res, next) {
    res.cookie("userId", "", {
        path: "/",
        maxAge: -1
    })
    res.json({
        status: "0",
        msg: "",
        result: ""
    })
})

router.get("/checkLogin", function(req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: "0",
            msg: '',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: "1",
            msg: '未登录',
            result: ""
        })
    }
});

router.get("/getCartCount", function(req, res, next) {
    if (req.cookies && req.cookies.userId) {
        var userId = req.cookies.userId;
        User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({
                    status: "1",
                    msg: err.message,
                    result: ""
                })
            } else {
                var carList = doc.carList;
                var cartCount = 0;
                carList.forEach(function(item) {
                    cartCount += parseInt(item.productNum);
                });
                res.json({
                    status: "0",
                    msg: '',
                    result: cartCount
                })
            }
        })
    }
})

router.get("/carList", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else {
            if (doc) {
                res.json({
                    status: "0",
                    msg: "",
                    result: doc.carList
                })
            }
        }
    })
})

router.get("/deleteProduct", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else {
            if (doc) {
                res.json({
                    status: "0",
                    msg: "",
                    result: doc.carList
                })
            }
        }
    })
})

router.post("/cartDel", function(req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId;
    User.update({ userId: userId }, { $pull: { 'carList': { "productId": productId } } }, function(error, doc) {
        if (error) {
            res.json({
                status: "1",
                msg: error.message,
                result: ""
            })
        } else {
            res.json({
                status: "0",
                msg: "",
                result: ''
            })
        }
    });

});

router.post("/cartEdit", function(req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId,
        productChecked = req.body.productChecked,
        productNum = req.body.productNum;
    User.update({ userId: userId, "carList.productId": productId }, { 'carList.$.productNum': productNum, 'carList.$.productChecked': productChecked }, function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            });
        } else {
            res.json({
                status: "0",
                msg: "",
                result: "success"
            })
        }
    })
})

router.post("/editCheckAll", function(req, res, next) {
    var userId = req.cookies.userId,
        checkAll = req.body.checkAll ? '1' : '0';
    User.findOne({ userId: userId }, function(err, user) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            });
        } else {
            if (user) {
                user.carList.forEach((item) => {
                    item.productChecked = checkAll;
                })
                user.save(function(err1, doc) {
                    if (err1) {
                        res.json({
                            status: "1",
                            msg: err1.message,
                            result: ""
                        })
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
})

router.get("/addressList", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else {
            res.json({
                status: "0",
                msg: "",
                result: doc.addressList
            })
        }
    })
})

router.post("/setDefault", function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    if (!addressId) {
        res.json({
            status: "1003",
            msg: "addressId is null",
            result: ""
        })
    } else {
        User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({
                    status: "1",
                    msg: err.message,
                    result: ""
                })
            } else {
                var addressList = doc.addressList;
                addressList.forEach((item) => {
                    if (item.addressId == addressId) {
                        item.isDefault = true;
                    } else {
                        item.isDefault = false;
                    }
                });
                doc.save(function(err1, doc1) {
                    if (err1) {
                        res.json({
                            status: "1",
                            msg: err1.message,
                            result: ""
                        })
                    } else {
                        res.json({
                            status: "0",
                            msg: "",
                            result: ""
                        })
                    }
                })

            }
        })
    }

})

router.post("/addressDel", function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    User.update({ userId: userId }, { $pull: { 'addressList': { "addressId": addressId } } }, function(error, doc) {
        if (error) {
            res.json({
                status: "1",
                msg: error.message,
                result: ""
            })
        } else {
            res.json({
                status: "0",
                msg: "",
                result: "success"
            })
        }
    })

})


router.post("/payMent", function(req, res, next) {
    var userId = req.cookies.userId,
        orderTotal = req.body.orderTotal,
        addressId = req.body.addressId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            });
        } else {
            var address = '',
                goodsList = [];

            //获取用户的地址信息
            doc.addressList.forEach((item) => {
                    if (addressId == item.addressId) {
                        address = item;
                    }
                })
                //获取用户购物车的购买数据
            doc.carList.filter((item) => {
                if (item.productChecked == '1') {
                    goodsList.push(item);
                }
            })

            //生成orderId和创建日期
            var platform = '622';
            var r1 = Math.floor(Math.random() * 10);
            var r2 = Math.floor(Math.random() * 10);
            var systemDate = new Date().Format('yyyyMMddhhmmss');
            var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            var orderId = platform + r1 + systemDate + r2;

            //创建订单金额
            var order = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '1',
                createDate: createDate
            }
            doc.oderList.push(order);
            doc.save(function(error, doc1) {
                if (error) {
                    res.json({
                        status: "1",
                        msg: error.message,
                        result: ""
                    });
                } else {
                    res.json({
                        status: "0",
                        msg: "",
                        result: {
                            orderId: order.orderId,
                            orderTotal: order.orderTotal
                        }
                    })
                }
            })

        }
    })
})

router.post("/orderDetail", function(req, res, next) {
    var userId = req.cookies.userId,
        orderId = req.body.orderId;
    User.findOne({ userId: userId }, function(err, userInfo) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            });
        } else {
            var orderList = userInfo.oderList;
            if (orderList.length > 0) {
                var orderTotal = 0;
                orderList.forEach((item) => {
                    // console.log(item.orderId, orderId);
                    if (item.orderId == orderId) {
                        orderTotal = item.orderTotal;
                    }
                })
                if (orderTotal > 0) {
                    res.json({
                        status: "0",
                        msg: "",
                        result: {
                            orderId: orderId,
                            orderTotal: orderTotal
                        }
                    })
                } else {
                    res.json({
                        status: "12002",
                        msg: "无此订单",
                        result: ''
                    })
                }

            } else {
                res.json({
                    status: "12001",
                    msg: "当前用户为创建订单",
                    result: ""
                });
            }
        }
    })

})

module.exports = router;