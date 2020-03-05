<template>
    <div class="mainpage">
        <div class="wrapper">
            <h2>账号信息</h2>
            <el-divider></el-divider>
            <div class="wrapper-top">
                <div class="item"><label>管理员ID:</label><span>{{admin.id}}</span></div>
                <div class="item"><label>管理员姓名:</label><span>{{admin.name}}</span></div>
                <div class="item"><label>管理员身份:</label><span>{{admin.identity}}</span></div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'mainpage',
    data(){
        return{

        }
    },
    computed:{
        admin(){
            return this.$store.getters.admin;
        }
    }
}
</script>
<style scoped>
    .mainpage{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .mainpage .wrapper{
        background: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px;
    }
    .wrapper-top{
        display: flex;
        flex-direction: column;
    }
    .item{
        height: 40px;
        border: none;
    }
    label{
        color: #969494;
        font-size: 16px;
        font-weight: normal;
        width: 100px;
        /* font-family: mychinesefont; */
    }
    span{
        font-size: 16px;
        font-family: mychinesefont;
    }
</style>