<template>
  <div class="container">
    <div class="top-wrap">
      <div class="right-dw" @click="rule = true">活动规则</div>
      <div class="danmaku-wrap" ref="danmakuWrap">
        <div class="danmaku-item" v-for="(item,index) in danmakuList" :key="index">
          <img :src="item.headImage"  style="margin-right:.1rem" alt="">
          <span> {{ item.nickName }} {{ item.actionDesc }}</span>
        </div>
      </div>
    </div>
    <div class="buy-wrap">
      <div class="buy-button">
        <a href="https://i.jane7.com/s/PpaW8GCZmV?ch=KE_HDLP" target="_blank" class="button-link"></a>
        <a href="https://appGOb2yqIw7629.h5.xeknow.com/st/5nfxCWw9r"  class="buy-bottom-dw" target="_blank" >
          <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint60/double-eleven-01-new.png" alt="">
        </a>
      </div>
    </div>
    <div class="product-wrap">
      <div class="product-item">
        <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img7.png" class="select-none" alt="">
        <a target="_blank" href="https://m.jane7.com/v2/jane7-vip?ch=KE_HDLP" class="product-buy">
          <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img11.png" alt="">
        </a>
      </div>
      <div class="product-item">
        <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img8.png" class="select-none" alt="">
        <a target="_blank" href="https://i.jane7.com/s/3nm9Q7beha?ch=HDLP" class="product-buy">
          <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img11.png" alt="">
        </a>
      </div>
      <div class="product-item">
        <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img9.png" class="select-none" alt="">
        <a target="_blank" href="https://i.jane7.com/s/XchguwW1PF?ch=HDLP" class="product-buy">
          <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img11.png" alt="">
        </a>
      </div>
      <div class="product-item">
        <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img10.png" class="select-none" alt="">
        <a target="_blank" href="https://i.jane7.com/s/zhWJgcoJL3?ch=HDLP" class="product-buy">
          <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img11.png" alt="">
        </a>
      </div> 
    </div>
    <div class="gift-wrap" id="gift-wrap">
      <div class="to-welfare" @click="toWelfare()"></div>
      <div :class="['gift-swiper']" v-show="!isTouch" id="gift-swiper"> 
        <div class="gift-item" v-for="(item, index) in productList" :key="index">
          <div>
            <img :src="item.image" alt="">
            <p>{{ item.productName }}</p>
          </div>
        </div>
      </div>
      <div :class="['gift-swiper', 'gift-touch']"  v-show="isTouch">
        <div class="gift-item" v-for="(item, index) in productList"  :key="index+1">
          <div>
            <img :src="item.image" alt="">
            <p>{{ item.productName }}</p>
          </div>
        </div> 
      </div>
    </div>
    <div class="qrcode-wrap">
      <p>选课攻略，添加小助手</p>
      <div>
        <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img21.png" alt="">
      </div>
    </div>

    <van-popup v-model="rule" round position="bottom" :style="{ height: '70%' }" >
      <div class="rule-pop">
        <span class="title">活动规则说明</span>
        <ul>
          <li>1.下单时需正确填写收货地址，填写后不支持修改，双十一活动结束后统一寄送购课赠品。</li>
          <li>2.双十一活动期间（2020.11.01 0点-2020.11.12 24点），1个订单得1次兑换赠品机会，多买多送，选定后不支持修改、退换。</li>
          <li>3.训练营及闪云VIP为虚拟产品，一经购买，不支持转让、退款。</li>
          <li>4.购买训练营后，请务必在课程表中添加你的班班微信，加入学习群，以免影响到你的学习权益。</li>
          <li>*闪云理财对本次活动具有最终解释权</li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        productList: [],
        danmakuList: [],
        botList: [],
        setTime: {},
        isTouch: false,
        rule: false,

        botIndex: 0,

        setTime2: ''
      }
    },
    mounted() {
      document.documentElement.scrollTop = 0
      this.watchTouch()
      this.getBotList()
      this.getProduct()
      // this.judgeDate()
      this.createDanmaku(1)
    },
    methods: {
      // 判断活动是否过期
      judgeDate() {
        let day = new Date('2020-11-12')
        let now = new Date()
        if(now.getTime() > day.getTime()) {
          this.activeOver()
        }
      },
      // 活动结束跳转
      activeOver(){
        this.$toast('活动已结束，详情请咨询小助手哦')
        setTimeout(() => {
          window.location.href = 'https://qiyukf.com/client?k=dab5038115b7fcd238a678734acf7635&u=JU2019070114060592037&d=JU2019070114060592037&uuid=76d5cj6gutxqabuwesc8&gid=0&sid=0&qtype=0&welcomeTemplateId=0&dvctimer=0&robotShuntSwitch=0&hc=0&robotId=0&pageId=1603695685689CGMZ8IfnTe&shuntId=0&ctm=SlUyMDE5MDcwMTE0MDYwNTkyMDM3LS0xNjAzNjk1NjkxMDA0&n=%E6%A2%B5%E8%92%82%E5%86%88%E6%B1%89%E5%A0%A1&m=18817334342&t=%25E5%25B8%25AE%25E5%258A%25A9%25E4%25B8%25AD%25E5%25BF%2583'
        }, 1500)
      },
      getProduct () { 
        this._axios.post('/eleven/activity/product/list',{}).then(res=>{
          this.productList = res.data.data
        }) 
      },
      toWelfare() {
        this.$router.push('/double-eleven-welfare')
      },
      async getBotList() {
        try {
          let list = await this._axios.post('/eleven/activity/user/list')
          this.botList = list.data.data
        } catch (error) {
          this.$toast('数据请求失败')
          console.log(error);
        }
      },
      watchTouch() {
        let dom = document.getElementById('gift-wrap')
        dom.addEventListener('touchstart', this.remove,false); 
        dom.addEventListener('touchmove', this.remove,false); 
      },
      remove() {
        this.isTouch = true
        clearTimeout(this.setTime2)
        this.setTime2 = setTimeout(() => {
          this.isTouch = false
        }, 3000)
      },
      randomNum(startNumber, endNumber) { 
        //1.从几开始  2.到几结束
        var choice = endNumber - startNumber + 1;
        return Math.floor(Math.random() * choice + startNumber)
      },
      createDanmaku(e)  {
        // e:首次进入页面
        let t = e ? 1000 : this.randomNum(3, 5) * 1000 
        this.setTime = setTimeout(() => {
          if (this.botIndex < this.botList.length) {
            this.danmakuList.push(this.botList[this.botIndex])
            this.botIndex++
          } else {
            this.botIndex = 0
            this.getBotList()
          }
          this.createDanmaku()
        }, t)
      }
    },
    destroyed() {
      clearTimeout(this.setTime)
      clearTimeout(this.setTime2)
    },
  }
