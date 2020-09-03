<template>
  <div>
    <div class="goods">
      <div
        class="menu-wrapper"
        ref="menuWrapper"
      >
        <ul>
          <li
            v-for="(item, index) in goods"
            :key="index"
            class="menu-item border-1px"
            :class="{current: currentIndex === index}"
            @click="selectMenu(index)"
            ref="menuList"
          >
            <span class="text">
              <span
                class="icon"
                :class="classMap[item.type]"
                v-show="item.type > 0"
              ></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div
        class="foods-wrapper"
        ref="foodsWrapper"
      >
        <ul>
          <li
            v-for="(item, index) in goods"
            :key="index"
            class="itemlist food-list-hook"
          >
            <h2 class="title">{{item.name}}</h2>
            <ul>
              <li
                v-for="(foods, index) in item.foods"
                :key="index"
                class="foods-item border-1px"
                @click="selectFood(foods)"
              >
                <div class="icon">
                  <img
                    :src="foods.icon"
                    width="57"
                    height="57"
                  />
                </div>
                <div class="content">
                  <h1 class="name">{{foods.name}}</h1>
                  <p
                    class="description"
                    v-show="foods.description"
                  >{{foods.description}}</p>
                  <div class="sellShow">
                    <span class="sellCount">月销{{foods.sellCount}}份</span>
                    <span>好评率{{foods.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="nowprice">￥{{foods.price}}</span>
                    <span
                      class="oldprice"
                      v-show="foods.oldPrice"
                    >￥{{foods.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="foods"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart
        ref="shopCart"
        :select-foods="selectFoods"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
      ></shopcart>
    </div>
    <food
      :food="selectedFood"
      ref="food"
    ></food>
  </div>
</template>

<script>
import { getGoods } from 'api'
import BScroll from 'better-scroll'
import shopcart from 'components/shopcart/shopcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import food from 'components/food/food'

export default {
  name: '',
  data() {
    return {
      goods: [],
      listHeight: [],
      totalHeight: 0,
      scrollY: 0,
      selectedFood: {}
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._initLeftScroll(i)
          return i
        }
      }
      return 0
    },
    selectFoods() {
      const foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  created() {
    getGoods({ id: this.seller.id }).then(goods => {
      this.goods = goods
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _initLeftScroll(index) {
      const menu = this.$refs.menuList
      const el = menu[index]
      this.menuScroll.scrollToElement(el, 300)
    },
    _calculateHeight() {
      const foodList = this.$refs.foodsWrapper.getElementsByClassName(
        'food-list-hook'
      )
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        const item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      this.totalHeight = height
    },
    selectMenu(index, event) {
      const foodList = this.$refs.foodsWrapper.getElementsByClassName(
        'food-list-hook'
      )
      const el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
      // console.log(el);
    },
    selectFood(food) {
      this.selectedFood = food
      this.$refs.food.show()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/mixin.scss';
// @import "../../assets/common/scss/base.scss";
.goods {
  display: flex;
  position: absolute;
  overflow: hidden;
  width: 100%;
  top: 174px;
  bottom: 46px;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      padding: 0 12px;
      width: 56px;
      height: 54px;
      text-align: center;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background-color: #fff;
        font-weight: 700;
        .text {
          @include border-none();
        }
      }
      .text {
        display: table-cell;
        vertical-align: middle;
        font-size: 12px;
        line-height: 14px;
        // @include border-1px(rgba(7, 17, 27, 0.1));
        .icon {
          vertical-align: top;
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          margin-right: 2px;
          &.decrease {
            @include bg-images('decrease_3');
          }
          &.discount {
            @include bg-images('discount_3');
          }
          &.invoice {
            @include bg-images('invoice_3');
          }
          &.special {
            @include bg-images('special_3');
          }
          &.guarantee {
            @include bg-images('guarantee_3');
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .itemlist {
      .title {
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f7;
        font-size: 12px;
        line-height: 26px;
        color: rgb(147, 153, 159);
      }
      .foods-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          @include border-none();
          margin-bottom: 0;
        }
        &:first-child {
          padding-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          img {
            border-radius: 2px;
          }
        }
        .content {
          flex: 1;
          margin-top: 2px;
          margin-left: 10px;
          .name {
            font-size: 14px;
            line-height: 14px;
            color: rbg(7, 17, 27);
          }
          .description,
          .sellShow {
            margin-top: 6px;
            font-size: 10px;
            line-height: 1.2;
            color: rgb(147, 153, 159);
            .sellCount {
              margin-right: 2px;
            }
          }
          .sellShow {
            margin-top: 2px;
          }
          .price {
            .nowprice {
              margin-right: 8px;
              font-size: 14px;
              font-weight: 700;
              line-height: 24px;
              color: red;
            }
            .oldprice {
              font-size: 10px;
              line-height: 24px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: -10px;
            bottom: -2px;
          }
        }
      }
    }
  }
}
</style>
