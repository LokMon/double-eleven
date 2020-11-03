<template>
  <div>
    <div class="welfare-top">
      <div class="right-dw" @click="prize = true">兑奖记录</div>
      <div class="welfare-dz">
        <p @click="addressWrap=true" v-show="!address" >收货地址：未填<span>去填写<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img25.png" alt=""></span> </p>
        <p v-show="address"  @click="addressWrap=true">收货地址：<i>{{ address+'-'+detail }}</i><span>去修改<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img25.png" alt=""></span> </p>
      </div>
    </div>
    <div class="welfare-middle">
      <router-link to="/" class="return-pay" ></router-link>
      <p class="chance-wrap">还有{{ userInfo.haveConvertNum || 0 }}次挑选机会</p>
      <div class="product-list">
        <div class="product-item" v-for="prod in pList" :key="prod.id">
          <img :src="prod.image" alt="">
          <span>{{ prod.productName }}</span>
          <div @click="showDilog(prod.productCode)" v-if="!expire"></div>
          <div style="filter: grayscale(100%);-webkit-filter: grayscale(100%);" v-else></div>
          <i v-if="prod.convertCount">已兑换：{{ prod.convertCount }}</i>
        </div>
      </div>
    </div>

    <!-- 选择地址 -->
    <div class="address-wrap" v-show="addressWrap"  @click="addressWrap=false">
      <div class="address-block" @click.stop>
        <!-- <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint50/index-phone-close.png" alt="" class="address-close" @click="addressWrap=false"> -->
        <span class="address-alert">收货地址关系到实物寄送，请确保正确无误</span>
        <div>
          <span>联系人</span>
          <input type="text" placeholder="姓名" v-model="name">
        </div>
        <div>
          <span>电话</span>
          <input type="number" placeholder="手机号码" v-model="mobile">
        </div>
        <div>
          <span>地区</span>
          <i @click="cityOptions=true">
            <em v-if="address" style="color:rgba(6,10,20,1);">{{address}}</em>
            <em v-else>选择地区</em>
          </i>
        </div>
        <div>
          <span>地址</span>
          <input type="text" placeholder="详细地址" v-model="detail">
        </div>
        <button @click="saveTap">确认</button>
      </div>
    </div>

    <!-- 选择省市区 -->
    <van-popup v-model="cityOptions" position="bottom" safe-area-inset-bottom>
        <van-picker ref="picker" :columns="columns" value-key="value" :show-toolbar="true" @change="changeCityOptions" @confirm="confirmisCityOptions" @cancel="cityOptions=false"/>
    </van-popup>

    <!-- 兑奖记录 -->
     <van-popup v-model="prize" round position="bottom" :style="{ height: '70%' }" >
      <div class="prize-pop">
        <span class="title">兑奖记录</span>
        <div v-if="prizeList.length>0">
          <div class="prize-item" v-for="(item, index) in prizeList" :key="index">
            <img :src="item.image" alt="">
            <div>
              <p>{{ item.productName }}</p>
              <p> {{ timeFormat(item.createTime) }} 兑换</p>
            </div>
            <span @click="showDilog2(item.id)" v-if="!expire">重新挑选</span>
            <span v-else  style="filter: grayscale(100%);-webkit-filter: grayscale(100%);" >重新挑选</span>
          </div>
        </div>
        <div class="prize-none-img" v-else>
          <img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-eleven-prize-img1.png" alt="">
          <p>还没有兑换记录</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 活动是否过期
        expire: false,
        columns: [],
        prizeList: [],
        prize: false,
        citys:[],
        addressWrap: false,
        chance: 0,
        pList: [],
        cityOptions:false,
        address: '',
        detail: '',
        name: '',
        mobile: '',
        userInfo: {}
      }
    },
    watch: {
      prize(e) {
        if(e) {
          this.getConvert()
        }
      }
    },
    mounted () {
      window.scroll(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0
      this.getProduct()
      this.getCityList()
      this.getUserInfo()
      this.judgeDate()
    },
    methods: {
      timeFormat(date) {
        return date.replace(/2020-/, '')
      },
      // 判断活动是否过期
      judgeDate() {
        let day = new Date('2020-11-12')
        let now = new Date()
        if(now.getTime() > day.getTime()) {
          this.expire = true
        } else {
          this.expire = false
        }
      },
      showDilog2(id) {
        this.$dialog.confirm({
          title: '提示',
          message: '确认后将返还挑选机会，可重新选择赠品\n注意：11.12 24点之后不可再更改哦'
        }).then(() => { 
          this.resetConvert(id)
        }).catch(() => {
          // on cancel
        });
      },
      showDilog(code) {
        if (!this.address) {
          return this.$toast('请先选择收货地址哦')
        }
        if(!this.userInfo.haveConvertNum) {
          return this.$toast('你暂无挑选机会哦')
        }
        this.$dialog.confirm({
          title: '提示',
          message: '是否确认兑换该物品？将消耗一次挑选机会'
        }).then(() => { 
          this.saveConvert(code)
        }).catch(() => {
          // on cancel
        });
      },
      // 重新选择奖品
      resetConvert(id) {
        this._axios.get('/eleven/activity/convert/update/'+id).then(res => {
          if (res.data.respCode == 200) {
            this.$toast('挑选机会已返还，请重新挑选')
            this.prize = false
            this.getUserInfo()
            this.getProduct()
          }
        })
      },
      // 获取兑奖记录
      getConvert () {
        this._axios.post('/eleven/activity/convert/list', {}).then(res => {
          if (res.data.respCode == 200) {
            this.prizeList = res.data.data
          }
        })
      },

      // 兑换奖品
      saveConvert(code) {
        if (!this.address) {
          this.$toast('请先选择收货地址哦')
        }
        this._axios.post('/eleven/activity/convert/save', {
          productCode: code,
          status: 1
        }).then(res => {
          if (res.data.respCode == 200) {
            this.addressWrap = false;
            this.getUserInfo()
            this.getProduct()
            this.$toast('兑换成功');
          }
        })
      },

      // 获取用户信息
      getUserInfo () {
        this._axios.post('/eleven/activity/user/info', {}).then(res => {
          if(res.data.respCode == 200) {
            if(!res.data.data.province){
              this.address = null
            } else {
              this.address = res.data.data.province +'-'+res.data.data.city+'-'+res.data.data.district
            }
            this.detail = res.data.data.detail
            this.name = res.data.data.name
            this.mobile = res.data.data.mobile
            this.userInfo = res.data.data
          }
        })
      },
      // 获取奖品列表
      getProduct () {  
        this._axios.post('/eleven/activity/product/list',{}).then(res => {
          this.pList = res.data.data
        }).catch(err => {
          this.$toast('接口请求失败，稍后再试～');
          console.log(err);
        })
      },
      // 保存地址
      saveTap() {
        var reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
        if (this.$isEmpty(this.name)) {
          this.$toast('请填写姓名')
          return
        } else if (this.$isEmpty(this.mobile)) {
          this.$toast('请填写手机号码')
          return
        } else if (this.$isEmpty(this.address)) {
          this.$toast('请选择所在地区')
          return
        } else if (this.$isEmpty(this.detail)) {
          this.$toast('请填写详细地址')
          return
        } else if (!reg.test(this.mobile)) {
          this.$toast('手机号格式不正确');
          return
        }
        this._axios.post('/eleven/activity/save/address', {
          name: this.name,
          mobile: this.mobile,
          detail: this.detail,
          province: this.address.split('-')[0],
          city: this.address.split('-')[1],
          district: this.address.split('-')[2]
        }).then(res => {
          if (res.data.respCode == 200) {
            this.addressWrap = false;
            this.$toast('保存地址成功');
          }
        });
      },
      // 获取城市
      getCityList() {
        this._axios.get('/address/cascader/list').then(res => {
          // this.loading = false;
          if (res.data.respCode == 200) {
            this.citys = res.data.data;
            this.columns = [
              {
                values: res.data.data,
                className: "column1"
              },
              {
                values: res.data.data[0].children,
                className: "column2"
              },
              {
                values: res.data.data[0].children[0].children,
                className: "column3"
              }
            ];
          }
        })
      },  
          // 居住地选择
      confirmisCityOptions(opt) {
        this.address = opt[0].value + '-' + opt[1].value + '-' + opt[2].value;
        this.cityOptions = false;
      },
      changeCityOptions(picker, opt, index) {
        if (index === 0) {
          var column1 = opt[0].value;
          for (var i = 0; i < this.citys.length; i++) {
            if (column1 == this.citys[i].value) {
              picker.setColumnValues(1, this.citys[i].children)
              picker.setColumnValues(2, this.citys[i].children[0].children)
            }
          } 
        }
        if (index === 1) {
          var column2 = opt[1].value;
          for (let i = 0; i < this.citys.length; i++) {
            for (var j = 0; j < this.citys[i].children.length; j++) {
              if (column2 == this.citys[i].children[j].value) {
                picker.setColumnValues(2, this.citys[i].children[j].children)
              }
            }
          }
        }
      },
    }
  }
