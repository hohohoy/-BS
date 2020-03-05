<template>
  <div class="shop">
    <div class="left">
      <section class="shoplist">
        <div class="wrapper">
          <!-- <button @click="submitShop($event)">124</button> -->
          <!-- <div class="item animated wow fadeInDown" :data="showlist" v-for="(goods,id) in shopData" v-bind:key="id"> -->
          <!-- <div
            class="item animated wow fadeInDown"
            v-for="(goods,id) in shopData.slice((this.paginations.page_index-1)*6,this.paginations.page_index*6)"
            v-bind:key="id"
          > -->
              <!-- <img src="../../static/pic-1571402049438.jpg" /> -->
		  <div class="item animated fadeInDown" style="height:440px;"
            v-for="(goods,id) in showlist"
            v-bind:key="id">
            <a href="#">
               <!-- <p>{{goods.goodspic}}</p> -->
              <!-- <img class="goodspic" :src="require('../../static/'+goods.picname)" /> -->
              <img class="goodspic" :src="'/static/'+goods.picname" />
            </a>
            <div class="option" style="display:flex;flex-direction:column">
              <div style="width:60px;margin-top:5px;font-size:14px;" >库存:<span>{{goods.quantity}}</span></div>
              <h1 style="height:80px;width:100%;margin:0;">{{goods.name}}</h1>
              <!-- <div style="margin-top:5px;font-size:14px;"></div> -->
            </div>
            <div class="option">
            <span class="money">{{goods.price}}积分</span>
            <button @click="submitShop(goods.price,goods.id,goods.picname,goods.name,goods.quantity)">兑换</button>
          </div>
          </div>
              <!-- <img src="../assets/img/1.jpg" alt /> -->

              <!-- <img src="..\..\static\pic-1571372032467.jpg" alt=""> -->
          <!-- <ul class="clearfix">
				<li class="animated wow fadeInDown" v-for="(goods,id) in shopData" v-bind:key="id">
					<div class="media">
						<div class="date">
							<span class="day">1</span>
							<span class="month">爆款</span>
						</div>
						<a href="#">
							<img src="../assets/img/s1.png" alt=""/>
						</a>
					</div>
                    <h1>汽车燃油宝 </h1>
					<span class="money">1000积分</span>
				        <button>兑换</button>
				</li>

				<li class="animated wow fadeInDown" data-wow-delay=".2s">
					<div class="media">
						<div class="date">
							<span class="day">11</span>
							<span class="month">May</span>
						</div>
						<a href="#">
							<img src="../assets/img/s1.png" alt=""/>
						</a>
					</div>
						<h1>汽车燃油宝 </h1>
					<span class="money">1000积分</span>
				        <button>兑换</button>
				</li>

				<li class="animated wow fadeInDown" data-wow-delay=".4s">
					<div class="media">
						<div class="date">
							<span class="day">13</span>
							<span class="month">Feb</span>
						</div>
						<a href="#">
							<img src="../assets/img/s1.png" alt=""/>
						</a>
					</div>
						<h1>汽车燃油宝 </h1>
					<span class="money">1000积分</span>
				        <button>兑换</button>
				</li>
			</ul>
            <ul class="clearfix">
				<li class="animated wow fadeInDown">
					<div class="media">
						<div class="date">
							<span class="day">25</span>
							<span class="month">Jun</span>
						</div>
						<a href="#">
							<img src="../assets/img/s1.png" alt=""/>
						</a>
					</div>
                    <h1>汽车燃油宝 </h1>
					<span class="money">1000积分</span>
				        <button>兑换</button>
				</li>

				<li class="animated wow fadeInDown" data-wow-delay=".2s">
					<div class="media">
						<div class="date">
							<span class="day">11</span>
							<span class="month">May</span>
						</div>
						<a href="#">
							<img src="../assets/img/s1.png" alt=""/>
						</a>
					</div>
						<h1>汽车燃油宝 </h1>
					<span class="money">1000积分</span>
				        <button>兑换</button>
				</li>

				<li class="animated wow fadeInDown" data-wow-delay=".4s">
					<div class="media">
						<div class="date">
							<span class="day">13</span>
							<span class="month">Feb</span>
						</div>
						<a href="#">
							<img src="../assets/img/s1.png" alt=""/>
						</a>
					</div>
						<h1>汽车燃油宝 </h1>
					<span class="money">1000积分</span>
				        <button>兑换</button>
				</li>
          </ul>-->
          <!-- 分页 -->
        </div>
      </section>
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
    </div>
    <div class="right">
      <div class="right-top">
        <div class="users">
          <div class="imgavatar">
          <img :src="user.avatar" class="avatar usermsg" @click="toUserInfo"/>
          </div>
          <div class="details">
            <h4 class="usermsg" @click="toUserInfo">{{user.name}}</h4>
            <h5 style="margin-top:10px;">{{user.email}}</h5>
          </div>
        </div>
        <div class="users2">
          <div class="details2">
            <span class="inf inf2">会员等级:</span>
            <span class="inf">账户积分:<span>{{usersinf.points}}</span></span>
          </div>
        </div>
      </div>
      <div class="shoprule">
        <div class="ruletop">
          <a href="" class="tohover">规则</a>
        </div>
        <div class="rulebox">
          <ul>
            <h4>积分用途：</h4>
            <li>
