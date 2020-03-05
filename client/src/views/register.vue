<template>
    <div class="register">
        <div class="back"></div>
        <section class="form-container">
            <div class="manage-tip">
                <!-- <span class="title">注册</span> -->
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="registerUser.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <!-- <el-form-item> -->
                        <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    <!-- </el-form-item> -->
                </el-form> 
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:'register',
    components:{},
    data(){
        var validatePass2 = (rule, value, callback) => {
        // if (value === '') {
        //   callback(new Error('请再次输入密码'));
        // } else 
        if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
          registerUser:{
              username:'',
              email:'',
              password:'',
              password2:''
          },
          rules:{
          username: [
            { required:true,message:"用户名不能为空",trigger: 'blur' },
            { min:2,max:20,message:"长度在2-20个字符之间",trigger: 'blur'}
          ],
          email: [
            { required:true,message:"邮箱不能为空",trigger: 'blur' },
            { type:"email",require:true,message:"邮箱格式不正确",trigger: 'blur' }
          ],
          password: [
            { required:true,message:"密码不能为空",trigger: 'blur' },
            { min:6,max:30,message:"长度在6-30之间",trigger:'blur'}
          ],
          password2: [
            { required:true,message:"确认密码不能为空",trigger: 'blur' },
            { min:6,max:30,message:"长度在6-30之间",trigger:'blur'},
            {validator:validatePass2,trigger:'blur'}
          ],
          
      }
      }
  },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.$axios.post("/api/users/register",this.registerUser)
            .then(res=>{
                {
                if(res)
                {
                    this.$message({
                    message:"账号注册成功!!!",
                    type:'success'
                })
                    this.$router.push('/login')
                }else{
                    
                }
        }
            })
            // this.$router.push('/login')
          } 
        });
        }
    }
}
</script>
<style scoped>
.register{
    width: 100%;
    height: 100%;
    /* background: url(../assets/bg.jpg); */
    background: url(../assets/img/mainbg.jpg);
    background-repeat:no-repeat center center; 
    background-size:100% 100%;
    /* opacity: 0.8; */
}
.form-container{
    width: 370px;
    height: 210px;
    position: absolute;
    top:10%;
    left:34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center
}
.register .back{
    width: 100%;
    height: 100%;
    background: rgb(43, 42, 42);
    opacity: 0.4;
}
.form-container .manage-tip .title{
    font-weight: bold;
    font-size: 26px;
    color: #fff;
    text-align: center;
}
.title{
    margin-bottom: 50px

}
.registerForm{
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 9px;
    box-shadow: 0px 5px 10px #cccc;
    /* opacity: 0.9; */
}
.submit_btn{
    width: 80%;
    margin-top: 10px;
    margin-left: 25px;
}
.el-form-item{
    margin-left: 0;
}
.el-form-item__content{
    text-align: center;
    margin: 0 auto
}
</style>

