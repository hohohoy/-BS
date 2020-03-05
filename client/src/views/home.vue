<template>
    <div class="home">
        <div class="containers">
    <el-carousel style="min-width:600px" :interval="3000" arrow="always" indicator-position="none" height="320px">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <el-row>
          <el-col :span="24">
              <img v-bind:src="img.url" />
              </el-col>
          </el-row>
      </el-carousel-item>
    </el-carousel>
        </div>
        <div class="row">
      <div class="caption">
        <p class="welcome"> welcome to our world</p>
        <p class="chinese" >用心服务,智慧加油欢迎您</p>
      </div>
    </div>
    <div class="ad">
        <div class="ad-left">
            <el-carousel id="ad2" height="200px" direction="vertical" :autoplay="false"  :interval="3000" arrow="always">
                <el-carousel-item v-for="(item,index) in adimg" :key="index">
                    <el-row>
                        <el-col :span="12">
                <!-- <h3 class="medium">{{ item }}</h3> -->
                            <img v-bind:src="item.url" />
                        </el-col>
                    </el-row>
                </el-carousel-item>
            </el-carousel>
            <div class="bottom">
                <h4 class="maintitle">最新公告</h4>
                        <!-- [{{news.time.slice(0,10)}}] -->
                <ul v-for="(news,idd) in noticelist" :key="idd">
                    <li style="font-size:14px">
                        <router-link  v-bind:to="'/news/newstoshow/'+news.id"><span>{{news.title.slice(0,18)}}...</span> <span>{{news.time.slice(0,10)}}</span></router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="ad-right">
            <h3 class="maintitle">重要专题</h3>
            <ul >
                <div v-for="(news,idd) in importantnews" :key="idd" class="content-li">
                    <router-link  v-bind:to="'/news/newstoshow/'+news.id" ><li style="font-size:15px;">{{news.title.slice(0,15)}}...</li></router-link>
                </div>
            </ul>
        </div>
    </div>
        <section class="services homewrapper">
		<ul>
            <a href="/news">
			<li class="animated wow fadeInDown">
				<img class="icon" src="../assets/img/icon1.png" alt=""/>
				<span class="separator"></span>
				<h2>关于企业</h2>
			</li>
            </a>
            <a href="/news">
			<li class="animated wow fadeInDown"  data-wow-delay=".2s">
				<img class="icon" src="../assets/img/讨论.png" alt=""/>
				<span class="separator"></span>
				<h2>新闻中心</h2>
			</li></a>
            <a href="/about">
			<li class="animated wow fadeInDown"  data-wow-delay=".4s">
				<img class="icon" src="../assets/img/帮助.png" alt=""/>
				<span class="separator"></span>
				<h2>引导与帮助</h2>
			</li>
            </a>
		</ul>
	</section>
    </div>
</template>
<script>
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import {getTime} from '../assets/js/common'
export default {
    name:"home",
    components:{
    },
    data(){
        return{
        imgList:[
            {url:require('../assets/img/1.jpg')},
            {url:require('../assets/img/2.jpg')},
            {url:require('../assets/img/3.jpg')},
      ],
      adimg:[
          {url:require('../assets/img/homead1.jpg')},
          {url:require('../assets/img/homead2.jpg')},
          {url:require('../assets/img/homead3.jpg')}
      ],
      newsData:[]
    }
},
created(){
        this.$axios.get('api/profile/shownews')  //新闻接口
		.then(res=>{
            this.newsData=res.data;
            for (let i = 0; i < this.newsData.length; i++) {
                let timeStamp=new Date(this.newsData[i].time);
                var nowTime= getTime(timeStamp);
                this.newsData[i].time=nowTime;
            }
		})
        .catch(err => console.log(err))
    },
    computed: {
        noticelist:function(){
          var list= this.newsData.filter((item)=>{
             return item.type=='公告'
         })
         return list.filter((item,index)=>{
             return index<2  //只显示两条公告
         })
        },
        importantnews:function(){
            // return
            var list= this.newsData.filter((item)=>{
                return item.type=='重要专题';
            })
            return list.filter((item,index)=>{
                return index<5
            })
        }},
methods:{

    }

}
</script>

<style scoped>
@import '../assets/maincss/maincss.css';
/* @import '../assets/maincss/fancybox.css';
@import "../assets/maincss/main.css";  */
a{
    color: black;

}
a:hover{
    color: rgb(49, 49, 156);
    
}
.home{
  width: 90%;
    margin: 0 auto;
}
.containers {
  width: 100%;
  min-width: 600px;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  text-align: center;
  font-size: 20px;
  margin: 0 auto;
}
.el-carousel{
    width: 100%;
    /* min-width: 600px; */
}
/* .el-carousel__item{
    height: 310px;
} */
h2{
    padding-bottom:50px 
}
.ad{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:15px;
}
.maintitle{
    font-family: mychinesefont;
    color: rgb(49, 49, 156);
}
.ad .ad-left{
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.ad .ad-left .bottom{
    width: 100%;
    height: 100px;
    /* border: 1px solid rgb(182, 187, 212); */
    margin-top: 10px;
    padding: 5px 10px;
    background: rgb(236, 237, 240);
    border-radius: 10px;
}
.ad .ad-left .bottom ul>li a{
    display: flex;
    justify-content: space-between;
}
.ad .ad-right{
    width: 42%;
    height: 100%;
    margin-left: 10px;
    background: rgb(240, 241, 243);
    padding: 15px 10px;
    /* border: 1px solid rgb(38, 39, 110); */
    border-radius: 10px;
    /* position: relative; */

}
.ad .ad-right .content-li{
    height: 45px;
    line-height:45px;
    border-radius: 3px;
    font-size: 16px;
    position: relative;
    
}
.ad .ad-right .content-li li{
    width: 100%;
    height: 43px;
    line-height:40px;
    border-radius: 3px;
    font-size: 16px;
    padding: 0 5px;
    position: absolute;
    top: 3px;
    color: rgb(85, 83, 83);
}
.ad .ad-right .content-li li:hover{
    top: 0px;
    transition:all .2s linear;
    box-shadow: 0 0 16px #d2d2d2;
}
#ad{
    width: 300px !important;
}
.el-carousel__container{
    
    width: 300px!important;
}
.ad .el-row{
    height: 200px;
    background: rgba(204, 32, 2, 0.712);
}
.ad img{
    height: 200px;
}
.ad .el-carousel__button{
    background-color: rgb(75, 74, 74)!important;
}
.caption{
    width: 100%;
    text-align:center;
}
.caption .welcome{
    margin: 20px 0;
    font-family: myEnglishfont;
    font-size: 20px;
    /* font-weight: bold; */
}
.caption .chinese{
    font-size:25px;
    font-family: mychinesefont;
}
a:hover{
    text-decoration: none!important;
}
</style>