积分是为了答谢支持本公司的用户而制定的一种奖励方式，您可以用积分在积分兑换区域换到礼品。</li>
          <h4>如何攒积分:</h4>
          <li>1、积分是指成功充值即可累计金额获得的积分。充值1元积1分</li>
          <li>2、充值金额不足1元的零头部分不计入积分</li>
          <li>3、积分累计无时间限制，永不清零</li>
          </ul>
        </div>
      </div>
      <div class="tab">
        <div class="border">
        <div class="tab_top">
          <a class="titletop tohover"
            href="https://press.taobao.com/detail.html?spm=0.7696189.0.0.51e38eeeRSbo7m&postId=8281751"
          >
        <img src="../assets/img/newpic.gif" alt="">
      最新公告</a>
        </div>
        <!-- <div class="tab_bottom"> -->
          <div class="shownotice">
            <ul>
              <li class="li" v-for="(notices,id) in notice" v-bind:key="id">
                <!-- <div v-for="title in id.title" v-bind:key="title"> -->
   <router-link class="tohover" v-bind:to="'/news/newstoshow/'+notices.id" @mouseenter="enter(id)" @mouseleave="leave(id)">
<!--                 <a class="tohover" href="'/news/newstoshow/'+id" @mouseenter="enter(id)" @mouseleave="leave(id)"> -->
<a @mouseenter="enter(id)" @mouseleave="leave(id)">{{id+1}}.{{notices.title}}
                  <span>{{notices.content.substring(0,80)}}...</span></a>
  </router-link>
