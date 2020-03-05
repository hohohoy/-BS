<template>
    <div class="news">
        <div class="news_menu">
            <el-row class="tac">
  <el-col :span="22">
      <h3 style="color:rgb(82, 134, 231);margin-top:20px;">新闻中心</h3>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="selectIndex">
      <el-menu-item index="1" >
          <i class="el-icon-s-home"></i>
        <span slot="title">公司公告</span>
      </el-menu-item>
      <el-menu-item index="2">
         <i class="el-icon-location"></i>
        <span slot="title" >重要专题</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">最新资讯</span>
      </el-menu-item>
      <!-- <el-menu-item index="4">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">图片新闻</span>
      </el-menu-item> -->
    </el-menu>
  </el-col>
            </el-row>
        </div>
        <div class="newslist">
            <ul>
                <li v-for="(news,id) in shownews" v-bind:key="id">
                    <div class="ico"></div>    
                    <router-link  v-bind:to="'/news/newstoshow/'+news.id"><span class="title">{{news.title}}</span><span>{{news.time.slice(0,10)}}</span></router-link>
                </li>
            </ul>
            <div class="imgbox">
            <!-- <el-carousel :interval="2000" arrow="always" type="card" indicator-position="none" height="80px">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <el-row>
          <el-col :span="24"><img v-bind:src="img.url" /></el-col>
        </el-row>
      </el-carousel-item>
      </el-carousel> -->
      </div>
        </div>
         <!-- <div class="right-top">
            <img src="../assets/img/small-p1.jpg" alt="">
            <img src="../assets/img/small-p2.jpg" alt="">
        </div> -->
        <!-- <div class="right-top">
        
      </!--> 
    </div>
</template>
<script>
import {getTime} from '../assets/js/common'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
// $(function () {  
//     alert('111');
//     $("#checked").click();  
//  }); 
export default {
    name:'news',
    data(){
        return{
            newsData:[],
            shownews:[],
            imgList:[{url:require("../assets/img/small-p1.jpg")},
                     {url:require("../assets/img/small-p2.jpg")},
                     {url:require("../assets/img/small-p3.jpg")},
            ]
        }
    },
    created(){
        this.$axios.get('/api/profile/shownews')
		.then(res=>{
            this.newsData=res.data;
            for (let i = 0; i < this.newsData.length; i++) {
                let timeStamp=new Date(this.newsData[i].time);
                var nowTime= getTime(timeStamp);
                this.newsData[i].time=nowTime;
            }
            this.selectIndex("1");
		})
        .catch(err => console.log(err))
    },
    methods:{
        toshow(id){
            console.log(id)
            // this.$axios.get()
        },
        selectIndex(selectItem){
      switch (selectItem) {
            case "1":
          this.shownews= this.newsData.filter((item)=>{ //
        //   return item.status.match(this.selectitem);
        //      this.showlist=this.templist;
        // console.log(item)
            var thistype='公告';
             return item.type==thistype;

         })
          break;
          case "2":
          this.shownews= this.newsData.filter((item)=>{ 
            var thistype='重要专题';
             return item.type==thistype;

         })
          break;
          case "3":
          this.shownews= this.newsData.filter((item)=>{ 
            var thistype='最新资讯';
             return item.type==thistype;

         })
          break;
        }
        }
    }
}
</script>
<style scoped>
.el-menu{
    
    border: none;
}
div.news_menu{
    width: 280px;
}
div.news{
    position: relative;
    display: flex;
    justify-content: center;
    width: 80%;
    margin: 0 6%;
}
.new .news_menu h3{
    margin-top:20px;
    color:rgb(82, 134, 231);
}
div.newslist{
    position: relative;
    display: inline-block;
    
}
div.newslist ul{
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 720px;
    height: 400px;
    margin-left:2px ;
    list-style: none;
    text-align: center;
    overflow:auto;
}
div.newslist ul li{
    height: 18px;
    font-weight: bolder;
    padding:10px 0; 
    margin: 10px 0px;
    margin-right:30px;
    
}
div.newslist ul li a{
    cursor: pointer;
    color: rgb(114, 115, 116);
    font-weight: 500;
    font-size: 15px;
    margin:8px 0px; 
    display: flex;
    justify-content: space-between;
}
div.newslist ul li a span.title:hover{
    color: rgb(53, 54, 54)
}
div.ico{
    float: left;
    margin:5px 10px; 
    height: 0px;
    width: 0px;
    border-left: 10px solid rgb(233, 31, 31);
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent; 
}
div.right-top{
    float:right;
    width: 550px;
    height: 80px
}
.imgbox{
    margin: 20px 0;
}
span{
    color: rgb(114, 115, 116);
    font-weight: 500;
    font-size: 15px;
    height: 18px;
    line-height: 18px;
}
</style>