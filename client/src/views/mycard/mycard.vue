<template>
  <div class="mycard">
    <div class="card_box">
      <!-- <img src="../../assets/img/card.jpg" alt=""> -->
      <img id="barcode" />
    </div>
    <div class="card_option">
      <!-- <div class="arrow-up"></div> -->
      <div class="card_recharge">
        <el-form
          :model="cardmsg"
          :rules="rules"
          ref="rechargeForm"
          label-width="70px"
          class="rechargeForm"
        >
          <el-form-item label="充值卡号" prop="cardid">
            <el-input v-model="cardinfo.cardid"></el-input>
          </el-form-item>
          <el-form-item label="充值金额" prop="money" >
            <el-input v-model.trim="cardmsg.money"></el-input>
          </el-form-item>
          <el-form-item  label="支付密码" prop="money">
            <el-input type="password" show-password v-model.trim="cardmsg.paypwd" placeholder="请输入支付密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="card_btn">
        <!-- <el-button disabled="">我的余额 <span>￥{{this.cardmsg.balance}}</span></el-button> -->
        <el-button type="primary" @click="recharge('rechargeForm')" style="padding:10px 40px;">充值</el-button>
        <!-- <p>{{cardinfo.cardid}}</p> -->
      </div>
    </div>
  </div>
</template>
<script>
import JsBarcode from "jsbarcode";
export default {
  name: "mycard",
  props: ["cardinfo"],
  inject: ['reload'],
  data() {
    var moneyLimit = (rule, value, callback) => {
       value=value.replace(/\s+/g,"");
       this.cardmsg.money=value;
      if (value < 1 || /^[\d][.][\d]+$/.test(value)) {
        callback(new Error("充值金额填写错误！"));
      } else {
        callback();
      }
    };
    return {
      // cardinfo:{
      // },
      cardmsg:{
        cardid: "",
        money: "100",
        isRecharge:false,
        paypwd:'',
        balance:''
      },
      rules: {
        money: [
          { require: true, message: "充值金额不能为空", trigger: "blur" },
          { validator: moneyLimit, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    //   console.log(this)
    // this.money='100';
    this.$axios
      .post("api/users/getcardinfo", {
        username: this.$store.getters.user.name
      })
      .then(res => {
        this.cardid = res.data[0].cardid;
        // this.cardid='11111111';
        this.cardmsg.balance=res.data[0].balance
        $("#barcode").JsBarcode(this.cardid);
      });
  },
  mounted() {
    // console.log(this.cardinfo.cardid)
    JsBarcode("#barcode", {
      format: "CODE128", //选择要使用的条形码类型
      text: "",
      displayValue: true, //是否在条形码下方显示文字
      textPosition: "bottom" //设置文本的垂直位置
    });
    // JsBarcode("#barcode")
    //   　　　　　　.options({font: "OCR-B"})      // 会影响所有条形码
    //  　　　　 　　.EAN13("1234567890128", {fontSize: 18, textMargin: 0})
    //  　　　　 　　.blank(20)        // 在条形码之间创建空间
    //   　　　　　　.EAN5("12345", {height: 85, textPosition: "top", fontSize: 16, marginTop: 15})
    //   　　　　　　.render();
  },
  methods: {
    recharge(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.cardmsg.paypwd!=''){
            let nowTime=new Date().getTime();
            this.$axios.post("/api/users/torecharge",{cardid:this.cardid,username:this.$store.getters.user.name,paypwd:this.cardmsg.paypwd,money:this.cardmsg.money,time:nowTime})
          .then(res=>{
            if(res.status==200){
              this.$message({
                message: '充值成功，积分：'+`${this.cardmsg.money}`+'已到账',
                type: 'success'
              });
              this.reload() ;
            }
          })
          }
          else{
            this.$message.error('支付密码密码不能为空！');
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.arrow-up {
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 7px solid #fff;
  position: absolute;
  left: 154.734px;
  top: 62px;
}
.mycard {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  margin: 0 20px;
  /* justify-content:center; */
}
.card_box {
  /* margin: 0 auto; */
  background: url("../../assets/img/card2.jpg") no-repeat;
  background-size: 100% 100%;
  width: 350px;
  height: 230px;
  border: 1px solid #ccc;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* margin-bottom: 6%; */
  opacity: 0.6;
  /* margin-right: 10%; */
}
.card_box img {
  width: 75%;
  height: 45%;
  opacity: 0.7;
}
.card_option {
  width: 400px;
  height: 240px;
  /* background: rgb(241, 240, 240); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: -18%;
  position: relative;
}
.card_recharge button {
  background: #fff;
  border: 0.5px solid rgb(126, 157, 194);
  border-radius: 6px;
  height: 25px;
  line-height: 25px;
}
.card_recharge button:hover {
  background: rgb(212, 225, 241);
  /* border: none; */
}
</style>