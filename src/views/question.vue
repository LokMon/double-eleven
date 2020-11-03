<template>
<div class="container">
	<div class="question-logo-wrap">
		<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img1.png" alt="">
		<span v-show="index !== 1 && index !== 5" :class="{'forbidden' : prevBtn}" @click="prevPage()">上一题</span>
	</div>
	<!-- 第一题 -->
	<div :class="index == 1 ? 'question-message-block active' : 'remove question-message-block'" v-show="!isShow">
		<div :class="['white','message-wrap','left', {'fade-0': index == 1}]">
			<p>嗨，<span>{{ userInfo.nickName }}</span>童鞋，你所在的班级是<br>简七<span>《{{ relatedProduct.name }}》</span></p>
		</div>
		<div :class="['white','message-wrap','left', {'fade-1': index == 1}]">
			<p>接下来我们来花10秒钟相互认识一下吧~<span><br>我是女生，你呢？</span> </p>
		</div>
		<div :class="['message-select', 'select-a', {'fade-2': index == 1}]">
			<div @click="form.sex=1" :class="{ 'gray': form.sex==2 }">
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img2.png" alt="">
				<p>我是男生</p>
			</div>
			<div @click="form.sex=2" :class="{ 'gray': form.sex==1 }">
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img3.png" alt="">
				<p>我是女生</p>
			</div>
		</div>
		<div :class="['message-wrap','right', { 'fade-0' : form.sex }]">
			<p v-if="form.sex == 1" >我是男生</p>
			<p v-else>我是女生</p>
		</div><br>
		<div :class="['white', 'message-wrap', 'left', 'loading-message', { 'fade-0' : form.sex }]">
			<span></span><span></span><span></span>
		</div>
	</div>

	<!-- 第二题 -->
	<div :class="index == 2 ? 'question-message-block active' : 'remove question-message-block'" >
		<div :class="['white', 'message-wrap', 'left', {'fade-0': index == 2 }]">
			<p><template v-if="form.sex == 2">哇，和我一样呀！</template> <template v-if="form.sex == 1">了解，小哥哥请多关照！</template>  <br> <span>那你多大了呀？</span></p>
		</div>
		<div :class="['message-select', 'select-b', {'fade-1': index == 2}, {'forbidden': form.birthYear }]" >
			<p>我出生于...</p>
			<van-picker
				:columns="year"
				:default-index="75"
				@change="changeAge"
			/>
			<div class="select-b-button" v-show="!form.birthYear" @click="affirmAge()">确认</div>
		</div>
		<div :class="['message-wrap','right', { 'fade-0' : form.birthYear }]">
			<p>我今年{{ new Date().getFullYear() - form.birthYear }}岁</p>
		</div><br>
		<div :class="['white', 'message-wrap', 'left', 'loading-message', { 'fade-0' : form.birthYear }]">
			<span></span><span></span><span></span>
		</div>
	</div>

	<!-- 第三题 -->
	<div :class="index == 3 ? 'question-message-block active' : 'remove question-message-block'" >
		<div :class="['white', 'message-wrap', 'left', {'fade-0': index == 3 }]">
			<p>{{ countAge }}<br><span v-if="parseInt(form.birthYear) < 2000" >敢问阁下婚否？</span><span v-else>敢问阁下脱单否？</span> </p>
		</div>
		<div :class="['message-select', 'select-c', {'fade-1': index == 3}, {'forbidden': form.familyStatus }]" >
			<div :class="{'gray' : form.familyStatus !== '2014001' && form.familyStatus}" @click="form.familyStatus = '2014001'">
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img4.png" alt="">
				<p>目前我单身</p>
			</div>
			<div :class="{'gray' : form.familyStatus !== '2014004' && form.familyStatus}" @click="form.familyStatus = '2014004'">
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img5.png" alt="">
				<p>我在恋爱中</p>
			</div>
			<div :class="{'gray' : form.familyStatus !== '2014002' && form.familyStatus}" @click="form.familyStatus = '2014002'">
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img6.png" alt="">
				<p>我已婚，暂无小孩</p>
			</div>
			<div :class="{'gray' : form.familyStatus !== '2014003' && form.familyStatus}" @click="form.familyStatus = '2014003'">
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img7.png" alt="">
				<p>我已经有小孩了</p>
			</div>
		</div>
		<div :class="['message-wrap','right', { 'fade-0' : form.familyStatus}]">
			<p v-if="form.familyStatus == '2014001'">目前我单身</p>
			<p v-else-if="form.familyStatus == '2014004'">我在恋爱中</p>
			<p v-else-if="form.familyStatus =='2014002'">我已婚，暂无小孩</p>
			<p v-else-if="form.familyStatus == '2014003'">我已经有小孩了</p>
		</div><br>
		<div :class="['white', 'message-wrap', 'left', 'loading-message', { 'fade-0' : form.familyStatus}]">
			<span></span><span></span><span></span>
		</div>
	</div>

	<!-- 第四题 -->
	<div :class="index == 4 ? 'question-message-block active' : 'remove question-message-block'" >
		<div :class="['white', 'message-wrap', 'left', {'fade-0': index == 4 }]">
			<p>嗯嗯，知道啦～最后一个问题，<br><span>你目前的理财阶段是？</span> </p>
		</div>
		<div :class="['message-select', 'select-d', {'fade-1': index == 4}, {'forbidden': form.financialStage }]" >
			<div>
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img8.png" :class="{'gray' : form.financialStage !== '2023001' && form.financialStage}" @click="form.financialStage = '2023001'" alt="">
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img9.png" :class="{'gray' : form.financialStage !== '2023002' && form.financialStage}" @click="form.financialStage = '2023002'" alt="">
				<img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img10.png" :class="{'gray' : form.financialStage !== '2023003' && form.financialStage}" @click="form.financialStage = '2023003'" alt="">
			</div>
		</div>
		<div :class="['message-wrap','right', { 'fade-0' : form.financialStage }]">
			<p v-if="form.financialStage == '2023001'">入不敷出，想存下第一桶金</p>
			<p v-else-if="form.financialStage == '2023002'">小有储蓄，想学习投资让财富增值</p>
			<p v-else-if="form.financialStage == '2023003'">有一定投资经验，想提升收益率</p>
		</div><br>
		<div :class="['white', 'message-wrap', 'left', 'loading-message', { 'fade-0' : form.financialStage }]">
			<span></span><span></span><span></span>
		</div>
	</div>

	<!-- 第五页 -->
	<div :class="index == 5 ? 'question-message-block active' : 'remove question-message-block'" >
		<div :class="['white', 'message-wrap', 'left', {'fade-0': index == 5 }]">
			<p>全部完成啦，超棒的！学籍办理成功～<br><span>现在就可以添加班班微信，正式开始变富之旅啦！</span> </p>
		</div>
		<div :class="['message-select', 'select-e', {'fade-1': index == 5}]" >
			<div class="wechat-wrap"><img src="https://jane7-prod.oss-cn-hangzhou.aliyuncs.com/v2/sprint58/question-img11.png" alt=""><img :src="relatedProduct.qrcodeImg" class="qrcode-img" alt=""><!-- <span>微信加我，进群上课</span> --></div>
			<p>扫描二维码图片<br>添加班班微信，开启学习之旅</p>
		</div>
	</div>

