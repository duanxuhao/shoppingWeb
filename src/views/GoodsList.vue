<template>
  <div>
    <nav-header></nav-header>

    <nav-bread>
      <span slot="goods">Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default" v-bind:class="{'cur':cur}">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods" v-bind:class="{'cur':!cur}">
            Price <span v-bind:class="{'sort-up':!sortFlag,'cur':!cur}" class="firDown">个</span>
            <!-- <svg class="icon icon-arrow-short">
              <use xmlns:xlink="http://www.w3.org/1999/xlink"></use>
            </svg> -->
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="setPriceFilter('all')">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'/static/'+item.productImage" alt>
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click='addCart(item.productId)'>加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="load-more">
                <img src="./../../static/loading-svg/8.svg" alt="" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <model v-bind:mdShow="mdShow" v-on:close="closeModel">
      <p slot ="message">
        请先登录，否则无法加入购物车
      </p>
      <div slot ="btnGroup">
        <a class="btn btn--m" @click = "mdShow=false" href="javascript:;">关闭</a>
      </div>
    </model>
    <model v-bind:mdShow="mdShowCart" v-on:close="closeModel">
      <p slot ="message">
        <span>🍻加入购物车成功</span>
      </p>
      <div slot ="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click = "mdShowCart=false" >继续购物</a>
        <router-link class="btn btn--m" href="javascript:;" to="/cart"> 查看购物车</router-link>
      </div>
    </model>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
.sort-up{
  /* display: inline-block; */
  transform: rotate(180deg);
  transition: all 0.3s ease-out;
}
.firDown{
  display: inline-block;
  /* transform: rotate(180deg); */
  transition: all 0.3s ease-out;
}
.btn:hover{
  background-color: #ffe5e6;
}
</style>
<script>
import "./../assets/css/base.css";
import "./../assets/css/product.css";
import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
import axios from "axios";
import Model from "./../components/Model"


export default {
  data() {
    return {
      goodsList: [],
      priceFilter:[
        {
        startPrice:"0.00",
        endPrice:"1999.00"
        },
        {
        startPrice:"2000.00",
        endPrice:"2999.00"
        },
        {
        startPrice:"3000.00",
        endPrice:"3999.00"
        },
        {
        startPrice:"4000.00",
        endPrice:"4999.00"
        },
         {
        startPrice:"5000.00",
        endPrice:"5999.00"
        },
         {
        startPrice:"6000.00",
        endPrice:"7000.00"
        }
      ],
      priceChecked:'all',
      filterBy:false,
      overLayFlag:false,
      sortFlag:true,
      page:1,
      pageSize:8,
      loading:false,
      cur:true,
      mdShow:false,
      mdShowCart:false
    };
  },
  components: {
    NavHeader: NavHeader,
    NavFooter: NavFooter,
    NavBread: NavBread,
    Model:Model
  },
  mounted: function() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(flag) {
      var param = {
        page:this.page,
        pageSize:this.pageSize,
        sort:this.sortFlag?1:-1,
        priceLevel:this.priceChecked
      }
      this.loading=true;
      axios.get("/goods/list",{params:param}).then(result => {
          var res = result.data;
          var beforeList = res.result;
          this.loading=false;
          // console.log(res,beforeList);
          if(res.status == '0'){
            if(flag){
              this.goodsList = this.goodsList.concat(beforeList.list);
              if(beforeList.count==0){
                this.busy = true;
              }else{
                this.busy = false;
              }
            }else{
              this.goodsList = beforeList.list;
              this.busy = false;
            }
          }else{
            this.goodsList = [];
          }
          
          
      }).catch(function(error) {
          console.log(error);
      });
    },
    setPriceFilter(index){   // 点击价格
      this.priceChecked = index;
      this.closePop();
      this.page = 1;
      this.getGoodsList();
    },
    showFilterPop(){
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop(){
      this.filterBy = false;
      this.overLayFlag = false;
    },
    sortGoods(){
      this.sortFlag=!this.sortFlag;
      this.page=1;
      this.getGoodsList();
      this.cur = false;
    },
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);

    },
    addCart(productId){
      axios.post("/goods/addCart",{
        productId:productId
      }).then((res)=>{
        // console.log(res);
        if(res.data.status == 0){
          // alert("add success");
          this.mdShowCart = true;
          this.$store.commit("updateCartCount",1);
        }else{
          // alert(res.data.msg);
          this.mdShow = true;
        }
      })
    },
    closeModel(){
      this.mdShow = false;
      this.mdShowCart=false;
    }
  }
};
</script>

