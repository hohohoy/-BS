<template>
    <div class="userlist">
        <header style="margin-top:10px">
            <p style="text-align:left;"><span style="border-bottom:3px solid blue">用户列表</span></p>
        </header>
        <div class="searchbox">
            <el-input style="width:190px;margin-right:9px;" placeholder="请输入要搜索的用户名" v-model="search" clearable> </el-input>
        </div>
        <section>
            <div class="usergroup" >
                <!-- <happy-scroll color="rgba(0,0,0,0.5)" size="5"> -->
                <el-collapse v-model="activeNames">
                    <div id="listbox" style="height:420px;">
                <el-scrollbar style="height:100%;">
                    <el-collapse-item style="font-size:19px;" class="infgroup" v-for="(item,id) in filterList" :key="id" :title="item.username" :name="item.id">
                        <div><label class="item_title">邮箱</label><input type="text" :value="item.email"></div>
                        <div><label class="item_title">性别</label><input type="text" :value="item.sex"></div>
                        <div><label class="item_title">生日</label><input type="text" :value="item.birthday"></div>
                        <div><label class="item_title">电话</label><input type="text" :value="item.phone"></div>
                        <div><label class="item_title">简介</label><input type="text" :value="item.detail"></div>
                        <div><label class="item_title">积分</label><label class="inf">{{item.points}}</label></div>
                        <div><label class="item_title">历史积分</label><label class="inf">{{item.historyPoints}}</label></div>
                        <div><label class="item_title">卡号</label><label class="inf">{{item.cardid}}</label></div>
                        <el-button class="btngroup">修改</el-button>
                        <el-button class="btngroup" @click="resetPWD(item.username)">重置密码</el-button>
                    </el-collapse-item>
                    </el-scrollbar>
                    </div>
                    </el-collapse>
                <!-- </happy-scroll> -->
            </div>
        </section>
    </div>
</template>
<script>
export default {
    inject:["reload"],
    name:'userlist',
    data(){
        return{
            search:'',
            activeNames: [''],
            usersList:[] 
        }
    },
    created(){
        this.$axios.get('/api/admin/getuserlist')
        .then((res)=>{
            this.usersList=res.data;
            console.log(this.usersList)
        })
        // this.$axios.get('/api/admin/getuserDetail')
        // .then((res)=>{
        //     cons.log(res.data);
        // })
    },
    computed:{
        filterList(){
            return this.usersList.filter((item)=>{
                return item.username.match(this.search)
            })
        }
    },
    methods:{
        resetPWD(username){
            this.$confirm('此操作将重置该用户的密码, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'}
          ).then(()=>{
              this.$axios.post('/api/admin/resetUserpwd',{username:username})
            .then((res)=>{
                if(res.status==200){
                    this.$notify({
                        title: '提示',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>密码修改成功,重置密码是 <i style="color:red;">123456</i> <br/>请及时修改!</strong>'
                    });
                this.reload()
                }else{
                    this.$message.error('删除失败，请稍后再试');
                }
            })
          })
            
        }
    }
}
</script>
<style lang="less" scoped>
    .userlist{
        width: 100%;
        height: 100%;
        min-width: 500px;
        display:flex;
        flex-direction: column;
        align-content: center;
        margin-left: 10px;
        // justify-content: center;
        header{
            width: 90%;
            p{
                font-size: 20px;
                font-family: stfont;
                text-align: center;
            }
        }
        .searchbox{
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
        }
        section{
            .usergroup{
                // width: 300px;
                // height: 500px;

                .infgroup{
                    font-size: 28px!important;
                    div{
                        height: 35px;
                        font-size: 16px!important;
                        color: #8b8b8b;
                        input{
                            margin-left: 8px;
                            color: black;
                            border:none;
                            border-bottom: 1px solid #dbd9d9;
                            user-select: none; 

                        }
                        label{
                            // margin-bottom: 0;
                            &.item_title{
                                font-weight: normal;
                                color: rgb(100, 100, 100);
                                background: rgb(253, 248, 248);
                                width: 90px;
                                padding: 0 10px;
                                text-align: right;
                            }
                            // color: red;
                        
                            &.inf{
                                color: rgb(170, 20, 20);
                                font-weight: normal!important;
                            }
                    }
                    }
                    .btngroup{
                        margin-top: 10px;
                    }
                }
                .el-scrollbar__wrap.default-scrollbar_wrap {
                    overflow-x: hidden!important;
                    }
            // #listbox{
            //     .el-scrollbar{
            //         .el-scrollbar__wrap {overflow-x: hidden!important;} 
            //     }
            //     // .el-tree{
            //     //     &.el-tree-node{display:inline-block;}
            //     // }
            // }
            }
            
        }
        
    }
</style>