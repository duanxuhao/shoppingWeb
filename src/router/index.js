import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList'
import Cart from "../views/Cart"
import Address from "../views/Address"
import Orderconfirm from "../views/Orderconfirm"
import orderSuccess from "../views/OrderSuccess"

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: "GoodList",
            component: GoodsList
        },
        {
            path: "/cart",
            name: "Cart",
            component: Cart
        },
        {
            path: "/address",
            name: "Address",
            component: Address
        },
        {
            path: "/orderconfirm",
            name: "Orderconfirm",
            component: Orderconfirm
        },
        {
            path: "/ordersuccess",
            name: "orderSuccess",
            component: orderSuccess
        }
    ]
})