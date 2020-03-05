<template>
    <div class="recharge">
         <div class="menu">
             <ul class="nav nav-pills nav-stacked">
  <li role="presentation" class="ac"><router-link to='/recharge/mainrecharge'>充值中心</router-link></li>
  <li role="presentation"><a href="#">查看充值记录</a></li>
  <li role="presentation"><a href="#">购买充值卡</a></li>
    <li role="presentation"><a href="#">充值卡状态查询</a></li>

</ul>
        <!-- <el-col :span="22">
      <h3>充值中心</h3>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="selectIndex">
      <el-menu-item index="1" >
        <i class="el-icon-location"></i>
        <span slot="title" >公司公告</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-home"></i>
        <span slot="title">企业动态</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">最新资讯</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">图片新闻</span>
      </el-menu-item>
    </el-menu>
  </el-col> -->
 </div>
        <div class="top">
            <router-view></router-view>
            
        </div>
        <!-- <div class="content">
        </div> -->
    </div>
</template>
<script>
import mycard from './mycard/mycard'
export default {
    name:'recharge',
    components:{
        mycard
    },
    data(){
        result:{

        }
    },
    methods:{
        selectIndex(){

        }
    }
}
</script>
<style scoped>
a{
    color: rgb(75, 74, 74);
}
.recharge{
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
}
.menu{
    width: 300px;
}
.menu ul{
    width: 100%;
    line-height: 35px;
}
.menu ul li{
    /* width: 100%; */
    width: 200px;
    font-size: 15px;

}
.recharge .top{
    width: 100%;
    height: 250px;
    text-align: center;

}
a.aaa{
    width: 800px;
    height: 201px;
    position: absolute;
    display: block;
    border-radius: 5px;
    padding-right: 24px;
    background: #fff 0 0 no-repeat;
    background-size: 108px 201px;
    text-decoration: none;
    box-sizing: border-box;
    top: 30px;
    margin:0 auto;

}
a.aaa:hover {
    top: 26px;
    transition: all .2s linear;
    box-shadow: 0 0 16px #d2d2d2;
}
.ac{
    background: rgb(236, 234, 234)!important;
}
</style>