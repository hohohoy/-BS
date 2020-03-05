<template>
  <div class="shop">
    <div class="shop-top">
      <div>
        <span>
          <i class="el-icon-search" style="margin-right:5px"></i>搜索
        </span>
        <el-input v-model="search" clearable style="width:150px;margin:0 0"></el-input>
      </div>
      <div>
      <el-button style="height:40px;margin:auto 0;" @click="exchange">
        <i class="el-icon-goods" style="margin-right:5px"></i>兑换商品
      </el-button>
      <el-button style="height:40px;margin:auto 0;" @click="addOne">
        <i class="el-icon-circle-plus-outline" style="margin-right:5px"></i>添加商品
      </el-button>
      </div>
    </div>
    <div class="shop-content">
      <section class="shoplist">
        <div class="shoplist-wrapper">
          <div class="item animated fadeInDown" v-for="(goods,id) in filterlist" v-bind:key="id">
            <a href="#">
              <!-- <p>{{goods.goodspic}}</p> -->
              <img class="goodspic" :src="'/static/'+goods.picname" />
            </a>

            <h1>{{goods.name}}</h1>
            <div class="option">
              <span class="money">{{goods.price}}积分</span>
              <button
                class="btn"
                @click="updateOp(goods.price,goods.id,goods.picname,goods.name,goods.goodspic,goods.quantity)"
              >修改</button>
              <button class="btn" @click="deleteOp(goods.id)">下架</button>
            </div>
          </div>
          <!-- 分页 -->
        </div>
      </section>
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
      <!-- <div class="box box2">
        <div class="ball">
          <span style="display:block;height:20px;width:20px;background:red;border-radius:50%"></span>
        </div>
      </div> -->
    </div>
    <div class="pop">
      <div class="pop-content">
        <el-form :model="updateitem" label-width="70px" class="updateform">
          <!-- <img id="show" :src="'/static/'+updateitem.picname" /> -->
          <img id="show" :src="updateitem.picname" />
          <!-- <img id="show" src="../../../static/pic-1571453208278.jpg" alt=""> -->
          <el-form-item label="商品名称" prop="username">
            <el-input v-model="updateitem.name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="password">
            <el-input-number v-model="updateitem.price" :step="100" :min="100" :max="100000"></el-input-number>
            <!-- <el-input type="text" v-model="updateitem.price" placeholder="请输入积分"></!-->
          </el-form-item>
          <el-form-item label="库存" prop="number">
            <el-input-number v-model="updateitem.quantity" :step="10" :min="0" :max="1000000"></el-input-number>
          </el-form-item>
          <el-form-item label="图片">
            <!-- <input type="file" @change="showpic(this)"> -->
            <input type="file" id="file" @change="showpic" />
          </el-form-item>
          <el-button type="primary" class="submit_btn1" @click="sub()">修改</el-button>
        </el-form>
      </div>
    </div>
    <div class="pop-two">
      <div class="pop-two-content">
        <el-form :rules="addrule" ref="addform" :model="newitem" label-width="70px" class="addform">
          <h3>添加商品</h3>
          <div class="imgbox">
            <img id="popshow" :src="newitem.picname" />
          </div>
          <el-form-item label="商品名" prop="name">
            <el-input v-model="newitem.name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="price">
            <el-input-number v-model="newitem.price" :step="100" :min="100" :max="100000"></el-input-number>
            <!-- <el-input type="text" v-model="updateitem.price" placeholder="请输入积分"></!-->
          </el-form-item>
          <el-form-item label="库存" prop="number">
            <el-input-number v-model="newitem.quantity" :step="10" :min="100" :max="1000000"></el-input-number>
          </el-form-item>
          <el-form-item label="图片" prop="pic">
            <!-- <input type="file" @change="showpic(this)"> -->
            <input type="file" id="addfile" @change="popshowpic" />
          </el-form-item>
          <el-button type="primary" class="submit_btn1" @click="add('addform')">添加</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { userInfo } from "os";
