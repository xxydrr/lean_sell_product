<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { getSeller } from 'api'
// import { urlParse } from 'common/js/util.js'  // 方法一
import qs from 'query-string' // 方法2 使用第三方插件的方式
import header from 'components/header/header.vue'
export default {
  name: 'App',
  data() {
    return {
      seller: {
        // id: (() => {
        //   const queryParam = urlParse()
        //   return queryParam.id
        // })()
        id: qs.parse(location.search).id
      }
    }
  },
  created() {
    getSeller({ id: this.seller.id }).then((seller) => {
      this.seller = Object.assign({}, this.seller, seller)
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/mixin.scss';
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
      @include border-1px(rgba(7, 17, 27, 0.1));
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
