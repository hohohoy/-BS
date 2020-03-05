<template>
    <div class="cardinfo">
        <div class="wrapper">
            <div class="main">
            <div class="box">
                <i class="iconfont iconwode"></i>
                <span>我的</span>
            </div>
            </div>
            <ul class="items" style="display:flex">
                <li class="box box1" >
                    <div class="content">                
                <i class="iconfont iconqiapian"></i>
                <span>我的卡片</span>
                    </div>
                </li>
                <!-- <li class="box">
                    <div class="content">                    
                <i class="iconfont iconbinding"></i>
                <span>绑定卡片</span>
                    </div>
                </li> -->
                <li class="box">
                    <div class="content" style="font-size:18px;color:black;display:flex;flex-dirction:column;align-items:flex-start">                    
                <!-- <i class="iconfont iconchongzhi"></i>
                <span>充值记录</span> -->
                        <div>卡号：{{this.cardinfo.cardid}}</div>
                        <div>余额：￥{{this.cardinfo.balance}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <router-link to="/cardinfo/mycard">123</router-link>-->
        <!-- <router-view @childEven="propvalue"></router-view>  -->
        <mycard :cardinfo="cardinfo"></mycard>
    </div>
</template>
<script>
$(function(){
    // console.log($('.content').text())
})
import mycard from "./mycard/mycard.vue";
export default {
    name:'cardinfo',
    data(){
        return{
            cardinfo:{
                "cardid":''
            },
            test:'1213'
        }
    },
    components:{
       mycard
    },
    created(){
        this.$axios.post("api/users/getcardinfo",{username:this.$store.getters.user.name})
        .then((res)=>{
            console.log(res)
            this.cardinfo=res.data[0];
            this.cardinfo.cardid=res.data[0].cardid;
            console.log(this.cardinfo);
        })
    },
    methods:{
        propvalue(){
            alert(this.cardinfo)
        },
        // tohover(item){
        //     var item2;
        //      if(item=='box1'){
        //          item2='box11'
        //      }
        //      else{
        //          item2='box22'
        //      }
        //     //  alert(item2);
        //     $("."+item).fadeIn(100).css("display","flex").css("flex-direction","column");
        //     $("."+item2).css("display","none");
        //     // $(".box1").css("display","none");
        //     // alert('11');
        // },
        // leave(item){
        //     // alert(item)
        //     var item2;
        //      if(item='box1'){
        //          item2='box11'
        //      }
        //      else{
        //          item2='box22'
        //      }
        //     //  alert(item2);
        //     $("."+item).css("display","none");
        //     $("."+item2).fadeIn(100).css("display","flex").css("flex-direction","column");
        // }
        cli(){
            $(".box1").css("box-shadow","0 0 8px 6px rgb(211, 211, 211)");

        }
    }
}
</script>
<style scoped>
@import '../assets/maincss/maincss.css';
@keyframes mymove
{
	from {border:none;}
	to {border:1px solid #ccc;}
}
.wrapper{
    font-family: mychinesefont;
    /* background: rgb(241, 240, 240); */
    min-width: 600px;
    width: 90%;
    height: 140px;
    display: flex;
    /* border: 1px solid #ccc; */
    margin: 70px 35px;
    margin-bottom: 50px;
    display: flex;
}
.wrapper .main{
    width: 20%;
    height: 100%;
}
.wrapper .main .box{
    /* background: rgb(202, 55, 55); */
    border-radius:30px;
    /* margin: 5% 25%; */
    height: 100%;
    width: 100%;
     /* width: 80%; */
    /*height: 60%; */
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}
.wrapper .main i.iconfont{
    margin: 10%;
    margin-bottom: 3%;
    width: 80%;
    /* height: 80%; */
    font-size: 50px;
    /* text-align: center; */
}
.wrapper .main span{
    font-size: 16px;

}
.wrapper .items {
    /* border-radius: 20px;
    background: rgb(241, 240, 240); */
    width: 76%;
    height: 100%;
     display: flex;
     flex-direction: row;
     justify-content: flex-start;
    /* text-align: center; */
}
.wrapper .items .box{
    /* position: absolute;
    top: 0;
    left: 0; */
    /* margin: 4% 20%; */
    border-radius: 20px;
    margin-right: 45px;
    background: rgb(241, 240, 240);
    margin-left: 0;
    /* border: 1px solid #ccc; */
    border-radius:30px;
    /* margin-right: 2%; */
    /* padding: 5% 10%; */
    height: 100%;
    width: 33%;
    /* height: 60%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.wrapper .items .box:last-child{
    background: rgb(248, 234, 234);
    width: 48%;
    padding-left: 50px;

}
.wrapper .items .box .content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(231, 82, 82);

 }
.wrapper .items .box:hover{
    /* box-shadow: 0 0 8px 6px rgb(211, 211, 211); */
    /* animation:mymove 1s 1;
    animation-fill-mode: forwards; */
}
.items i.iconfont{
    font-size: 36px;
}
.items span{
    margin-top: 5%;
    font-size: 16px;
}
a:visited{
    text-decoration: none;
}
</style>