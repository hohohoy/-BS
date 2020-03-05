<template>
    <div class="updatePWD">
        <div class="box">
        <el-form :model="users" :rules="rules" ref="updateForm">
        <div class="inputbox">
            <el-form-item label="旧密码" prop="oldpwd">
        <el-input class="inputs" placeholder="请输入旧密码" v-model="users.oldpwd" show-password></el-input>
            </el-form-item>
        </div>
        <div class="inputbox"> 
            <el-form-item label="新密码" prop="newpwd">
                <el-input  class="inputs" placeholder="请输入新密码" v-model="users.newpwd" show-password></el-input>
            </el-form-item>
        </div>
        <div class="inputbox">
            <el-form-item label="再次输入" prop="newpwd2">
                <el-input placeholder="请再次输入新密码" v-model="users.newpwd2" show-password>
                </el-input>
            </el-form-item>
        </div>
        </el-form>
        <div class="btnbox">
            <button @click="submitForm('updateForm')">修改</button>
            <button @click="reset">重置</button>
        </div>
       </div>
    </div>
</template>
<script>
export default {
    name:"updatePWD",
    data(){
        var validatePass2 = (rule, value, callback) => {
        // if (value === '') {
        //   callback(new Error('请再次输入密码'));
        // } else 
        if (value !== this.users.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var pwdCheck=(rule,value,callback)=>{
          if(value==this.users.oldpwd){
              callback(new Error('新密码不能与旧密码一致！'));
          }else{
              callback()
          }
      }
        return{
            users:{
                username:this.$store.getters.user.name,
                oldpwd:'',
                newpwd:'',
                newpwd2:'',
            },
            rules:{
          oldpwd: [
            { required:true,message:"旧密码不能为空",trigger: 'blur' },
            // { min:6,max:30,message:"长度在6-30之间",trigger:'blur'}
          ],
          newpwd: [
            { required:true,message:"新密码不能为空",trigger: 'blur' },
            { min:6,max:30,message:"长度在6-30之间",trigger:'blur'},
            {validator:pwdCheck,trigger:'blur'}
          ],
          newpwd2: [
            { required:true,message:"确认密码不能为空",trigger: 'blur' },
            { min:6,max:30,message:"长度在6-30之间",trigger:'blur'},
            {validator:validatePass2,trigger:'blur'}
          ],
          
      }
        }
        
    },
    computed:{
    	user() {
        	//console.log(this.$store.getters.user)
      		// this.users.username=this.$store.getters.user.username;
    }},
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/users/updatePWD",this.users)
            .then(res=>{
                this.$message({
                    message:"修改密码成功,请重新登录",
                    type:'success'
                })
            })
            //清除Token
          localStorage.removeItem('eleToken')
          //设置vuex store
          this.$store.dispatch('clearCurrentState')
          this.$router.push('/login/logins')
          } 
        });
        },
        reset(){
            this.oldpwd='',
            this.newpwd='',
            this.newpwd2=''
        }
    }
}
</script>
<style scoped>
.updatePWD{
    width: 1250px
}
.box{
    height: 330px;
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 8px;
    box-shadow: 10px 10px 10px rgb(155, 155, 155);
}
.el-form{
    padding: 5px 40px 5px 20px;
    margin-top:40px; 
}
.el-form-item{
    padding-left: 100px;
    text-align: center;
}
.el-input{ 
    width: 160px;
    margin-right:60px 
}

.inputs{
    padding-left:15px;
}
.btnbox{
    margin-top:20px 
}
button{
    font-size: 15px;
    width: 80px;
    height: 40px;
    background: rgb(250, 249, 249);
    border-radius: 8px;
}
button:nth-child(1){
    margin-right:10px;
}
button:nth-child(2){
    margin-left:10px;
}
button:hover{
    color: brown;
    cursor: pointer;
    border: 2px solid brown;
}
</style>