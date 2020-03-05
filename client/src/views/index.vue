<template>
    <div class="index">
        <headNav></headNav>
        <Menu></Menu>
        <router-view></router-view>
    </div>
</template>
<script>
import headNav from '../components/headNav'
import Menu from '../components/Menu'
export default {
    name:"index",
    components:{
        headNav,Menu
    }
}
</script>

<style scoped>

</style>


