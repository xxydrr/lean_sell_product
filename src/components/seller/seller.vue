<template>
  <div
    class="seller"
    ref="seller"
  >
    <div class="seller-content">
      <div class="overview">
        <h2 class="title">{{seller.name}}</h2>
        <div class="desc border-1px">
          <star
            :size="36"
            :score="seller.score"
          ></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h3>起送价</h3>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h3>商家配送</h3>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h3>平均配送时间</h3>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div
          @click="toggleFavorite"
          class="favorite"
        >
          <span
            class="icon-favorite"
            :class="{active:favorite}"
          ></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul
          v-if="seller.supports"
          class="supports"
        >
          <li
            class="support-item border-1px"
            v-for="(item, index) in seller.supports"
            :key="index"
          >
            <span
              class="icon"
              :class="classMap[seller.supports[index].type]"
            ></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h2 class="title">商家实景</h2>
        <div
          class="pic-wrapper"
          ref="picWrapper"
        >
          <ul
            class="pic-list"
            ref="picList"
          >
            <li
              class="pic-item"
              v-for="(pic, index) in seller.pics"
              :key="index"
            >
              <img
                width="120"
                height="90"
                :src="pic"
                alt="实景图片"
              />
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h2 class="title border-1px">商家信息</h2>
        <ul>
          <li
            class="info-item border-1px"
            v-for="(info, index) in seller.infos"
            :key="index"
          >{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import { saveToLocal, loadFromLocal } from 'common/js/store.js'

export default {
  name: '',
  components: {
    star,
    split
  },
  data() {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    seller() {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
      this._initPics()
    })
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  methods: {
    toggleFavorite() {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics() {
      if (this.seller.pics) {
        const picWidth = 120
        const margin = 6
        const width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/mixin.scss';

.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    position: relative;
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .desc {
      padding-bottom: 18px;
      font-size: 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
      }
      .text {
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
        vertical-align: top;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border: none;
        }
        h3 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .content {
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);
          .stress {
            font-size: 24px;
          }
        }
      }
    }
    .favorite {
      position: absolute;
      right: 18px;
      top: 18px;
      width: 40px;
      text-align: center;
      vertical-align: middle;
      .icon-favorite {
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        display: block;
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
        white-space: nowrap;
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
    .supports {
      .support-item {
        padding: 16px 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        &:last-child {
          @include border-none();
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          vertical-align: top;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-images('decrease_4');
          }
          &.discount {
            @include bg-images('discount_4');
          }
          &.guarantee {
            @include bg-images('guarantee_4');
          }
          &.invoice {
            @include bg-images('invoice_4');
          }
          &.special {
            @include bg-images('special_4');
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
  .pics {
    padding: 18px;
    .title {
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }
  .info {
    padding: 18px 18px 0;
    color: rgb(7, 17, 27);
    .title {
      padding-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      @include border-1px(rgba(7, 17, 27, 0.1));
    }
    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      font-size: 12px;
      &:last-child {
        @include border-none();
      }
    }
  }
}
</style>