</div>
</template>

<script>
export default {
  data() {
    return {
			//上一题按钮
			prevBtn: false,
			userInfo:{},
			isShow: false,
			year: [],
			index: 1,
			age:{
				index: 75,
				value: '1995'
			},
			type: '2022001',
			form:{
				sex: null,
				birthYear: null,
				familyStatus: null,
				financialStage: null
			},
			localObj:{},
			practicalVo:{},
			relatedProduct:{},
			skipLink: {}
    }
	},
	computed: {
		countAge () {
			let date = new Date();
			let year = this.age.value.toString().substring(2,3)
			let _age = date.getFullYear() - Number(this.form.birthYear)

			if(_age <= 30 && _age >= 21) {
				return `好巧哎，同为90后呢！`
			} else if (_age >= 31) {
				return `啊，是${year}0后前辈。我是90后，得多多向你学习啦~`
			} else if (_age <=20) {
				return `啊，是${year}0后呢，我们都是祖国未来的花朵嘿嘿~`
      }
      return false
		}
	},
	watch: {
		'form.sex': function () {
			if(this.form.sex) {
				let time = this.localObj && this.localObj.sex ? 0 : 1000
				this.prevBtn = true
				this.changeQuestion(2, time)
				this.storageObj(this.form)
			} else {
				this.changeQuestion(1, 0)
			}
		},
		'form.birthYear': function () {
			if(this.form.birthYear) {
				let time = this.localObj && this.localObj.birthYear ? 0 : 1000
				this.prevBtn = true
				this.changeQuestion(3, time)
				this.storageObj(this.form)
			} else {
				this.changeQuestion(2, 0)
			}
		},
		'form.familyStatus': function () {
			if(this.form.familyStatus) {
				let time = this.localObj && this.localObj.familyStatus ? 0 : 1000
				this.prevBtn = true
				this.changeQuestion(4, time)
				this.storageObj(this.form)
			} else {
				this.changeQuestion(3, 0)
			}
		},
		'form.financialStage': function () {
			if(this.form.financialStage) {
				let time = this.localObj && this.localObj.financialStage ? 0 : 1000
				this.prevBtn = true
				this.saveQuestion()
				this.changeQuestion(5, time)
				this.storageObj(this.form)
				this.getQrcode()
			}
		}
	},
  created() {
		for(let i = 1920; i<=2020; i++) {
			this.year.push(i+'年')
		}
		this.getUser()
		this.getQrcode()
		this.storageGet()
	},
	methods: {
		getQrcode() {
			this._axios.get("/page/custom/detail").then(res => {
				try {
					this.skipLink = res.data.data.skipLink
					this.relatedProduct = {
						qrcodeImg: res.data.data.relatedProduct.groupQrCode.imageUrl,
						name: res.data.data.relatedProduct.name
					}
				} catch (error) {
          console.log(error);
				}
			})
		},
		getUser() { 
      this._axios.get('/userInfo')
		},
		saveQuestion() {
			// this._axios.post('/user-questionnaire/save', {
			// 	type: "2022001",
			// 	practicalVo: this.form
      // })
      console.log('保存问卷');
		},
		//上一题
		prevPage() {
			this.index -= 1
			switch (this.index) {
				case 4:
					this.form.financialStage = null
					break;
				case 3:
					this.form.familyStatus = null
					break;
				case 2:
					this.form.birthYear = null
					break;
				case 1:
					this.localObj = null
					this.form.sex = null
					this.isShow = false
					break;
				default:
					break;
			}
			this.localObj = null
		},
		storageObj(obj) {
			let o = JSON.stringify(obj);
			localStorage.setItem("question-obj",o)
		},
		storageGet() {
			this.localObj = JSON.parse(localStorage.getItem('question-obj'))
			if (this.localObj && this.localObj.sex) {
				this.isShow = true
				this.form = this.localObj
			} else {
				this.isShow = false
			}
		},
		changeQuestion(e, time) {
			setTimeout(() => {
				this.index = e
				this.prevBtn = false
			}, time)
		},
		changeAge(picker, value, index) {
			this.age['value'] = value
			this.age['index'] = index
		},
		affirmAge() {
			if(!this.age) {
				this.age['value'] = '1995年'
				this.age['index'] = 75
			}
			if(this.age['value'] == '2020年') {
				return this.form.birthYear = '2020'
			}
			this.form.birthYear = parseInt(this.age['value'])
		},
	}
}
</script>

