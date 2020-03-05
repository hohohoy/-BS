<template>
    <div class="myshop">
      <div class="myshop_left">
      <!-- <button @click="load">test</button> -->
      <div class="baseinfo" >    
        <div class="baseinfo_head">
            <img class="avatar" :src="user.avatar" />
            <div class="baseinfo_box">
          <span>{{user.name}}</span>
          <span><i class="iconfont iconhuiyuan" style="color:#EF4868"></i>
            <!-- <img src="../assets/img/hybg.png" alt=""> -->
          <!-- <i class="iconfont iconyouxiang3" style="color:blue;" @mouseover="showemail"  @mouseout="hideemail"></i> -->
          <el-tooltip class="item" effect="dark" :content="user.email" placement="bottom">
          <i class="iconfont iconyouxiang3" style="color:blue;"></i>
    </el-tooltip>
          </span>
          <span id="email" style="border:1px solid #ccc;border-radius:8px;padding:3px;display:none;font-size:10pt">{{user.email}}</span>
          <!-- <a href="//i.taobao.com/user/baseInfoSet.htm?nekot=1571664546870&tracelog=newmytb_bianjiziliao" target="_blank" class="s-avatar" data-spm="d4911997" >
              <span>编辑资料</span>
          </a> -->
          </div>
      </div>
          <div class="baseinfo_bottom">
            <ul>
              <li @click="all($event)">全部</li>
              <li @click="convented($event)">已兑换</li>
              <li @click="unexchange($event)">未兑换</li>
              <!-- <el-select v-model="selectitem" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value"
                :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <!-- <li><input type="text" v-model="search" placeholder="请输入搜索内容"></li> -->
            </ul>
          </div>
          </div>
        
      </div>  
      <div class="myshop_right">
        <div class="mylist_head">
            <span><i class="iconfont iconqingdan1"></i>
            兑换列表</span>
          </div>
        <div class="mylist" v-for="(item,id) in showlist" v-bind:key="id">
              <!-- <img :src="require('../../static/'+item.picname)" />	 -->
              <img :src="'/static/'+item.picname" />	
              <div class="box" style="position:relative;">		
                <p class="goodsname">{{item.goodsname}}</p> 
                <p>兑换码:<span>{{item.randomcode}}</span></p> 
                <p class="status" ref="status" style="font-family:stfont">{{item.status}}</p>
                <p style="position:absolute;right:0;bottom:0">{{item.time.slice(0,10)}}</p>
              </div>	
      </div>
        <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
						v-if="paginations.total > 0"
      					@size-change="handleSizeChange"
      					@current-change="handleCurrentChange"
      			        :current-page="paginations.page_index"
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
      					:layout="paginations.layout"
      					:total="paginations.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <!-- <div class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <div class="mylist infinite-list-item" v-for="(item,id) in showlist"
            v-bind:key="id">
              <img :src="require('../../static/'+item.picname)" />	
              <div class="box">		
				<p>{{item.goodsname}}</p> 
				<p>兑换码:{{item.randomcode}}</p> 
				<p class="status">{{item.status}}</p>
				<p>{{item.time}}</p>

              </div>	
      </div>
  <p v-if="loading" style="margin-top:10px;" class="loading">
          <span></span>
        </p>
  <p v-if="noMore" style="margin-top:10px;font-size:13px;color:#ccc">没有更多了</p>
  </div> -->
      </div>
      <!-- <button @click="test"></button> -->
    </div>
</template>
<script>
$(function(){
      
    })