</script>

<style scoped>
.buy-bottom-dw{
  position: absolute;
  bottom: .9rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
  height: .6rem;
}
.to-welfare{
  position: absolute;
  width: 6.6rem;
  top: 0;
  height: 1.3rem;
  z-index: 3;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
.rule-pop{
  padding: 0 .3rem;
  box-sizing: border-box;
  font-size: 0;
}
.rule-pop .title{
  height:1rem;
  line-height: 1rem;
  font-size: .3rem;
  font-weight: 600;
}
.rule-pop li{
  opacity: .9;
  color:#060A14;
  font-size: .26rem;
  line-height: .42rem;
  margin-bottom: .42rem;
}
@keyframes animation-a {
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(-151%);
  }
}
.container{
  overflow-x: hidden;
}
@keyframes slide {
  0%{
    transform: translateX(100%);
  }
  100%{
    transform: translateX(-100vw);
  }
}
.try-button-link {
  position: absolute;
  bottom: .9rem;
  left: 50%;
  transform: translateX(-50%);
}
.try-button-link-css{
  width: 3rem;
  height: .6rem;
  background: #FFE4C8;
  border-radius: .06rem;
  border: 1px solid rgba(227, 17, 17, 0.2);
}
.try-button-link-css img{
  height: .18rem;
  width: .1rem;
  position: absolute;
  right: .2rem;
  top: .21rem;
}
.try-button-link-css span{
  font-size: .28rem;
  color:#e31111;
  line-height: .6rem;
  vertical-align: top;
  margin-left: .66rem;
  font-weight: 400;
}
.try-button-link-css i,
.try-button-link-css i::after,
.try-button-link-css i::before{
  top: .2rem;
  position: absolute;
  left: .20rem;
  height: .20rem;
  width: .05rem;
  background: #e31111;
  border-radius: 1rem;
}
.try-button-link-css i::after{
  content: '';
  position: absolute;
  top:0;
  left: .12rem;
}
.try-button-link-css i::before{
  content: '';
  position: absolute;
  top:0;
  left: .24rem;
}
.button-link{
  position: absolute;
  bottom: 1.57rem;
  width: 4.58rem;
  height: 1.07rem;
  left: 50%;
  transform: translateX(-50%);
  background: url('https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img3.png') no-repeat;
  background-size: cover;
}
.button-link::after{
  content: '';
  position: absolute;
  background: url('https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img4.png') no-repeat;
  width: 1.2rem;
  height: .94rem;
  background-size: cover;
  bottom: .7rem;
  right: -.2rem;
}
.buy-wrap{
  width: 100%;
  height: 10.3rem;
  background: url('https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img2.png') no-repeat;
  background-size: cover;
  position: relative;
}
.danmaku-wrap{
  position: absolute;
  bottom: .6rem;
  height: .7rem;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  user-select: none;
  pointer-events: none;
}
.danmaku-item {
  min-width: 3.43rem;
  height: .7rem;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: .8;
  border-radius: .35rem;
  display: inline-block;
  position: absolute;
  right: 0;
  animation: slide 8s linear forwards;
  text-align: right;
  padding-right: .2rem;
  box-sizing: border-box;
  border-radius: 1rem;
  padding-left: .1rem;
}
.danmaku-item img{
  border-radius: 50%;
  width: .5rem;
  height: .5rem;
  margin-top: .08rem;
  float: left;
  border: .02rem solid #fff;
  overflow: hidden;
}
.danmaku-item span{
  line-height: .7rem;
  color:#fff;
  font-weight: 400;
  font-size: .26rem;
  vertical-align: top;
}
.top-wrap{
  width: 100%;
  height: 9rem;
  background: url('https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img1.png') no-repeat;
  background-size: cover;
  position: relative;
}
.top-wrap .right-dw{
  /* position: fixed; */
  position: absolute;
  right: 0;
  top: 1.8rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  background: rgba(0, 0, 0, 0.3);
  width: 1.4rem;
  text-align: right;
  box-sizing: border-box;
  padding-right: .15rem;
  font-weight: 500;
  line-height: .5rem;
  font-size: .25rem;
  color:#fff;
  /* z-index: 10; */
}
.product-wrap{
  width: 100%;
  height: 19.24rem;
  background: url('https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img6.png') no-repeat;
  background-size: cover;
  position: relative;
  padding-top: 2.54rem;
  box-sizing: border-box;
}
.product-item-try{
  width: 4.7rem;
  position: absolute;
  bottom: .3rem;
  left: .2rem
}
.product-item .select-none{
  user-select: none;
  pointer-events: none;
}
.product-item {
  margin: 0 .15rem;
  width: 7.2rem;
  height: 3.7rem;
  position: relative;
}
.product-item+.product-item{
  margin-top: .3rem;
}
.product-buy{
  position: absolute;
  bottom: .3rem;
  right: 50%;
  transform: translateX(50%);
  width: 1.8rem;
  height: .6rem;
}
.product-buy img{
  width: 100%;
}
.gift-wrap{
  width: 100%;
  padding-top: 1.91rem;
  height: 4.91rem;
  background: url('https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img12.png') no-repeat;
  background-size: cover;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
}