<style lang='less' scoped>
.skipLink{
	display: block;
	text-align: center;
	font-size: 0;
	span{
		font-size: .26rem;
		display: inline-block;
		height: .65rem;
		width: 3.2rem;
		background: rgb(255, 150, 0);
		line-height: .65rem;
		border-radius: .06rem;
		color:#fff;
		margin-bottom: .2rem;
		font-weight: 600;
	}
}
@keyframes fade{
	0%{
		transform:translateY(20px);
		opacity: 0;
		visibility: hidden;
	}
	100%{
		transform: translateY(0);
		opacity: 1;
		visibility: visible;
		z-index: 2;
	}
}
@keyframes remove{
	0%{
		opacity: 1;
		visibility: visible;
		transform: translateY(0px);
	}
	100% {
		visibility: hidden;
		opacity: 0;
		transform: translateY(-20px);
	}
}
@keyframes slide{
	0%{
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-3px);
	}
	100%{
		transform: translateY(0);
	}
}
.loading-message{
	width:1.3rem!important;
	height: .4rem;
	span{
		display: inline-block;
		width: .14rem;
		height: .14rem;
		border-radius: 50%;
		background-color: #FF6C00;
		position: relative;
		top: .1rem;
		vertical-align: top;
		margin-left: .15rem;
	}
	&>span:first-of-type{
		animation: slide .9s   alternate  infinite linear;
	}
	&>span:nth-of-type(2){
		animation: slide .9s .3s  alternate  infinite linear;
	}
	&>span:nth-of-type(3){
		animation: slide .9s .6s alternate  infinite linear;
	}
	position: relative;

}
.forbidden{
	pointer-events: none;
}
.fade-0{
	animation:1s fade forwards;
}
.fade-1{
	animation:1s 1s fade forwards;
} 
.fade-2{
	animation:1s 2s fade forwards;
} 
.fade-3{
	animation:1s 3s fade forwards;
} 
.fade-4{
	animation:1s 4s fade forwards;
} 
.container{
	background-color: #F5F6FA;
	height: 100vh;
	position: relative;
}
.message-select{
	padding:.3rem;
	background-color: #fff;
	border-radius: 8px;
	margin-bottom: .2rem;
	.gray{
		opacity:.4;
		user-select: none;
		pointer-events: none;
		transition: all .3s;
	}
}
.select-a{
	display: flex;
	justify-content: space-around;
	margin-bottom: .2rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	opacity: 0;
	img{
		width:1.7rem
	}
	div{
		text-align: center;
		p{
			color:#060A14;
			font-size: .28rem;
			line-height: .4rem;
			margin-top: .12rem;
		}
	}
}
.select-b{
	opacity: 0;
	border: 1px solid rgba(0, 0, 0, 0.1);
	p{
		font-size: .32rem;
		color:#060A14
	}
	.select-b-button{
    width: 3.4rem;
    height: 0.7rem;
    line-height: 0.7rem;
    border-radius: 4px;
    display: block;
    background: #F97E24;
    font-size: .3rem;
    text-align: center;
    color: #fff;
    margin: .2rem auto 0;
    cursor: pointer;
	}
}
.select-c {
	opacity: 0;
	border: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: space-around;
	padding-top: .36rem;
	padding-bottom: 0;
	flex-wrap: wrap;
	&>div{
		width: 40%;
		margin-bottom: .36rem;
		text-align: center;
		img{
			display: block;
			width: 1.7rem;
			margin: auto;
		}
		p{
			font-size: .28rem;
			color: #060A14;
			line-height: .4rem;
			margin-top: .1rem;
		}
	}
}
.select-d {
	opacity: 0;
	border: 1px solid rgba(0, 0, 0, 0.1);
	img{
		width: 100%;
		display: block;
		+img{
			margin-top: .3rem;
		}
	}
}
.select-e {
	font-size: 0;
	opacity: 0;
	border: 1px solid rgba(0, 0, 0, 0.1);
	.wechat-wrap{
		width: 3.2rem;
		position: relative;
		text-align: center;
		margin: auto;
		>img:first-of-type{
			width: 100%;
			display: block;
			pointer-events: none;
		}
		.qrcode-img{
			position: absolute;
			width: 2.6rem;
			height: 2.6rem;
			top:.3rem;
			left: 50%;
			transform: translateX(-50%);
			z-index: 10;
		}
		span{
			position: absolute;
			color: #fff;
			width: 2.6rem;
			height: .4rem;
			background-color: #F97E24;
			text-align: center;
			bottom: .3rem;
			left: 50%;
			transform: translateX(-50%);
			font-size: .22rem;
			line-height: .4rem;
		}
	}
	p{
		text-align: center;
		font-size: .32rem;
		line-height: .5rem;
		margin-top: .3rem;
	}
}

