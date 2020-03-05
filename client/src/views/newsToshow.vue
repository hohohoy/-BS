<template>
    <div class="newstoshow">
        <el-page-header @back="goBack" content="">
        </el-page-header>
        <div class="box">
            <h1>{{news.title}}</h1>
            <h3 style="margin:15px 0;">作者:{{news.author}}</h3>
            <h4 style="margin:10px 0;">发布时间:{{news.time | filterTime}}</h4>
        <article style="text-indent:2em" class="content" v-html="transBr(news.content)"></article>
        <!-- <h4 style="margin:80px 0;text-align:right" >管理员:{{news.manager}}</h4> -->
    </div>
        </div>
    
</template>
<script>
import {getTime} from '../assets/js/common'
export default {
    name:"newstoshow",
    data(){
        return{
            id:this.$route.params.id,
            news:[]
        }
    },
    filters:{
        filterTime:function(value){
            return getTime(value)
        }
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    created(){
// this.$axios.get('/api/visitor/shownews')
// 		.then(res=>{
//             this.news=res.data
//             console.log(this.news)
// 		})
//         .catch(err => console.log(err))
//         }
// }
this.$axios.get("/api/visitor/news/newstoshow/"+this.id)
              //获取后台详情api并加上id
            .then(res => {
                this.news = res.data;
                // this.news.time=this.news.time.slice(0,10)
                // console.log(res.data)
                
            })
            .catch(err => console.log(err))
    },
    methods:{
        transBr(val){
            //<br/>
            val=(val + '').replace(/\n/g,"<br><div style=\"text-indent:1.5em;display:inline-block;opacity:0\">`</div>")
            return  val;
            //<div style=\"text-indent:2em;display:inline-block;\">;</div>
            //(val + '').replace(/\n/g,"<span style=\"text-indent:2em;\"></span><br/>");
        },
        goBack(){
            window.history.go(-1)
        }
    }
}
</script>
<style scoped>
.newstoshow{
    width: 100%;
    min-width: 600px;
    padding: 70px 20px;
}
.newstoshow h1{
    font-weight: 500;
}
article{
    font-size: 18px;
}
.content{
    line-height: 26px;
}
.el-page-header{
    width: 80%;
}
.box{
    margin: 80px 50px;
}
</style>