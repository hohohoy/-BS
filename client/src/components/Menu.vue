<template>
<div class="menu">
  <el-col class="menu_page">
    <el-row>
      <el-menu class="el-menu-demo" mode="horizontal" @select="selectIndex">
        <router-link to="/home">
          <el-menu-item index="1" style="padding:0 30px ;">
            <template slot="title">首页</template>
          </el-menu-item>
        </router-link>
        <router-link to="/userInfo">
          <el-menu-item index="2" style="padding:0 25px ;">
            <template slot="title">账号信息</template>
          </el-menu-item>
        </router-link>
        <router-link to="/cardinfo">
          <el-menu-item index="3" style="padding:0 25px ;">
            <template slot="title">余额充值</template>
          </el-menu-item>
        </router-link>
        <!-- <router-link to="/rechargelist">
          <el-menu-item index="4" style="padding:0 25px ;">
            <template slot="title">充值记录</template>
          </el-menu-item>
        </router-link> -->
        <el-submenu index="4">
          <template slot="title">卡片管理</template>
            <!-- <el-menu-item index="3-1">余额充值</el-menu-item> -->
          <el-menu-item index="4-2">充值记录
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5" style="padding:0 25px ;">
          <template slot="title">积分商城</template>
        <!-- <router-link to="/shop"> -->
          <el-menu-item index="5-1">商城</el-menu-item>
        <!-- </router-link> -->
        <!-- <router-link to=""> -->
          <el-menu-item index="5-2">我的兑换</el-menu-item>
        <!-- </router-link> -->
        </el-submenu>
        <!-- <el-submenu index="4">
          <template slot="title">充值</template>
          <el-menu-item index="4-1">余额充值</el-menu-item>
          <el-menu-item index="4-1">充值记录</el-menu-item>
        </el-submenu> -->
        <router-link to="/news">
          <el-menu-item index="6" style="padding:0 25px ;">新闻中心</el-menu-item>
        </router-link>
        <el-submenu index="7" style="padding:0 25px ;">
          <template slot="title">更多</template>
          <el-menu-item index="7-1">引导与帮助</el-menu-item>
          <!-- <el-menu-item index="6-2">卡片挂失</el-menu-item> -->
        </el-submenu>
      </el-menu>
    </el-row>
  </el-col>
  </div>
</template>
<script>
export default {
  name: "leftMenu",
  methods: {
    selectIndex(selectItem) {
      switch (selectItem) {
        case "3-1":
          this.$router.push({ path:'/cardinfo'});
          break;
          case "4-2":
          this.$router.push({ path:'/rechargelist'});
          break;
        case "5-1":
          this.$router.push({ path:'/shop'});
          break;
        case "5-2":
          this.$router.push({ path:'/myshop'});
          break;
        case "6-1":
          this.$router.push({ path:'/recharge'});
          break;
        case "7-1":
        this.$router.push({ path:'/about'});
        break;
      }
    }
  }
};
</script>
<style scoped>

a {
  position: relative;
  top: 2px;
  float: left;
  display: block;
  text-decoration: none;
}
a:visited {
  border-bottom: 2px solid #409eff;
  color: #303133;
}
.el-menu {
  width: 100%;
  height: 60px;
}
</style>