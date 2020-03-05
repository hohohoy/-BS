<template>
    <div class="login">
        <header>
                <div><img src="../assets/smile.png" class="logo" alt=""></div>
                <span class="title">智慧加油吧</span>
                <span class="smalltitle">请登录</span>
        </header>
        <section class="form-container">
            <div class="content">
                <ul class="nav nav-tabs">
                    <li role="presentation" class="active" style="width:90px;font-size:16px"><router-link class="optionItem op-login"  to='/login/logins' >登录</router-link></li>
                    <li role="presentation" id="register" class="aa" style="width:90px;font-size:16px"><router-link class="optionItem op-rgt" to='/login/register' >注册</router-link></li>
                </ul>
                        <!-- <router-link class="content" to='' >登录</router-link> -->
                    <!-- <li role="presentation"><a href="#">Messages</a></li> -->
                <el-form class="loginForm">
                    <router-view @getMessage="showMsg"></router-view> 
                    <!-- <div style="display:flex;justify-content:space-around;height:25px">
                        <div><router-link to='' >登录</router-link></div>
                        |
                        <div>注册</div>
                    </div> -->
                    <!-- <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginUser.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                 <span class="find">
                    <a href="/retrievePWD">找回密码？</a>
                 </span>
                    <div class="btn">
                         <el-form-item>
                        <el-button type="primary" class="submit_btn2" @click="reset">重置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn1" @click="loginForm('loginForm')">登录</el-button>
                    </el-form-item>
                   
                    </div>
                    <span class="tologin">
                    <a href="/register" class="op">注册</a>
                    <a href="/home" class="op">游客登录</a>
                 </span> -->
                </el-form> 
            </div>
        </section>

        <div class="links">
            <a rel="nofollow" target="_blank" href="/home">
                关于我们
            </a>
            |
            <a rel="nofollow" target="_blank" href="/news">
                最新热点
            </a>
            |
            <a target="_blank" href="/home">
                友情链接
            </a>
        </div>
                    
    </div>
</template>

<script>
import register from './loginRegister/register'
// $(function(){
    // $('ul>li:first-child').click().trigger('click').toggleClass('active');
    // $('ul>li').click(function(){
    //     $(this).toggleClass('active').siblings().removeClass('active');
    // });
    // $('.aa').click().toggleClass('active');
// })
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import jwt_decode from 'jwt-decode'
export default {
    name:'login',
    components:{
        register
    },
    data(){
      return{
          loginUser:{
              username:'',
              email:'',
              password:''
          },
          rules:{
          username: [
            { required:true,message:"用户名不能为空",trigger: 'blur' },
            { min:2,max:20,message:"长度在2-20个字符之间",trigger: 'blur'}
          ],
          password: [
            { required:true,message:"密码不能为空",trigger: 'blur' },
           // { min:6,max:30,message:"长度在6-30之间",trigger:'blur'}
          ]
          
      }
      }
  },
  mounted(){
       $(function(){
    //        $('ul>li:first-child').click().trigger('click').toggleClass('active');
    $('ul>li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
      })
  },
  created(){
      
  },
    methods:{
        showMsg(val){
            if(val=='register'){
                $('ul>li:last-child').addClass('active').siblings().removeClass('active');
            }else{
                $('ul>li:first-child').addClass('active').siblings().removeClass('active');
            }
        },
        loginForm(formName){
            this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.$axios.post("/api/users/login",this.loginUser)
            .then(res=>{
                this.$message({
                    message:"账号登录成功!!!",
                    type:'success'
                })
                if(res.data){
                const { token }=res.data;
                localStorage.setItem("eleToken",token)
                localStorage.removeItem("eleToken2",token)
                //解析token
                const decoded=jwt_decode(token)

                //token存储到vuex
                this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
                this.$store.dispatch("setUser",decoded)
                this.$router.push('/')
                }
                else{
                    this.$message.error('登陆失败，账号或密码错误！');
                }
            })
          } 
          else{
          console.log("error submit!!");
          return false;
          }
        })
        },
        isEmpty(value){
            return(
                value===undefined||value===null||
                (value==="object"&&Object.keys(value).length===0)||
                (typeof value==="string"&&value.trim().length===0)
            )
        },
        reset(){
            this.loginUser.username='';
            this.loginUser.password=''
        }

    }
}
</script>
<style scoped>
@import '../assets/maincss/maincss.css';
.login{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    
}
header{
    display: flex;
    height: 80px;
    width: 100%;
    font-family: mychinesefont;
    background: #fff;
}
header span.title{
    line-height: 80px;
    height: 80px;
    font-size: 29px;
    color: rgb(44, 44, 44);

}
header span.smalltitle{
    margin-top: 20px;
    margin-left: 12px;
    line-height: 40px;
    height: 40px;
    font-size: 20px;
    /* vertical-align: 50px; */

}
header img.logo{
    margin-left: 10px;
    width: 70px;
    height: 70px;

}
.form-container{
    width: 100%;
    height:100%;
    background: url(../assets/img/mainbg.jpg);
    /* background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%); */
    background-repeat:no-repeat center center; 
    background-size:100% 100%;
    opacity: 0.8;
}
.content{
    width: 370px;
    height: 210px;
    position: absolute;
    right: 5%;
    top: 20%;
    /* top:10%;
    left:34%;
    padding: 25px; */
    border-radius: 5px;
    text-align: center
}

.content .content-title{
    background: #fff;
    /* border: 1px solid rgb(131, 131, 131); */
    width: 49%;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    font-size: 23px;
    color: rgb(87, 86, 86);
    text-align: center;
    
}
.title{
    margin-bottom: 50px

}
.loginForm{
    height: 370px;
    position: relative;
    /* margin-top: 20px; */
    background: rgb(255, 255, 255);
    padding: 10px 40px 20px 20px;
    margin-top: 0;
    /* border-radius: 6px; */
}
.el-form-item{
    margin: 20px 0;
}
 .btn{
     margin-top: 30px;
    display: flex;
    flex-direction:row
} 
/* .submit_btn1{
    float: left;
    width: 50%
}
.submit_btn2{
    float: right;
    width: 50%

} */
span.tologin{
    position: absolute;
    right: 30px;
    font-size: 13px
}
span.find{
    font-size: 13px;
    float: right;
}
a{
    text-decoration: none;
    color: blue;
}
.links{
    text-align: center;
    font-family:'Times New Roman', Times, serif;
    margin: 20px 0;
    font-size: 14px;
}
a{
    color: black;
}
a.op{
    color: rgb(29, 31, 141);
}
a.op:nth-child(1){
    margin-right: 15px
}
.optionItem{
    display: block;
     background:rgba(255, 255, 255,.7);
     padding:8px 10px;
     
}
.op-login{
     /* border-top-left-radius: 15px; */
     /* border-right: .5px solid #ccc; */

}
</style>

