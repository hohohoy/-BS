<template>
  <div id="app">
    <router-view v-if="isActive"/>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
import router from './router'
import superadmin from '../src/views/superadmin/superadmin'
export default {
    name:'app',
    components:{},
    data(){
      return{
        isActive:true
      }
    },
    provide(){
        return{
            reload:this.reload
        }
    },
    created(){
      if(localStorage.eleToken){
        // if(localStorage.eleToken===undefined){
        //   localStorage.removeItem('eleToken')
        //   this.$router.push('/login')
        // }else{
      
        const decoded=jwt_decode(localStorage.eleToken)
        //token存储到vuex 
        this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
        this.$store.dispatch("setUser",decoded)
      }
      if(localStorage.eleToken2){
        const decoded=jwt_decode(localStorage.eleToken2)
        //token存储到vuex 
        this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
        this.$store.dispatch("setAdmin",decoded)
        
        // this.$router.options.routes[5].children.push(arr)
      }
     // }
      
    },
    methods:{
        reload(){
          this.isActive=false;
            this.$nextTick(()=>{
                this.isActive=true
            })
        },
        isEmpty(value){
            return(
                value===undefined||value===null||
                (value==="object"&&Object.keys(value).length===0)||
                (typeof value==="string"&&value.trim().length===0)
            )
        }
    }
}
</script>

<style>
html,body,#app{
  width: 100%;
  height: 100%;
}

</style>
