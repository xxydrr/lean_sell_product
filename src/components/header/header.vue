<template>
  <div class="header">
    <div class="header-content">
      <div class="merchant-icon">
        <img
          width="64"
          height="64"
          :src="seller.avatar"
          alt="商家头像"
        />
      </div>
      <div class="content-center">
        <div class="merchant-content">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div
          v-if="seller.supports"
          class="support"
        >
          <span
            class="icon"
            :class="classMap[seller.supports[0].type]"
          ></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div
          v-if="seller.supports"
          class="support-count"
          @click="Showdetail"
        >
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div
      @click="Showdetail"
      class="header-bulletin"
    >
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="header-background">
      <img :src="seller.avatar" />
    </div>
    <transition name="fade">
      <div
        class="background-wrapper"
        v-show="detailShow"
      >
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star
                :size="48"
                :score="seller.score"
              ></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul
              v-if="seller.supports"
              class="supports"
            >
              <li
                v-for="(item, index) in seller.supports"
                :key="index"
                class="supports-item"
              >
                <span
                  class="icon"
                  :class="classMap[item.type]"
                ></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <p class="bulletin-wrapper">{{seller.bulletin}}</p>
          </div>
        </div>
        <div
          @click="Showdetail"
          class="close-wrapper"
        >
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'
export default {
  name: 'myhead',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    Showdetail() {
      this.detailShow = !this.detailShow
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/mixin.scss';
@import 'common/scss/base.scss';
.header {
  overflow: hidden;
  position: relative;
  background-color: rgba(7, 17, 27, 0.5);
  color: #fff;
  .header-content {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .merchant-icon {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content-center {
      display: inline-block;
      vertical-align: top;
      margin-left: 16px;
      .merchant-content {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          @include bg-images('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-weight: bold;
          font-size: 16px;
          line-height: 18px;
        }
      }
      .description {
        margin-top: 8px;
        font-size: 12px;
        font-weight: 200;
      }
      .support {
        margin-top: 10px;
        .icon {
          display: inline-block;
          vertical-align: top;
          margin-right: 4px;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-images('decrease_1');
          }
          &.discount {
            @include bg-images('discount_1');
          }
          &.invoice {
            @include bg-images('invoice_1');
          }
          &.special {
            @include bg-images('special_1');
          }
          &.guarantee {
            @include bg-images('guarantee_1');
          }
        }
        .text {
          line-height: 1.2;
          font-size: 10px;
          font-weight: 200;
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 16px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          // vertical-align: top;
          font-size: 10px;
          font-weight: 200;
        }
        .icon-keyboard_arrow_right {
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
        }
      }
    }
  }
  .header-bulletin {
    position: relative;
    height: 28px;
    padding: 0 22px 0 12px;
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      vertical-align: middle;
      width: 22px;
      height: 12px;
      @include bg-images('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      margin-left: 4px;
      vertical-align: middle;
      font-size: 10px;
      line-height: 14px;
      font-weight: 200;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      top: 10px;
      right: 12px;
      font-size: 10px;
    }
  }
  .header-background {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .background-wrapper {
    overflow: auto;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(5px);
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
      background-color: rgba(7, 17, 27, 0);
    }
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.5s;
    }

    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        padding: 64px 36px 64px;
        text-align: center;
        .name {
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 16px;
        }
        .title {
          display: flex;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            //  flex: auto;
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .supports {
          text-align: left;
          margin-top: 24px;
          .supports-item {
            margin-bottom: 12px;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              vertical-align: top;
              display: inline-block;
              width: 16px;
              height: 16px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              margin-right: 6px;
              &.decrease {
                @include bg-images('decrease_2');
              }
              &.discount {
                @include bg-images('discount_2');
              }
              &.invoice {
                @include bg-images('invoice_2');
              }
              &.special {
                @include bg-images('special_2');
              }
              &.guarantee {
                @include bg-images('guarantee_2');
              }
            }
            .text {
              font-weight: 200;
              font-size: 12px;
              line-height: 16px;
            }
          }
        }
        .bulletin-wrapper {
          padding: 0 12px;
          text-align: left;
          font-size: 12px;
          line-height: 2;
          font-weight: 200;
        }
      }
    }
    .close-wrapper {
      position: relative;
      z-index: 101;
      width: 32px;
      height: 32px;
      margin: -64px auto 0;
      clear: both;
      font-size: 32px;
      bottom: 0;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
