<template>
    <div class="adminmenu">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 0px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-1" class="el-menu-vertical-demo" @select="selectIndex" :collapse="isCollapse">
          <el-menu-item index="1">
              <i class="el-icon-s-custom"></i>
              <span slot="title">我的</span>
          </el-menu-item>
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">我的</span>
            </template>
              <el-menu-item index="1-1">主页</el-menu-item>
              <el-menu-item index="1-2">账号信息</el-menu-item>
          </el-submenu> -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">更多操作</span>
            </template>
              <el-menu-item index="2-1">兑换商城</el-menu-item>
              <el-menu-item index="2-2">新闻中心</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-operation"></i>
            <span slot="title">管理员列表</span>
          </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'adminmenu',
    data(){
        return{
            isCollapse: true
        }
    },
    methods:{
      selectIndex(item){
          switch (item) {
        case "1":
          this.$router.push({ path:'/admin/mainpage'});
          break;
          case "2-1":
          this.$router.push({ path:'/admin/adminshoplist'});
          break;
          case "2-2":
          this.$router.push({ path:'/admin/newsmanage'});
          break;
        case "3":
          this.$router.push({ path:'/admin/userlist'});
          break;
        case "4":
          if(jwt_decode(localStorage.eleToken2).identity=='超级管理员'){
            this.$router.push({ path:'/admin/superadmin'});
          }else{
            this.$router.push({ path:'/404'});
          }
          break;
      }
      }
    }
}
</script>
<style scoped>
/* @import '../assets/maincss/maincss.css'; */
.adminmenu{
    width: 200px!important;
}
/* .el-menu-vertical-demo:not(.el-menu--collapse) { */
    /* width: 200px; */
    /* min-height: 600px; */
  /* } */
</style>