<template>
    <div class="test">
        <!-- <form action="/upload-single" method="post" enctype="multipart/form-data"> -->
        <div>商品名称：<input type="text" v-model="pic.name"></div>
        <div>积分：<input type="text" v-model="pic.price"></div>
        <div><input type="file" name="pic" @change="uploadAvatar"></div>
        <input type="submit" value="提交" @click="test">
              
              <!-- <img src="..\..\static\pic-1571402049438.jpg" alt /> -->

              <img src="" alt />

        <!-- <button @click="test">test</button> -->
        <!-- </form> -->
    </div>
</template>
<script>
export default {
    name:'test',
    data(){
        return{
        //    img:require('../../static/pic-1571372032467.jpg'),
        img:'',
            pic:{
                id:'',
                name:'',
                price:'',
                filename:'',
                src:''
            },
        }
    },
    methods:{
        uploadAvatar(avatar) {
        console.log(avatar.target.files[0])
        let file = avatar.target.files[0]
      let data = new FormData();
      data.append("pic", file, file.name);
      data.append('name',this.pic.name)
      data.append('price',this.pic.price)
      this.$axios.post('api/users/upload',data).then(res=>{
        if(res.status==200){
            const h = this.$createElement;
            this.$message({
          message: h('p', null, [
            h('span', null, '商品添加成功~')
          ]),
          type: 'success'
        });
        }
        // console.log(res.data);
        this.pic.filename='../../static/'+res.data.filename;
        this.pic.src=res.data.src;
        console.log(res);
        // console.log(this.pic);

    })
},
        test(){
            let data = new FormData();
            // data.append('hehe', hehe);
            // service.uploadAvatar(e.target.files[0]);
            
        },

    }
}
</script>
