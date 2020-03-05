<template>
  <div class="addnews">
    <div class="breadcrumb_box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/admin">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/admin/newsmanage">新闻中心</el-breadcrumb-item>
        <el-breadcrumb-item>发布内容</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addnews_container">
      <el-form :rules="rules" ref="form" :model="news" label-width="80px">
        <el-form-item label="标题" prop="name">
          <el-col :span="16">
            <el-input v-model="news.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="分类">
          <el-select style v-model="news.newstype" placeholder="类型">
            <el-option label="公告" value="公告"></el-option>
            <el-option label="最新资讯" value="最新资讯"></el-option>
            <el-option label="重要专题" value="重要专题"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-col :span="16">
            <el-input v-model="news.author"></el-input>
          </el-col>
        </el-form-item>
        <!-- <div v-for="(item,id) in newstype" v-bind:key="id"><span>{{item}}</span></div> -->
        <el-form-item label="内容" prop="content">
          <el-col :span="16">
            <el-input
              class="input_textarea"
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="news.content"
              maxlength="5000"
              show-word-limit
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item style="width:70%;display:flex;justify-content:center">
          <el-button type="primary" @click="submitContent('form')">立即发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "addnews",
  inject: ["reload"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("输入内容不能为空!"));
      } else {
        callback();
      }
    };
    return {
      news: {
        name: "",
        content: "",
        author: "",
        newstype: "最新资讯",
        time: "",
        manager:''
      },
      rules: {
        name: [
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
  created(){
    this.news.manager=this.$store.getters.admin.name;
    console.log(this.news)
  },
  methods: {
    submitContent(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const submitTime = new Date().getTime();
          this.news.time = submitTime;
          this.$axios.post("/api/admin/publishContent", this.news).then(res => {
            if (res.status == 200) {
              const h = this.$createElement;
              this.$notify({
                title: "系统提示",
                message: h("i", { style: "color: teal" }, "新闻发布成功")
              });
              this.reload();
            } else {
              this.$notify.error({
                title: "错误",
                message: "发布失败，请稍后再试"
              });
            }
          });
        } else {
          new Error("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.addnews {
  .breadcrumb_box {
    border-bottom: 1px solid rgb(235, 230, 230);
    width: 100%;
    height: 50px;
    padding: 20px 0px;
  }
  .addnews_container {
    margin-top: 15px;
  }
}
</style>