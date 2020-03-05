<template>
  <div class="userInfo">
    <div class="wrapper">
      <el-form :model="thisUser" :rules="rules" ref="userForm" class="userForm">
        <el-form-item label="用户名">
          <el-input v-model="user.name" placeholder="请输入用户名" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input class="email" v-model="thisUser.newemail" :placeholder="user.email"></el-input>
          <el-button v-show="show" class="emailbtn" @click="getCode">获取验证码</el-button>
          <el-button v-show="!show" class="count" disabled>{{count}}</el-button>
          <el-input class="code" v-model="thisUser.code" placeholder="输入验证码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="thisUser.sex" label="男">男</el-radio>
          <el-radio v-model="thisUser.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="thisUser.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input placeholder="输入电话号码" v-model="thisUser.phone"></el-input>
        </el-form-item>
        <el-form-item label=" 简  介" prop="detail">
          <el-input
            class="input_textarea"
            type="textarea"
            :rows="5"
            placeholder="请输入自我介绍吧~"
            v-model="thisUser.detail"
            maxlength="150"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item class="buttonItem">
          <el-button type="primary" class="submit_btn" @click="alterForm('userForm')">修改信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "user_info",
  data() {
    var validateBirthday = (rule, value, callback) => {
      var nowTime = this.timeNow();
      // console.log(nowTime);
      var birthTime = Date.parse(new Date(value));
      // console.log(birthTime);
      if (birthTime >= nowTime) {
        callback(new Error("输入日期非法！"));
      } else {
        callback();
      }
    };
    return {
      thisUser: {
        sex: "男",
        newemail: "",
        phone: "",
        birthday: "",
        detail: "",
        code: "",
        number: 0
      },
      // thisUser:[],
      show: true,
      count: "",
      timer: null,
      rules: {
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            require: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        birthday: [
          { required: true, message: "出生日期不能为空", trigger: "blur" },
          { validator: validateBirthday, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "格式不正确", trigger: "blur" }
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        phone: [
          {
            validator: (rule, value, callback) => {
              if (/^1[3456789]\d{9}$/.test(value) == false) {
                callback(new Error("手机号码格式错误！"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    user() {
      // this.thisUser.newemail=this.$store.getters.user.email;
      return this.$store.getters.user;
    }
  },
  mounted() {
    // this.$set(this.thisUser, 'newemail',this.$store.getters.user.email)
    //  console.log(this.thisUser.newemail);
    // setInterval(()=>{
    //     console.log(this.user)
    //     // this.thisUser.newEmail = this.$store.getters.user.email;;
    // },1000)
  },
  created() {
    //  this.$set(this.thisUser, 'newemail',this.$store.getters.user.email)
    //  console.log(this.thisUser.newemail)
    this.$axios
      .get("api/users/showusers_detail/" + this.user.name)
      .then(res => {
        this.thisUser = res.data;
        this.$set(this.thisUser, "newemail", this.$store.getters.user.email);

        // console.log(this.thisUser);
      });
  },
  methods: {
    getCode() {
      const datetime = new Date().getTime();
      this.$axios
        .post("api/users/changeEmail", {
          username: this.user.name,
          email: this.user.email,
          newEmail: this.thisUser.newemail,
          time: datetime
        })
        .then(res => {
          // console.log(res.data);
          if (res.data.status == "ok") {
            const h = this.$createElement;
            this.$message({
              message: h("p", null, [
                h("span", null, "验证码已发送至您的旧邮箱，请注意查收")
              ]),
              type: "success"
            });
            // this.thisUser.number++;
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                  // this.count-=10;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          } else {
            this.$message.error("验证码发送失败,请稍后再试");
          }
        });
    },
    timeNow() {
      //当前日期
      let timeStamp = new Date();
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let nowTime =
        year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
      // console.log(nowTime);
      var longtime = Date.parse(timeStamp);
      //   console.log(longtime);
      return longtime;
    },
    //修改绑定邮箱
    changEmail() {
      // this.$axios.post("api/users/exchange",{"username":this.user.name,"points":prices,"goodsid":goodsid})
    },
    alterForm(formName) {
      this.$refs[formName].validate(res => {
        if (res) {
          //   {"email":this.thisUser.email}
          console.log(this.thisUser.newemail);
          Object.assign(this.thisUser, this.user);
          this.$axios.post("api/users/alterinf", this.thisUser).then(res => {
            if (res.data.status == "ok") {
              this.$message({
                message: "信息修改成功!",
                type: "success"
              });
              this.$router.push("/userInfo");
            } else {
              this.$message.error("服务器繁忙修改失败，请稍后再试");
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}
.userInfo {
  width: 100%;
  border: none;
  margin-top: 80px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  font: 15px "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: rgb(66, 66, 66);
  min-width: 600px;
  /* display: flex;
    justify-content: space-around;
    align-content: center; */
}
.wrapper {
  width: 70%;
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 20px 20px 20px;
  border-radius: 9px;
  box-shadow: 0px 5px 10px #cccc;
  /* justify-content:  */
  margin: 0 auto;
  /* text-align: center; */
}
.userForm {
  width: 70%;
  margin: 3% auto;
}
.form_item {
  display: flex;
  justify-content: center;
  margin-left: 13%;
  width: 100%;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  margin-bottom: 20px;
}
.form_item.emailItem .el-form-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
}
.el-form-item__label {
  width: 60px !important;
}
.el-form-item__content {
  line-height: 40px;
}
.large_item {
  height: 150px;
}
.form_item span.title {
  width: 80px;
}
.el-form-item {
  /* display:inline; */
  line-height: 40px;
  vertical-align: middle;
}
.buttonItem {
  display: flex;
  justify-content: center;
}
.el-input {
  width: 70%;
  /* line-height: 40px; */
}
.el-input.email {
  width: 35%;
  /* display: inline-block; */
}
.el-input.code {
  width: 18%;
}
.input_textarea {
  width: 70%;
}
/* .emailbtn{
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
        border-left: none;

    } */
/*        .text1{
            margin-left: 3px;
        }
        .Content-Main label{
            margin: 0px 0px 5px;
            display: block;
        }
        .fileInput{
            height: 106px;
            border: none;
            font-size: 300px;
            opacity: 0;  
            filter:alpha(opacity=0);
            cursor: pointer;
            position: absolute;
        }
        .Content-Main label>span{
            width: 20%;
            float: left;
            text-align: right;
            padding-right: 10px;
            margin-top: 10px;
            font-weight: bold;
        }
        .Main-sex{
            padding-right: 13px;
            padding-bottom: 13px;
            font-weight: bold;
            line-height: 4px; 
        }
        .Main-sex input[type=radio]{
            margin-top:6px;
        }
        .input[type="text"],.input[type="email"],textarea{
            height: 25px;
            width: 40%;
            line-height: 15px;
            padding: 5px 0px 5px 5px; 
            margin-bottom: 16px;
            margin-right: 6px;
            margin-top: 2px;
            border: none;
            border-radius:2px;
            -webkit-border-radius:2px;
            -moz-border-radius:2px;
            outline: 0 none; 
            background:  rgba(223, 223, 223,0.5);
            color: #525252;
        }
        .Content-Main textarea{
            height: 100px;
            width: 40%;
            padding: 5px 0px 0px 5px;
        }
        .Content-Main .button{
            width: 120px;
            padding: 8px 24px 8px 24px;
            margin-bottom: 8px;
            border: none;
            border-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            font-weight: bold;
            text-shadow: 1px 1px 1px #ccc;
            box-shadow: 1px 1px 1px  #3D3D3D;
            -moz-box-shadow: 1px 1px 1px  #3D3D3D;
            -webkit-box-shadow: 1px 1px 1px  #3D3D3D;
            color: #585858;
            background:  rgba(223, 223, 223,0.5);
        }
        .Content-Main .button:hover{
            color:  #333;
            background-color:  rgb(221, 234, 250) ;
        }*/
/* button{
            height: 40px;
            width: 120px;
            margin: 0 auto;
        }  */
</style>