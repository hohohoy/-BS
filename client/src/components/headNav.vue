<template>
  <header>
    <el-container>
      <el-header>
        <el-col :span="6" class="logo-container">
          <img src="../assets/smile.png" class="logo" alt />
          <span class="title">智慧加油吧</span>
        </el-col>
        <el-col :span="6" v-if="!show" class="user">
          <a href="/login/register" style="font-size:15px;padding-right:10px;color:#fff;">注册</a>
          <a href="/login/logins" style="font-size:15px;color:#fff;">登录</a>
        </el-col>
        <el-col :span="6" class="user" v-if="show">
          <div class="userinfo">
            <img :src="user.avatar" class="avatar" alt />
            <div class="welcome">
              <!-- <p class="name comename">欢迎</p> -->
              <p class="name avatarname">{{user.name}}</p>
              <span class="username">
                <el-dropdown trigger="hover" @command="setDialogInfo">
                  <span class="el-dropdown-link">
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user-solid" command="inf">个人信息</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" command="exit">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </div>
        </el-col>
      </el-header>
      <!-- <el-container>
    <el-aside width="200px">
         <el-menu >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-house"></i>首页</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-user"></i>信息</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">用户信息</el-menu-item>
          <el-submenu index="2-2">
          <template slot="title">卡信息</template>
          <el-menu-item index="2-2-1">查看余额</el-menu-item>
          <el-menu-item index="2-2-2">查看积分</el-menu-item>
        </el-submenu>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>充值</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">余额充值</el-menu-item>
          <el-menu-item index="3-2">历史记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-more"></i>更多</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">更改绑定号码</el-menu-item>
          <el-menu-item index="3-2">会员卡挂失</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-question"></i>帮助</template>
      </el-submenu>
    </el-menu>
    </el-aside>
      </el-container>-->
    </el-container>
  </header>
</template>
<script>
export default {
  name: "headNav",
  data() {
    return {
      show: true
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    // if(this.$store.getters.user.name){
    //   console.log(111)
    // }
    if (this.$store.getters.user.name) {
      this.show = true;
    } else {
      this.show = false;
    }
  },
  methods: {
    setDialogInfo(cmdItem) {
      switch (cmdItem) {
        case "inf":
          this.showInfoList();
          break;
        case "exit":
          this.exit();
          break;
      }
    },
    showInfoList() {
      this.$router.push("/showInfo");
      // const user=this.$store.getters.user
      // const h = this.$createElement;
      // this.$msgbox({
      // title: '账号信息',
      // message: h('p', null, [
      //   h('p', null, '用户名：'+user.name),
      //   h('p', null, '邮箱：'+user.email)
      // ]),
      // confirmButtonText: '确定',
      // beforeClose: (action, instance, done) => {
      //     if (action === 'confirm') {
      //       done()
      //     }
      // }
      // })
    },
    exit() {
      //清除Token
      localStorage.removeItem("eleToken");
      //设置vuex store
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login/logins");
    }
  }
};
</script>

<style scoped>
@import "../assets/maincss/maincss.css";
html,
body {
  height: 100%;
  margin: 0;
}
.logo-container {
  line-height: 80px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 25px;
  font-family: "mychinesefont";
  letter-spacing: 3px;
}
.user {
  line-height: 80px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  display: inline-block;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #f0f0f0;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: rgb(63, 14, 197);
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-header,
.el-footer {
  /* margin: 0;
    padding: 0; */
  width: 100%;
  background: #b81d18;
  color: #fff;
  height: 80px !important;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 510px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 510px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>