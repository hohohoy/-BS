<template>
    <div class="retrievePWD">
        <section class="form-container">
            <div class="manage-tip">
                <el-form :model="retrievePWDUser" :rules="rules" ref="retrievePWDForm" label-width="80px" class="retrievePWDForm">
                    <div style="text-align:left;">
                        <a href="/login/logins" style="font-size:16px;color:teal;">返回登录</a>
                    </div>
                    <p class="title">找回密码</p>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="retrievePWDUser.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="retrievePWDUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('retrievePWDForm')">找回</el-button>
                         
                </el-form> 
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:'retrievePWD',
    components:{},
    data(){
      return{
          retrievePWDUser:{
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
          ]
          
      }
      }
  },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.$axios.post("/api/users/retrievePWD",this.retrievePWDUser)
            .then(res=>{
                this.$message({
                    message:"重置密码已发送至您的邮箱，请注意查收 ",
                    type:'success'
                })
            })
            this.$router.push('/login/logins')
          } 
        });
        }
    }
}
</script>
<style scoped>
.retrievePWD{
    width: 100%;
    height: 100%;
    background: url(../assets/22.png);
    /* background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%); */
    /* background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%); */
    /* background-image: linear-gradient(to top, #feada6 0%, #f5efef 100%); */
    background-repeat:no-repeat center center; 
    background-size:100% 100%;
}
.form-container{
    width: 390px;
    height: 300px;
    position: absolute;
    top:16%;
    left:34%;
    /* padding: 25px; */
    border-radius: 5px;
    text-align: center;
    opacity: .9;
}
.form-container .manage-tip .title{
    /* font-weight: bold; */
    font-size: 22px;
    /* color: rgb(209, 209, 209); */
    color: rgba(0, 128, 128,.8);
    text-align: center;
    margin-bottom: 20px;
    /* font-family: mychinesefont; */
}
.retrievePWDForm{
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 40px;
    border-radius: 9px;
    box-shadow: 0px 5px 10px #cccc;
}
.submit_btn{
    width: 60%;
    margin: 12px 0;
}
</style>

