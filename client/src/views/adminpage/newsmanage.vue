<template>
  <div class="newsmanage">
    <div class="container">
      <header>
        <div class="header_left">
          <el-input
            style="width:180px;"
            placeholder="请输入搜索内容"
            v-model="search"
            @focus="clearselect"
            clearable
          ></el-input>
          <el-select
            style="width:120px; margin-right:20px;"
            @change="clearinput"
            v-model="newstype"
            placeholder="请选择"
          >
            <el-option label="全部" value></el-option>
            <el-option label="公告" value="公告"></el-option>
            <el-option label="最新资讯" value="最新资讯"></el-option>
            <el-option label="重要专题" value="重要专题"></el-option>
          </el-select>
        </div>
        <div class="addnews_box">
          <router-link to="/admin/addnews">
            <el-button>
              <i class="iconfont iconfabu"></i>
              <span style="margin-left:8px">发布内容</span>
            </el-button>
          </router-link>
        </div>
      </header>
      <div class="newsgroup" v-for="(news,id) in filterList" :key="id">
        <span class="title">{{news.title}}</span>
        <!-- {{news.time.substring(0,10)}} -->
        <span>
          <span class="upbtn" @click="editnews(news.id)">编辑</span>
        </span>
      </div>
    </div>
    <div class="layer">
      <div class="editcontent">
        <!-- :rules="addrule" -->
        <el-form
          :rules="editrules"
          ref="editform"
          :model="originItem"
          label-width="70px"
          class="editform"
        >
          <h3>修改新闻</h3>
          <!-- <span>{{this.newsList[0].title}}</span> -->
          <el-form-item label="标题" prop="title">
            <el-input class="item" v-model="originItem.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="originItem.type" placeholder="请选择分类">
              <el-option label="公告" value="公告"></el-option>
              <el-option label="最新资讯" value="最新资讯"></el-option>
              <el-option label="重要专题" value="重要专题"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input class="item" v-model="originItem.author" placeholder="请输入作者"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input
              style="width:430px;"
              rows="8"
              class="item"
              type="textarea"
              v-model="originItem.content"
            ></el-input>
          </el-form-item>
          <!--  -->
          <el-form-item label="发布人" v-if="isshow">
            <el-input style="width:430px;" class="item" v-model="originItem.manager " disabled></el-input>
          </el-form-item>
          <el-form-item style="display:flex;justify-content:flex-end;">
            <el-button type="primary" class="submit_btn1" @click="editOption('editform')">修改</el-button>
            <el-button type="primary" class="submit_btn1" @click="deleteOption">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  name: "newsmanage",
  data() {
      var validatePass = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("输入内容不能为空!"));
      } else {
        callback();
      }
    };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value.trim() == "") {
    //     callback(new Error("输入内容不能为空!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      search: "",
      newstype: "",
      newsList: [],
      oldValue:[],
      editItem: [
        {
          id: "",
          title: "",
          content: "",
          author: "",
          type: "",
          manager: ""
        }
      ],
      originItem:{
          id: "",
          title: "",
          content: "",
          author: "",
          type: "",
          manager: ""
      },
      isshow: false,
      isEdit:false,
      editrules: {
        title: [
          { required: true, message: "新闻标题不能为空!", trigger: "blur" },
          { min: 2, max: 100, message: "字数在2-100之间", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        author: [
          { required: true, message: "作者不能为空!", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        content: [
          { required: true, message: "新闻内容不能为空!", trigger: "blur" },
          { min: 5, max: 5000, message: "字数在5-5000之间", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  watch:{
          'originItem':{
            handler(newV,oldV){
                this.oldValue=oldV;
                // this.isEdit=!this.isEdit;
                console.log(newV,oldV)
          },
          deep:true,
          immediate: true,
          }
  },
  computed: {
    filterList() {
      if (this.newstype != "") {
        return this.newsList.filter(item => {
          return item.type.match(this.newstype);
        });
      }
      return this.newsList.filter(item => {
        return item.title.match(this.search);
      });
    }
  },
  filters:{
      titlefilter(val){

      }
  },
  created() {
    //查询数据库并显示新闻列表
    if (this.$store.getters.admin.identity == "超级管理员") {
      this.isshow = true;
    }
    this.$axios.get("/api/profile/shownews").then(res => {
      this.newsList = res.data;
    });
  },
  mounted() {
    $(".layer").click(function() {
      $(this).css({ display: "none" });
    });
    $(".editform").click(function(event) {
      event.stopPropagation();
    });
  },
  methods: {
    editnews(idd) {
      $(".layer").css({ display: "block" });
      this.editItem = this.newsList.filter(item => {
        return item.id == idd;
        // return item.name.match(this.search)
      });
      this.originItem=this.editItem[0]
      console.log(this.originItem)
    },
    //修改新闻操作
    editOption(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.$confirm('此操作将修改该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        this.editItem[0].manager = this.$store.getters.admin.name;
          this.$axios
            .post("/api/profile/editNews", this.editItem[0])
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.reload();
              } else {
                this.$message.error("修改失败，请稍后再试");
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
        } else {
          new Error("error submit!!");
          return false;
        }
      });
    },
    deleteOption() {
      this.$confirm("此操作将永久删除该条新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .post("/api/profile/deleteNews", { id: this.editItem[0].id })
          .then(res => {
            if (res.status == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.reload();
            } else {
              this.$message.error("删除失败，请稍后再试");
            }
            console.log(res);
          });
      });
    },
    clearselect() {
      this.newstype = "";
    },
    clearinput() {
      this.search = "";
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  padding-top: 15px;
  width: 100%;
  height: 500px;
  box-shadow: 3px 3px 6px 2px #ccc;
  overflow: auto;
  header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
  .newsgroup {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 5px;
    color: #757474;
    .title {
      &:hover {
        color: #333333;
      }
    }
    span {
      line-height: 28px;
      span {
        margin-left: 10px;
        padding: 3px 15px;
        border: 1px solid rgb(248, 122, 118);
        border-radius: 6px;
        background: #fff;
        color: #747373;
        font-size: 13px;
        &.upbtn:hover {
          background: rgb(248, 122, 118);
          color: #fff;
          border: 1px solid #fff;
        }
      }
    }
  }
}
.layer {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  .editcontent {
    // width: 550px;
    // height: 340px;
    width: 100%;
    height: 100%;
    // margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .editform {
      // width: 380px;
      // height: 260px;
      background: #fff;
      padding: 20px 60px;
      border-radius: 10px;
      box-shadow: 2px 2px 8px 2px #918f8f;
      .item {
        color: red !important;
      }
    }
  }
}
</style>