</script>

<style lang="less" scoped>
.welfare-dz i{
  font-style: normal;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 4rem;
  vertical-align: bottom;
  display: inline-block;
}
.prize-none-img{
  margin: 1.2rem 1.72rem 0;
  text-align: center;
  img{
    width: 100%;
    display: block;
  }
  p{
    line-height: .42rem;
    font-size: .30rem;
    text-align: center;
    color: #060A14;
    opacity: .5;
    font-weight: 400;
  }
}
.prize-pop{
  padding: 0 .3rem;
  box-sizing: border-box;
  font-size: 0;
}
.prize-pop .title{
  height:1rem;
  line-height: 1rem;
  font-size: .3rem;
  font-weight: 600;
}
.prize-item{
  position: relative;
  padding: .15rem 0;
  box-sizing: border-box;
  padding-left: 1.4rem;
  height: 1.5rem;
  box-sizing: border-box;
}
.prize-item img{
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  left: 0;
}
.prize-item > div p:first-of-type{ 
  height: .42rem;
  font-size: .3rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #060A14;
  margin-top: .2rem;
  line-height: .42rem;
}
.prize-item span{
  width: 1.5rem;
  height: .5rem;
  color:#FF6C00;
  background: rgba(249, 126, 36, 0.1);
  border-radius: .33rem;
  border: .01rem solid rgba(249, 126, 36, 0.3);
  position: absolute;
  right: 0;
  top: .58rem;
  font-size: .24rem;
  text-align: center;
  line-height: .5rem;
}
.prize-item > div p:nth-of-type(2) {
  height: .33rem;
  font-size: .24rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #060A14;
  opacity: .5;
  line-height: .33rem;
}
 .right-dw{
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
.address-alert{
  width: 6.3rem;
  display: block;
  margin: auto;
  text-align: center;
  border: .01rem solid #FFEFBB;
  background: #FFFAEA;
  font-size: .26rem;
  color:#FF6C00;
  margin-bottom: .3rem;
  height: .7rem;
  line-height: .7rem;
}
.return-pay{
  background: url(https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img24.png) no-repeat;
  background-size: cover;
  width: 2.8rem;
  height: .8rem;
  display: block;
  margin: auto;
}
.chance-wrap{
  margin-top: .68rem;
  text-align: center;
  font-size: .34rem;
  color:#fff;
  width: 100%;
  font-weight: 500;
}
.welfare-top > .welfare-dz{
  padding: 0 .5rem 0.2rem;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.welfare-dz{
  width:100%;
  font-size: 0;
}
.welfare-dz p {
  font-size: .26rem;
  color:#fff;
}
.welfare-dz p span {
  float: right;
  padding-right:.3rem;
  position: relative;
}
.welfare-dz p span img{
  width: .3rem;
  display: inline-block;
  position: absolute;
  right: 0;
  top:.03rem
}
.welfare-top{
  width: 100%;
  height: 10rem;
  position: relative;
  background: url(https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img23.png) no-repeat;
  background-size: cover;
}
.welfare-middle{
  padding-top: .3rem;
  width: 100%; 
  box-sizing: border-box;
  height: 25.6rem;
  background: url(https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img26.png) no-repeat;
  background-size: cover;
  position: relative;
}
.product-list{
  padding: 0 .45rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: .86rem;
}
.product-item{
  width: 3rem;
  height: 3.7rem;
  margin-bottom: .83rem;
  background: #FFF1E2;
  border-radius: .1rem;
  border: .05rem solid #FFC076;
  position: relative;
  padding-top: .4rem;
  font-size: 0;
  box-sizing: border-box;
  text-align: center;
}
.product-item > div{
  background: url(https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint59/double-11-img27.png) no-repeat;
  background-size: cover;
  width: 1.6rem;
  height: .66rem;
  display: block;
  margin: auto;
}
.product-item > i{
  width: 1.4rem;
  height: .40rem;
  background: linear-gradient(90deg, #DC7D48 0%, #EBB07E 100%);
  border-top-left-radius: .1rem;
  border-bottom-right-radius: .1rem;
  position: absolute;
  top: -.05rem;
  color:#fff;
  left: -.05rem;
  line-height: .36rem;
  text-align: center;
  font-style: normal;
  font-size: .24rem;
}
.product-item > img{
  width:2rem;
  height:2rem;
  display: block;
  margin: auto;
}
.product-item > span{
  margin-top: .27rem;
  font-size: .28rem;
  font-family: PingFangTC-Regular, PingFangTC;
  font-weight: 400;
  color: #060A14;
  line-height: .4rem;
  margin-top: .27rem;
  margin-bottom: .26rem;
  display: block;
}
.address-wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.8);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.3rem;
  z-index: 3;
  .address-block{
    background:rgba(255,255,255,1);
    border-radius:.10rem;
    position: relative;
    padding: .3rem 0.3rem 0 0.3rem;
    box-sizing: border-box;
    width: 100%;
    .address-close{
      position: absolute;
      top: 0.3rem;
      right: 0.4rem;
      width: 0.26rem;
      height: 0.26rem;
    }
    .address-tip{
      position: absolute;
      top: 0.4rem;
      left: 0;
      width: 4.6rem;
      height: 0.52rem;
    }
    div{
      display: flex;
      justify-content: space-between;
      span{
        font-size:.32rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:700;
        color:rgba(6,10,20,1);
        line-height:.9rem;
      }
      input{
        // border-bottom: solid 1px rgba(0,0,0,.2);
        width: 75%;
        height: 0.9rem;
        font-size: 0.3rem;
      }
      i{
        // border-bottom: solid 1px rgba(0,0,0,.2);
        font-size: 0.3rem;
        line-height: 0.9rem;
        width: 75%;
        em{
          font-style: normal;
          color:rgba(6,10,20,.2);
        }
      }
    }
    button{
      width:100%;
      line-height:.90rem;
      background:rgba(249,126,36,1);
      border-radius:.08rem;
      text-align: center;
      display: block;
      font-size:.32rem;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:700;
      color:rgba(255,255,255,1);
      margin: 0.7rem 0 0.4rem 0;
    }
    label{
      font-size:.24rem;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:700;
      color:rgba(51,51,51,1);
      line-height:.33rem;
      display: block;
      text-align: center;
      padding-bottom: 0.2rem;
    }
  }
}
</style>