<template>
  <div class="logins">
    <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="70px" class="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="loginUser.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model.trim="loginUser.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <span class="find">
        <a href="/retrievePWD">找回密码？</a>
      </span>
      <div class="btn">
        <el-form-item>
          <el-button type="primary" class="submit_btn2" @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item>
            <el-button id="loginBtn" type="primary" class="submit_btn1" @click="loginForm('loginForm')">登录</el-button>
        </el-form-item>
      </div>
      <span class="tologin">
        <!-- <a href="/register" class="op">注册</a> -->
        <a href="/home" class="op">游客登录</a>
      </span>
    </el-form>
    <div v-if="isShow" class="testBlock" style="display:flex;">
        <slide-verify  @success="onSuccess" :slider-text="text" :imgs="imgs"></slide-verify>
        <div @click="testClose" style="background:#ccc;font-size:12px;border-radius:5px;"><i class="iconfont iconiconclose" title="关闭" style="padding:0 10px;color:red;"></i></div>
        <!-- <input type="button" class="close" value="关闭" > -->
    </div>    
  </div>
</template>

<script>
import img0 from '../../assets/codeimg/img.jpg'
import img1 from '../../assets/codeimg/img1.jpg'
import img2 from '../../assets/codeimg/img2.jpg'
import img3 from '../../assets/codeimg/img3.jpg'
import img4 from '../../assets/codeimg/img4.jpg'
import img5 from '../../assets/codeimg/img5.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import jwt_decode from "jwt-decode";
$(function() {
    $('.logins').on('click','.testBlock',()=>{
        // $(this).css({"display":"none"})
        this.isShow=false;
    })
})
export default {
  name: "logins",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("输入内容不能为空!"));
      } else {
        callback();
      }
    };
    return {
        inject:['reload'],
        isTest:false,
        isShow:false,
        text:'向右移动->',
        imgs:{
            img0,
            img1,
            img2,
            img3,
            img4,
            img5,
        },
      loginUser: {
        username: "",
        email: "",
        password: ""
      },
      captchaOption:{
          product:'bind'
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2-20个字符之间", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }

        ],

        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
          // { min:6,max:30,message:"长度在6-30之间",trigger:'blur'}
        ]
      }
    };
  },
  mounted(){
    this.$emit('getMessage','logins');
  },
  methods: {
    onSuccess(){
        this.isTest=true;
        $('#loginBtn').trigger('click');
    },
    testClose(){
        this.isShow=false;
        
    },
    loginForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.isShow=true;
            if(this.isTest){
                this.$axios.post("/api/users/login", this.loginUser).then(res => {
                  console.log(res.status)
                    if(res.status==200){
                        const { token } = res.data;
                        localStorage.setItem("eleToken", token);
                        //解析token
                        const decoded = jwt_decode(token);
                        //token存储到vuex
                        this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
                        this.$store.dispatch("setUser", decoded);
                        this.$router.push("/");
                    }else{
                      if(res.status==201){
                        this.$message.error('密码错误，请重新输入!')
                      }
                      if(res.status==202){
                        this.$message.error('不存在该用户，请重新输入!')
                      }
                        // this.reload();
                        this.$nextTick(()=>{
                          this.isShow=false;
                          this.isTest=false;
                          this.$refs[formName].resetFields();
                        })
                    }  
            });
            }else{

            }
        //   this.$axios.post("/api/users/login", this.loginUser).then(res => {
        //     const { token } = res.data;
        //     localStorage.setItem("eleToken", token);
        //     //解析token
        //     const decoded = jwt_decode(token);
        //     //token存储到vuex
        //     this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
        //     this.$store.dispatch("setUser", decoded);
        //     this.$router.push("/");
        //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    reset() {
      this.loginUser.username = "";
      this.loginUser.password = "";
    }
  }
};
</script>
<style scoped>
.loginForm {
  margin-top: 65px;
}
.el-form-item {
  margin: 20px 0;
}
.btn {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
}
/* .submit_btn1{
    float: left;
    width: 50%
}
.submit_btn2{
    float: right;
    width: 50%

} */
span.tologin {
  position: absolute;
  right: 30px;
  font-size: 13px;
}
span.find {
  margin-top: 10px;
  font-size: 13px;
  float: right;
}
a {
  text-decoration: none;
  color: blue;
}
.links {
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  margin: 20px 0;
  font-size: 14px;
}
a {
  color: black;
}
a.op {
  color: rgb(29, 31, 141);
}
a.op:nth-child(1) {
  margin-right: 15px;
}
.testBlock{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0,.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