<!--                 </a> -->
                <!-- </div> -->
              </li>
            </ul>
          </div>
        <!-- </div> -->
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userInfo } from 'os';
export default {
  inject:["reload"],
  name: "shop",
  data() {
    return {
      notice: [],
      shopData: [],
	    showlist: [],
      filterTableData: [],
      usersinf:[],
      //需要给分页组件传的信息	  
      paginations: {
        page_index: 1, //当前位于哪页
        total: 0, //总页数
        page_size: 6, //一页显示条数
        page_sizes: [6, 12], //每页显示条数
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      }
    };
  },
  created() {//在html加载完成之前执行。执行顺序：父组件-子组件
    this.$axios
      .get("api/profile/showNotice")
      .then(res => {
        this.notice = res.data;
      })
      .catch(err => console.log(err));
    this.$axios
      .get("api/profile/showshoplist")
      .then(res => {
        this.shopData = res.data;
        this.filterTableData = res.data;		
        this.setPaginations();
      })
      .catch(err => console.log(err));
      this.$axios.get("api/profile/userinfo/"+this.user.name)
      .then(res=>{
        this.usersinf=res.data;
        //判断会员等级
        if(this.usersinf.historyPoints>0){
          if(this.usersinf.historyPoints>=100000){
          $(".inf2").append("<i style=\"color:rgb(236, 89,62);\"  class=\"iconfont\">&#xe628;&#xe628;&#xe628;&#xe628;&#xe628;</i>");
          return;
        }
        if(this.usersinf.historyPoints>=100000){
          $(".inf2").append("<i style=\"color:rgb(236, 89,62);\"  class=\"iconfont\">&#xe628;&#xe628;&#xe628;&#xe628;</i>");
          return;
        }
        if(this.usersinf.historyPoints>=50000){
          $(".inf2").append("<i style=\"color:rgb(236, 89,62);\"  class=\"iconfont\">&#xe628;&#xe628;&#xe628;</i>");
          return;
        }
        if(this.usersinf.historyPoints>=20000){
          $(".inf2").append("<i style=\"color:rgb(236, 89,62);\"  class=\"iconfont\">&#xe628;&#xe628;</i>");
          return;
        }
        else{
          $(".inf2").append("<i style=\"color:rgb(236, 89,62);\" class=\"iconfont\">&#xe628;</i>");

        }
        }
      }
      )
    // this.$axios.get('api/profile/shopimg/1')
    // .then(res=>{
    // 	// console.log(res.data)
    // 	this.img=res.data;
    // })
  },
  computed: {//计算属性
    user() {
      //console.log(this.$store.getters.user)
      return this.$store.getters.user;
    }
  },
  mounted: function() {//在html加载完成后执行。执行顺序：子组件-父组件
  },
  watch: {//事件监听 

},
  methods: {
    enter(id){
      console.log('111')
      const idd=id+1;
      $(".li:nth-child("+idd+") span").attr('style','display:block')
    },
    leave(id){
      const idd=id+1;
      $(".li:nth-child("+idd+") span").attr('style','display:none')

    },
	  handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.shopData.filter((item, index) => {
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
      this.showlist = this.shopData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
	  //设置分页属性
	  this.paginations.total = this.shopData.length;
      this.paginations.page_size = 6;
    //   this.paginations.total = Math.ceil(
    //     this.shopData.length / this.paginations.page_size
    //   );
      this.paginations.page_index = 1;
      //设置分页数据
      this.showlist=this.shopData.filter((item,index)=>{
      	return index<this.paginations.page_size
      })
    },
    //兑换商品方法
    submitShop(prices,id,picname,goodsname,number){
      if(number<=0){
        this.$message.error("无法兑换 库存不足")
      }
      else{
        this.$confirm('是否确定兑换？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //当前日期
            let timeStamp=new Date();
             let year = new Date(timeStamp).getFullYear();
            let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
            let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
            let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
            let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
            let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
            let nowTime = year + "-" + month + "-" + date +" "+hh+":"+mm+":"+ss ;
            // console.log(nowTime);
            var longtime=(timeStamp.getTime())
            // var longtime = Date.parse(timeStamp);
          this.$axios.post("api/users/exchange",{"username":this.user.name,"points":prices,"id":id,"picname":picname,"goodsname":goodsname,"time":longtime,"number":number})
      .then(res=>{
        if(res.data.affectedRows){
           this.$alert(`兑换码: ${ res.data.randomCode }`, '提示', {
          confirmButtonText: '确定'
        });
        this.reload();
        };
        this.usersinf.points=res.data.newPoints;
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }
      
    },
    //跳转到个人主页
    toUserInfo(){
      this.$router.push('/userInfo');
    }
  }
};
</script>
<style scoped>
/* 引入外部css样式 */
/* @import "../assets/maincss/maincss.css"; */
img.goodspic {
  width: 100%;
  height: 60%;
  /* width: 210px; */
}
.shop {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}
.left {
  /* float: left; */
  /* width: 890px; */
  width: 60%;
  border: 1px solid rgb(223, 29, 29);
  margin-left: 5px;
  min-height: 800px;
  /* height: 800px; */
}
.right {
  display: flex;
  flex-direction: column;
  /* width: 350px; */
  width: 25%;
  margin-left: 8px;
}
.right .right-top {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: flex-end; */
  width: 100%;
  /* background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%); */
  /* border-radius: 30px; */
  /* border-top: 1px solid #ccc; */
  border: 1px solid rgb(238, 236, 236);
}
.right-top .users{
  display: flex;
  /* flex-direction: row; */
}
.users .details{
  display: flex;
  flex-direction:column;
  margin-top: 18px;
  margin-left: 5px;
}
.usermsg:hover{
  cursor: pointer;
}
h4.usermsg:hover{
  color: rgb(231, 86, 86);
}
.right-top .users2{
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-left: 15px;
  /* align-items: center; */
  /* flex-direction: row; */
}
.right-top .users2 .details2 span.inf{
  display: block;
  margin: 10px 5px;
}
.right-top .users2 .details2 span.inf{
  font-size: 15px;
  font-family: mychinesefont;
}
/* .right-top .users2 .details2 span.inf2 i{
  margin-left: 20px;
  color:rgb(236, 89,62);
} */
.right .shoprule{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(224, 114, 102);
  margin-top: 10px;
  /* border-left: none; */
}

.shoprule .ruletop{
  width: 100%;
  line-height: 60px;
  /* background: rgba(184, 29, 24, .9); */
  /* width: 100%;
  line-height: 60px;
  background: rgba(184, 29, 24, .9);*/
  text-align: center;
}

.shoprule .ruletop a{
  color: rgb(206, 6, 6);
  font-size: 19px;
}

/* .shoprule .ruletop a:hover{
  color: rgb(221, 234, 250)
} */

.rulebox{
  padding: 12px 20px;
  padding-bottom: 5px;
  /* border: 2px solid rgb(240, 98, 82); */
  /* border-left: none; */
  border-top: none;


}
.rulebox ul li{
  margin: 10px 8px;
  line-height: 18px;

}

.shownotice{
  margin:0  10px;
}
.shownotice ul li{
  line-height: 20px;
  /* margin-bottom: 10px; */
  }
.shownotice ul li a{
  color: rgb(78, 77, 77);

}
.tab{
  width: 100%;
  height: 100%;
   border: 1px solid rgb(224, 114, 102);
  /* border-left: none; */
  }
.tab .tab_top{
   line-height: 60px;
  /* background: rgba(184, 29, 24, .9); */
  text-align: center;
}
.tab .tab_top img{
  height: 25px;
  vertical-align: -4px;
}
.tab .tab_top a{
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: rgb(206, 6, 6);
  font-size: 19px;
}
/* .tab .tab_top a:hover{
  border-bottom: 2px solid salmon;
  color: rgb(74, 75, 77)
} */
.shownotice ul li{
  margin: 6px 10px;
}

span.money {
  color: brown;
  font-size: 16px;
}
button.shop {
  cursor: pointer;
  height: 30px;
  width: 55px;
  float: right;
  background: rgba(210, 215, 211, 1);
  border-radius: 3px;
  box-shadow: 3px 3px 5px rgba(149, 165, 166, 1);
}
a.titletop {
  color: #fff;
}
.pagination {
  text-align: center;
  margin-top: 30px;
}
.pagination a {
  margin: 10px 10px;
}
.pagination .el-pagination{
	/* float: left; */
	margin-bottom: 30px;
}
button.pagebtn {
  background: rgb(248, 248, 248);
  border: 1px solid #ccc;
  line-height: 32px;
  text-align: center;
  margin-top: 30px;
  border-radius: 8px;
}
button.pagebtn:hover {
  cursor: pointer;
  border: 2px solid brown;
}
input.page {
  text-align: center;
  font-size: 15px;
  width: 50px;
  line-height: 32px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
input.page:hover {
  cursor: pointer;
  border: 1px solid brown;
}
a {
  color: black;
}
a:hover {
  cursor: pointer;
  
}
a span{
  display: none;
  border:1px solid #ccc;
  border-radius: 8px;
  padding: 10px 0;
  color: black;
  text-indent: 2em;
}
.avatar{
  margin:10px;
  width: 70px;
  height: 70px;
  -webkit-border-radius:50%;
  -moz-border-radius:50%;
  -o-border-radius:50%;
  border-radius:50%;
}
.avatar:hover {
  box-shadow: 3px 3px 3px rgb(136, 135, 135)
}
h1{
  height: 55px;
  width: 230px;
}
.option{
  display: flex;
  justify-content: space-between;
}
.option span{
  height: 30px;
  line-height: 30px;
}
.option button{
  background:#fff;
  border: 1px solid rgb(62, 111, 201);
  border-radius: 6px;
  width:70px;
  height:30px;
  font-size:14px;
  color: rgb(98, 111, 134);
}
.option button:hover{
  color: rgb(190, 56, 46);
  border: 1px solid rgb(190, 56, 46);

}
ul li{
  font-size: 15px;
}
</style>