import {getTime} from '../assets/js/common'
export default {
    name:'myshop',
    data(){
        return{
	    showlist: [],
      //需要给分页组件传的信息	  
      paginations: {
        page_index: 1, //当前位于哪页
        total: 0, //总页数
        page_size: 6, //一页显示条数
        page_sizes: [6, 12], //每页显示条数
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
            exchangelist:[],
            templist:[],
            showlist:[],
            showdatalist:[],
            search:'',
            selectitem:'',
        }
    },
  computed: {//计算属性
  user(){
        return this.$store.getters.user;
    },
    filteredlist:function(){
      if(this.search==''){
        if(this.selectitem===''){
          return this.showlist.filter((item)=>{
             return item.goodsname.match(this.search)
         })
        }
        if(this.selectitem==='已兑换'){
       this.showlist=this.showlist.filter((item)=>{
             return item.status.match(this.selectitem)
         })
         this.setPaginations();
         return this.showlist;
         }
         if(this.selectitem==='未兑换'){
        this.showlist=this.showlist.filter((item)=>{
             return item.status.match(this.selectitem)
         })
         this.setPaginations();
         return this.showlist;
         }
      }else{
        if(this.selectitem==='已兑换'){
          let arr= this.showlist.filter((item)=>{
              return item.status.match(this.selectitem)
         })
         this.templist=this.showlist;
         this.showlist=arr;
         return this.showlist.filter((item)=>{ //     // return item.status.match(this.selectitem).goodsname.match(this.search)
             return item.goodsname.match(this.search)

         })
         
      }
      if(this.selectitem==='未兑换'){
          let arr= this.showlist.filter((item)=>{
              return item.status.match(this.selectitem)
         })
         this.templist=this.showlist;
         this.showlist=arr;
         return this.showlist.filter((item)=>{ //     // return item.status.match(this.selectitem).goodsname.match(this.search)
             this.showlist=this.templist;
             return item.goodsname.match(this.search)

         })
      }
      }
     }
  },
  mounted(){

  //   $('.box>.status').each(function(){
  //   console.log($(this).text())
  //   if($(this).text()=='未兑换'){
  //     $(this).attr("color","red")
  //   }
  // })
  },
    created(){
      this.$axios.get("api/profile/myexchangelist/"+this.user.name)
      .then(res=>{
          for (let i = res.data.length-1,j=0; i >= 0; i--,j++) {
            // console.log(i)
            this.exchangelist[j]=res.data[i];
          }
          for (let i = 0; i < this.exchangelist.length; i++) {
            let timeStamp=new Date(this.exchangelist[i].time);
            var nowTime= getTime(timeStamp);
            this.exchangelist[i].time=nowTime;
              if(this.exchangelist[i].status===-1){
            this.exchangelist[i].status='未兑换'
          }
          else{
            this.exchangelist[i].status='已兑换'
          }   
          }
          this.showdatalist=this.exchangelist;
        this.setPaginations();
      })

    },
    updated(){
      var statusList=this.$refs.status;
      console.log(this.$refs.status)
      for (let i = 0; i < statusList.length; i++) {
        console.log(statusList[i].innerHTML)
        if(statusList[i].innerHTML==='未兑换'){
          console.log('1')
          statusList[i].style.color="red";
        }
        else{
          statusList[i].style.color="blue";

        }
      }
    },
    methods:{
      test(){
        this.$nextTick(()=>{
          let aa=this.$refs.status;
          console.log(aa)
        })
      },
      handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.showdatalist.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.showlist = table.filter((item, index) => {
		return index < this.paginations.page_size;
		// console.log(this.showlist)
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.showlist = this.exchangelist.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      // this.showlist=this.exchangelist.filter((item=>{
      //     return item.status.match('已兑换');
      //   }))
	  //设置分页属性
	  this.paginations.total = this.showdatalist.length;
      this.paginations.page_size = 6;
    //   this.paginations.total = Math.ceil(
    //     this.exchangelist.length / this.paginations.page_size
    //   );
      this.paginations.page_index = 1;
      //设置分页数据
      this.showlist=this.showdatalist.filter((item,index)=>{
      	return index<this.paginations.page_size;
      })
      // console.log(this.showdatalist);

    },
      showemail(){
        $("#email").css(
          "display","block"
          // "background","red"
        )
      },
      hideemail(){
        $("#email").css(
          "display","none"
          // "background","red"
        )
      },
      all(e){
        // this.paginations.page_index=1;
        // this.handleCurrentChange(1);
        this.selectitem="";
        this.search='';
        this.showdatalist=this.exchangelist;
        this.setPaginations();
        this.handleCurrentChange(1);
        $(e.target).css(
          "color","rgb(184, 29, 24)"
        ).siblings().css(
          "color","black"
        )
      },
      convented(e){
        this.search='';
        this.selectitem="已兑换";
        this.showdatalist=this.exchangelist.filter((item=>{
          return item.status.match('已兑换');
        }))
        // console.log(this.showlist)
        this.setPaginations();
        this.handleCurrentChange(1);
        // console.log(this.showlist)
        $(e.target).css(
          "color","rgb(184, 29, 24)"
        ).siblings().css(
          "color","black"
        )
      },
      unexchange(e){
        this.showlist=this.exchangelist;
        this.paginations.page_index=1;
        // this.handleCurrentChange(1);
        this.search='';
        this.selectitem="未兑换";
        // console.log(this.showlist)
        this.showdatalist=this.exchangelist.filter((item=>{
          return item.status.match('未兑换');
        }))
        // console.log(this.showlist);
        this.setPaginations();
        this.handleCurrentChange(1);
        $(e.target).css(
          "color","rgb(184, 29, 24)"
        ).siblings().css(
          "color","black"
        )
      }
    }
}
</script>
<style scoped>
/* .infinite-list{
  width: 890px;
  height: 400px;
} */
.myshop{
  min-width: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.myshop .myshop_left{
  width:19%;
  margin-left: 15px;
  margin-top: 10px;
  position: fixed;
  left: -15px;
}
.myshop .myshop_right{
  width: 60%;
  margin-left: 15px;
  position: relative;
}
.myshop .myshop_right .block{
  position: fixed;
  top: 60px;
 width: 330px;
 height: 300px;

}
.myshop .myshop_right .el-calendar{
  position: relative;
 width: 100%;
 height: 100%;
}
.el-calendar__body{
  height: 250px!important;
}
.myshop .myshop_right .date_head{
   text-align:center;
   background:rgba(184, 29, 24,0.8);
   height:30px;
   line-height:30px;
   color:#fff;
}
/* .myshop .myshop_right .el-calendar .el-calendar__body{
  height: 245px!important;
} */
.myshop_left .baseinfo{

}
.myshop .myshop_left .baseinfo_head{
  width: 100%;
  /* border: 0.5px solid #ccc; */
  box-shadow: 0 0 8px #ccc;
  background: #faf5f5;
  display: flex;
  padding-left: 15px;
  padding-top: 15px;
  height: 120px;
  border-top-right-radius: 30px;

}
.myshop .myshop_left .baseinfo .baseinfo_box{
  margin-left: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.myshop .myshop_left .baseinfo .baseinfo_box span{
  margin-top: 3px;
  font-size: 15px;
}
.myshop .myshop_left .baseinfo .baseinfo_box span img{
  margin-right: 5px;
  line-height: 40px;
}
.myshop .myshop_left .baseinfo .baseinfo_box span i{
  vertical-align: -2px;
}
.myshop .myshop_left .baseinfo img.avatar{
  /* position: absolute; 
  left: 50px; 
  top: -2px;  */
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.myshop .baseinfo_bottom{
  width: 100%;
  height: 100%;
  border: 2px solid rgb(241, 240, 240);
  border-bottom-right-radius: 30px;
  /* box-shadow: 0 6px 8px #ccc; */
  
  
}
.myshop .baseinfo_bottom ul{
  display: flex;
  justify-content: space-around;
  font-size: 10pt;
  display: flex;
  flex-direction: column;
  margin: 0;
}
.myshop .baseinfo_bottom ul li{
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}
.myshop .baseinfo_bottom ul li:hover{
  background: rgb(248, 248, 248);
}
.myshop .baseinfo_bottom ul li:nth-child(1){
    color: rgb(184, 29, 24);

}
.myshop .baseinfo_bottom ul li:hover{
  color: rgb(184, 29, 24);
  /* border-bottom: 1px solid blue; */
}
.myshop .mylist_head{
  width: 100%;
  margin-top: 10px;
  line-height: 60px;
  height:60px;
  box-shadow: 0 0 8px #ccc;
  background: #faf5f5;
  font-size: 15px;
  /* display: flex; */
  /* justify-content: space-around; */

}
.myshop .mylist_head span{
  margin-left: 15px;
}
.myshop .mylist{
  border: 2px solid rgb(241, 240, 240);
  width: 100%;
  display: flex;
  font-size: 11pt;
  padding:0 15px;
}
.myshop .mylist img{
    width:150px;
    height:150px;
    margin: 15px 0;
}
.myshop .mylist .box{
  margin: 15px 0;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  width: 35%;
}
.myshop .mylist .box p{
  margin-bottom: 10px;
}
.myshop .mylist .box p:nth-child(2)>span{
  color: rgb(235, 93, 93);
}
.myshop .mylist .box .status{
  color: blue;
}
.goodsname{
  color: #7c7c7c;
}
/* .loading span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #409eff;
  border-left: transparent;
  animation: zhuan 0.5s linear infinite;
  border-radius: 50%;
}
@keyframes zhuan {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
} */
</style>