export default {
  name: "shop",
  inject:['reload'],
  data() {
    return {
      paths: "../../../static/",
      search: "",
      updateitem: {
        id: "",
        name: "",
        price: "",
        picname: "",
        goodspic: "",
        number: "",
        quantity:""
      },
      newitem: {
        id: "",
        name: "",
        price: "",
        picname: "/static/bg/base_bg1.gif",
        goodspic: "",
        number: "",
        quantity:""
      },
      notice: [],
      shopData: [],
      showlist: [],
      filterTableData: [],
      usersinf: [],
      addrule: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2-30个字符之间", trigger: "blur" }
        ]
        // pic:[
        //   { required:true,message:"图片不能为空",trigger: 'blur' },
        // ]
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, //当前位于哪页
        total: 0, //总页数
        page_size: 6, //一页显示条数
        page_sizes: [6, 12], //每页显示条数
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      }
    };
  },
  created() {
    //在html加载完成之前执行。执行顺序：父组件-子组件
    this.$axios
      .get("/api/profile/showshoplist")
      .then(res => {
        this.shopData = res.data;
        this.filterTableData = res.data;
        this.setPaginations();
      })
      .catch(err => console.log(err));

    // this.$axios.get('api/profile/shopimg/1')
    // .then(res=>{
    // 	// console.log(res.data)
    // 	this.img=res.data;
    // })
  },
  computed: {
    //计算属性
    user() {
      //console.log(this.$store.getters.user)
      return this.$store.getters.user;
    },
    filterlist() {
      return this.showlist.filter(item => {
        return item.name.match(this.search);
      });
    }
  },
  mounted() {
    //在html加载完成后执行。执行顺序：子组件-父组件
    $(function() {
      $(".pop").click(function(event) {
        $(this).css({ display: "none" });
        // }
      });
      $(".updateform").click(function(event) {
        event.stopPropagation();
      });
      $(".pop-two").click(function(event) {
        $(this).css({ display: "none" });
        // }
      });
      $(".addform").click(function(event) {
        event.stopPropagation();
      });
    });
  },
  watch: {
    //事件监听
  },
  methods: {
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.shopData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.showlist = table.filter((item, index) => {
        return index < this.paginations.page_size;
        // console.log(this.showlist)
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.showlist = this.shopData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      //设置分页属性
      this.paginations.total = this.shopData.length;
      this.paginations.page_size = 6;
      //   this.paginations.total = Math.ceil(
      //     this.shopData.length / this.paginations.page_size
      //   );
      this.paginations.page_index = 1;
      //设置分页数据
      this.showlist = this.shopData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    //修改商品信息方法
    sub() {
      this.$axios
        .post("/api/admin/updateshoplist", this.updateitem)
        .then(res => {
          // console.log(res)
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
    },
    //预览图片
    showpic(e) {
      // console.log($('#file')[0].files[0]);
      // console.log(URL.createObjectURL($('#file')[0].files[0]))
      // console.log(e.target.files[0])
      $("#show").attr("src", URL.createObjectURL(e.target.files[0]));
    },
    popshowpic(e) {
      $("#popshow").attr("src", URL.createObjectURL(e.target.files[0]));
    },
    updateOp(price, id, picname, name, goodspic,quantity) {
      this.updateitem.id = id;
      this.updateitem.price = price;
      this.updateitem.name = name;
      this.updateitem.picname = "/static/" + picname;
      // this.updateitem.picname=require('../../../static/'+picname);
      this.updateitem.goodspicname = picname;
      this.updateitem.goodspic = goodspic;
      this.updateitem.quantity=quantity; 
      $(".pop").attr("style", "display:block");
    },
    //下架商品
    deleteOp(id) {
      // this.$axios.post('/api/admin/updateshoplist',this.updateitem)
      this.$axios.post("/api/admin/deleteOne", { id: id }).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "已删除",
            type: "success"
          });
          this.$router.go(0);
        }
      });
    },
    //兑换商品页面
    exchange(){
      console.log(111)
      this.$router.push('/admin/exchangePage')
    },
    //添加商品
    addOne() {
      $(".pop-two").attr("style", "display:block");
    },
    add(addform) {
      this.$refs[addform].validate(valid => {
        if (valid) {
          let file = $("#addfile")[0].files[0];
          let data = new FormData();
          data.append("pic", file, file.name);
          data.append("name", this.newitem.name);
          data.append("price", this.newitem.price);
          data.append("number", this.newitem.number);
          data.append("quantity", this.newitem.quantity);
          this.$axios
            .post("/api/admin/upload", data, {
              headers: { "content-type": "multipart/form-data" }
            })
            .then(res => {
              if (res.status == 200) {
                const h = this.$createElement;
                this.$message({
                  message: h("p", null, [
                    h("span", { style: "font-size: 15px" }, "商品添加成功~")
                  ]),
                  type: "success"
                });
                // this.$router.go(0);
                this.reload();
              } else {
                this.$message.error("添加失败，请稍后再试");
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
/* 引入外部css样式 */
/* @import "../assets/maincss/maincss.css"; */
.shop {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.shoplist-wrapper {
  width: 100%;
  margin-left: 8px;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  /* justify-content: flex-start; */
  /* border: 1px solid salmon; */
  /* white-space: nowrap; */
}

.shoplist-wrapper .item {
  /* float: left; */
  width: 240px;
  height: 360px;
  margin: 10px 0px;
  margin-right: 30px;
  border: 1px solid #eee;
  padding: 5px 10px;
}

.shoplist-wrapper .item h1 {
  color: #616161;
  font-family: "raleway-regular";
  font-size: 16px;
  font-weight: normal;
  line-height: 26px;
  margin: 20px 0 0 0;
}
img.goodspic {
  height: 210px;
  width: 220px;
}

.shop .shop-top {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background: #faf5f5;
  width: 78%;
  height: 150px !important;
  margin: 20px 10px;
}
.shop .shop-top div {
  margin: 20px 0;
}
.shop .shop-top span {
  font-size: 15px;
  line-height: 40px;
  margin-right: 13px;
}
.shop .shop-top input {
  font-size: 14px;
}
.shop-content {
  /* float: left; */
  width: 90%;
  /* border: 1px solid rgb(223, 29, 29); */
  margin-left: 5px;
  min-height: 800px;
  /* height: 800px; */
}
span.money {
  color: brown;
  font-size: 16px;
}
button.shop {
  cursor: pointer;
  height: 30px;
  width: 55px;
  float: right;
  background: rgba(210, 215, 211, 1);
  border-radius: 3px;
  box-shadow: 3px 3px 5px rgba(149, 165, 166, 1);
}
a.titletop {
  color: #fff;
}
.pagination {
  text-align: center;
  margin-top: 30px;
}
.pagination a {
  margin: 10px 10px;
}
.pagination .el-pagination {
  margin-bottom: 40px;
}
button.pagebtn {
  background: rgb(248, 248, 248);
  border: 1px solid #ccc;
  line-height: 32px;
  text-align: center;
  margin-top: 30px;
  border-radius: 8px;
}
button.pagebtn:hover {
  cursor: pointer;
  border: 2px solid brown;
}
input.page {
  text-align: center;
  font-size: 15px;
  width: 50px;
  line-height: 32px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
input.page:hover {
  cursor: pointer;
  border: 1px solid brown;
}
a {
  color: black;
}
a:hover {
  cursor: pointer;
}
a span {
  display: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 0;
  color: black;
  text-indent: 2em;
}
.avatar {
  width: 80px;
  height: 80px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
}
.avatar:hover  {
  box-shadow: 3px 3px 3px rgb(136, 135, 135);
}
h1 {
  height: 55px;
  width: 230px;
}
.option {
  display: flex;
  justify-content: space-between;
}
.option span {
  height: 30px;
  line-height: 30px;
}
.option button {
  background: #fff;
  border: 1px solid rgb(62, 111, 201);
  border-radius: 6px;
  width: 70px;
  height: 30px;
  font-size: 14px;
  color: rgb(39, 79, 153);
}
.option button:hover {
  color: rgb(190, 56, 46);
  border: 1px solid rgb(190, 56, 46);
}
ul li {
  font-size: 15px;
}
.pop {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  /* display: flex; */
  margin: auto 0;
}
.pop .pop-content {
  height: 100%;
  margin: auto auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop .updateform {
  padding: 8px 15px;
  width: 480px;
  height: 490px;
  margin: 0px 20px;
  background: #fff;
}
.pop .updateform img {
  width: 160px;
  height: 150px;
  margin-bottom: 8px;
}
.el-input-number {
  margin-left: -200px;
}
button.btn {
  user-select: none !important;
}
button.btn:focus {
  outline: 0;
}
.pop-two {
  display: none;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.pop-two .pop-two-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addform {
  width: 540px;
  height: 520px;
  background: #fff;
  padding: 10px 10px;
}
.addform .imgbox {
  height: 150px;
  width: 150px;
  margin: 0 auto;
  margin-bottom: 10px;
}
.addform .imgbox img {
  height: 100%;
  width: 100%;
}
.pop-two button {
  width: 200px;
}
.pop-two .el-input-number {
  margin-left: -260px;
}
#show {
  border-radius: 50%;
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
.box2 {
  background: #ccc;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  position: relative;
}
.box2 .ball {
  /* background: blue; */
  width: 90px;
  animation: spin 2s infinite linear;
  transform-origin: 50% 50%;
  position: absolute;
  top: 28px;
  left: -8px;
}
</style>