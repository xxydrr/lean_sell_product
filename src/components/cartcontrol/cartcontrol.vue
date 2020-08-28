<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="cart-decrease"
        @click.stop.prevent="decreaseCart"
        v-show="food.count > 0"
      >
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div
      class="cart-count"
      v-show="food.count > 0"
    >{{food.count}}</div>
    <div
      class="cart-add cart-add icon-add_circle"
      @click.stop.prevent="addCart"
    ></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart() {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 在根组件实例上注册cart.add事件，传入被点击元素以及cartcontrol组件的父组件实例
      this.$root.$emit('cart.add', event.target)
    },
    decreaseCart() {
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.3s linear;
      .inner {
        transition: all 0.3s linear;
      }
    }
    &.move-enter,
    &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
