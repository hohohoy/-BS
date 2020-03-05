<template>
    <div class="showinfo">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span='8'>
                <div class="user">
                    <img :src="user.avatar" class="avatar" alt="">
                </div>
            </el-col>
            <el-col :span='16'>
                <div class="userinfo">
                    <div class="user-item">
                        <i class="fa fa-user"></i>
                        <span>用户：{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="fa fa-cog"></i>
                        <span><router-link to="/showInfo/updatePWD">修改密码</router-link></span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:"showinfo",
    components:{
        
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    }
}
</script>

<style scoped>
.showinfo{
  width: 100%;
  height: 550px;
  box-sizing: border-box;
  /* padding: 16px; */
}
 .row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 36%;
}
.user img {
  width: 100px;
  border-radius: 50%;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 21px;
  color: #333;
}
div span{
    margin-left:30px 
}
a{
    color: black;
}
a:hover{
    color: rgb(122, 120, 120);
}
</style>