.gift-swiper{
  padding: 0 .05rem;
  overflow-x: visible;
  white-space: nowrap;
  animation: animation-a 10s alternate infinite linear ;
  user-select: none;
}
.gift-touch {
  animation: none;
  overflow: scroll;
}
.gift-item{
  padding: 0 .05rem;
  display: inline-block;
}
.gift-item > div{
  width: 2.2rem;
  height: 2.6rem;
  border-radius: .1rem;
  background: #FFF1E2;
  border: .03px solid #FFC076;
}
.gift-item > div img{
  width: 1.6rem;
  height: 1.6rem;
  display: block;
  margin: .3rem auto 0;
}
.gift-item > div p{
  margin-top: .1rem;
  text-align: center;
  color: #060A14;
  font-size: .28rem;
  line-height: .4rem;
}
.gift-swiper.touch {
  animation: unset;
  overflow-x: scroll;
}
.qrcode-wrap{
  height: 6.4rem;
  width: 100%;
  box-sizing: border-box;
  padding-top: .4rem;
  background-color: #A81D02;
}
.qrcode-wrap > p{
  text-align: center;
  color:#fff;
  font-size: .26rem;
  margin-bottom: .2rem;
  font-weight: 500;
}
.qrcode-wrap > div{
  width: 3.6rem;
  height: 4.4rem;
  background: url(https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img22.png) no-repeat center;
  background-size: cover;
  position: relative;
  margin: auto;
  padding-top: .4rem;
  border-radius: .01rem;
}
.qrcode-wrap > div img{
  width: 2.8rem;
  height: 2.8rem;
  margin: 0 .4rem ;
}
</style>