.message-wrap{
	max-width:5.8rem;
	padding: .2rem;
	position: relative;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	opacity: 0;
	width:auto;
	display: inline-block;
	vertical-align: top;
	p{
		font-weight: 400;
		font-size: .32rem;
		line-height: .5rem;
		span{
			color:#F97E24
		}
	}
	margin-bottom: .2rem;
	&.left::before{
		content: '';
		position: absolute;
		left: -.1rem;
		width: .2rem;
		height: .2rem;
		border-top: 1px solid  rgba(0, 0, 0, 0.1);
		border-left: 1px solid  rgba(0, 0, 0, 0.1);
		transform: rotate(-45deg);
		background-color: #fff;
		z-index: 1;
		border-radius: 2px;
		transform-origin: center center;
		top:.3rem
	}
	&.right{
		color:#fff;
		float:right;
		width:auto;
		background-color: #F97E24;
		max-width: 5.8rem;
		border:0
	}
	&.right::before{
		content: '';
		position: absolute;
		right: -.08rem;
		width: .2rem;
		height: .2rem;
		transform: rotate(-45deg);
		background-color: #F97E24;
		z-index: 1;
		border-radius: 2px;
		transform-origin: center center;
		top:.3rem
	}
	&::after{
		content: '';
		display: block;
		clear: both;
	}
}
.white{
	background-color: #fff;
}
.og{
	background-color: #F97E24
}
.question-message-block{
	padding:0 .3rem;
	opacity: 0;
	position: absolute;
	z-index: -1;
	transition: all .6s;
	box-sizing: border-box;
	width: 100%;
	&.active{
		opacity: 1;
		z-index: 2;
	}
	&.remove{
		animation: remove .6s forwards;
	}
}
.question-logo-wrap{
	width: 100%;
	height: 1.8rem;
	background: linear-gradient(180deg, rgba(255, 237, 197, 0.7) 0%, rgba(255, 237, 197, 0) 100%);
	display:flex;
	justify-content: center;
	align-items: center;
	img{
		width:1.2rem
	}
	span{
		position: absolute;
		left: .3rem;
		color: #F97E24;
		font-size: .3rem;
	}
}
</style>