<template>
  <div class="admin">
    <adminheadNav></adminheadNav>
    <div class="adminbox">
      <adminMenu></adminMenu>
      <div class="admin-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <!-- <span>{{admins.name}}</span> -->
    <!-- <span>{{user.name}}</span> -->

    <div class="loginform">
      <section class="form-container">
        <!-- <div class="content">
                <ul class="nav nav-tabs">
                    <li role="presentation" class="active" style="width:90px;font-size:16px"><router-link  to='/login/logins' >登录</router-link></li>
                    <li role="presentation" class="aa" style="width:90px;font-size:16px"><router-link to='/login/register' >注册</router-link></li>
        </ul>-->
        <!-- <router-link class="content" to='' >登录</router-link> -->
        <!-- <li role="presentation"><a href="#">Messages</a></li> -->
        
        <el-form :model="admin" :rules="rules" ref="loginForm" label-width="70px" class="login">
          <!-- <router-view></router-view>  -->
          <!-- <div style="display:flex;justify-content:space-around;height:25px">
                        <div><router-link to='' >登录</router-link></div>
                        |
                        <div>注册</div>
          </div>-->
          <div class="imgbox" style="display；flex;flex-direction:column;">
            <!-- <img src="../assets/img/111bg.svg" width="100%" alt=""> -->
            <img src="../assets/img/111bg.svg" width="100%" alt="">
          </div>
          <div class="contentBox">
          <h2 style="margin-bottom:25px;">LOGIN</h2>
          <el-form-item label="用户名" prop="adminname" >
            <el-input clearable class="inputitem" v-model.trim="admin.adminname" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" >
            <el-input class="inputitem" show-password type="password" v-model.trim="admin.pwd" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- <span class="find">
                    <a href="/retrievePWD">找回密码？</a>
                 </span>
                    <div class="btn">
                         <el-form-item>
                        <el-button type="primary" class="submit_btn2" @click="reset">重置</el-button>
                    </el-form-item>
          -->
          <el-button type="primary" class="submit_btn1" @click="loginForm('loginForm')">登录</el-button>
          </div>
        </el-form>
        <!-- </div>-->
      </section>
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
$(function() {
  // $('.loginform').click(function(event){
  //     $(this).css({"display":"none"})
  // })
  // $('.login').click(function(event){
  //     // return false;
  //     event.stopPropagation();
  // })
});
import adminheadNav from "../components/adminheadNav";
import adminMenu from "../components/adminMenu";
export default {
  name: "admin",
  components: {
    adminheadNav,
    adminMenu
  },
  inject: ["reload"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("输入内容不能为空!"));
      } else {
        callback();
      }
    };
    return {
      admin: {
        adminname: "",
        pwd: ""
      },
      test: "",
      rules:{
          adminname: [
            { required:true,message:"用户名不能为空",trigger: 'blur' },
            { validator: validatePass, trigger: "blur" }

          ],
          pwd: [
            { required:true,message:"密码不能为空",trigger: 'blur' },
            { validator: validatePass, trigger: "blur" }

           // { min:6,max:30,message:"长度在6-30之间",trigger:'blur'}
          ]
          
      }
    };
  },
  created() {
    // const token=localStorage.eleToken2;
    //     const decoded=jwt_decode(token)
    // this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
    // this.$store.dispatch("setAdmin",decoded)
    // console.log(this.$store.getters.admin)
  },
  mounted() {
    if (this.$store.getters.admin.name != undefined) {
      $(".loginform").css({ display: "none" });
    }
  },
  computed: {
    admins() {
      return this.$store.getters.admin;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    loginForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
      this.$axios.post("/api/admin/adminlogin", this.admin).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "登录成功!!!",
            type: "success"
          });
          // this.$router.push('/login/logins')
          $(".loginform").css({ display: "none" });
          // console.log(res.data);
          const { token, identity } = res.data;
          localStorage.setItem("eleToken2", token);
          localStorage.removeItem("eleToken");
          const decoded = jwt_decode(token);
          this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
          this.$store.dispatch("setAdmin", decoded);
          if (identity == "超级管理员") {
            // sessionStorage.setItem("identity", identity);
            location.replace("/admin")
          }
          // this.$router.push('/')
        }
      });
          }
      })
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
.admin {
  width: 100%;
  height: 100%;
  min-width: 600px;
}
.adminbox {
  display: flex;
  justify-content: center;
}
.admin-wrapper {
  /* background: pink; */
  width: 1000px;
  height: 80vh;
}
.admin .loginform {
  /* display: none; */
  /* display: block; */
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.479);
  width: 100%;
  height: 100%;
  /* z-index: 999; */
}
.admin .loginform .login {
  width: 490px;
  height: 350px;
  background: #fff;
  /* background: url('../assets/img/222.png'); */
  /* background-size: 100%; */
  display: flex;
  align-items: center;
  /* padding-top: 40px; */
}
.login .imgbox{
  width: 35%;
}
.login .contentBox{
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 30px;
}
.form-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-container .inputitem {
  width: 180px;
}
.submit_btn1 {
  width: 100px;
  margin-top: 5px;
}
</style>