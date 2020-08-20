<template>
  <div class="edited">
    <el-form ref="form" :model="form" label-width="80px" v-loading="loading">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- 富文本编辑器 -->
      <el-form-item label="内容">
        <!-- useCustomImageHandler为true：禁止富文本框自动将图片转成 base64 -->
        <VueEditor v-model="form.content" :useCustomImageHandler="true" @image-added="imgUpload" />
      </el-form-item>
      <!-- 封面图片上传 -->
      <el-form-item label="封面" align="left">
        <!-- 
          action表明封面图片上传的路径
          headers带上token
        -->
        <el-upload
          :limit="3"
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{
              Authorization: 'Bearer ' + token
            }"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="form.cover"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 栏目选择 -->
      <el-form-item label="栏目" align="left">
        <el-checkbox-group v-model="checkList">
          <!-- 多选框组中遍历栏目渲染多选框 -->
          <!-- 传给后台的值使用 label 属性, 显示的内容 直接放在开闭标签之间 -->
          <el-checkbox v-for="item in categoryList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 文章类别选择：视频还是普通文章 -->
      <el-form-item label="类别" align="left">
        <el-radio v-model="form.type" label="1">文章</el-radio>
        <el-radio v-model="form.type" label="2">视频</el-radio>
      </el-form-item>
      <!-- 发布按钮 -->
      <el-form-item align="left">
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      // 选中的栏目列表
      checkList: [],
      // 所有的栏目列表
      categoryList: [],
      form: {
        title: "",
        content: "",
        // 选中的栏目checkList列表改造后的数据
        categories: [],
        cover: [],
        type: "1",
      },
      loading: false,
    };
  },
  watch: {
    // 监听选中的栏目列表变化，改造数据 赋值给categories
    checkList() {
      console.log(this.checkList);
      this.form.categories = this.checkList.map((el) => {
        return {
          id: el,
        };
      });
      // console.log(this.form.categories);
    },
  },
  methods: {
    // 发布方法
    onSubmit() {
      // console.log("发布文章");
      // 如果文章栏目没有选择则return并且提示
      if (this.form.categories.length <= 0 || this.form.title.trim() == "") {
        this.$message({
          message: "栏目和标题不能为空",
          type: "warning",
        });
        return;
      }
      this.loading = true;
      // 判断是否带参数，带了参数就是修改，没带就是发布
      if (this.$route.query.id) {
        console.log("带了参数，修改文章信息");
        this.$axios({
          url: "/post_update/" + this.$route.query.id,
          method: "post",
          data: this.form,
        }).then((res) => {
          console.log(res.data);
          if (res.data.message == "文章编辑成功") {
            this.$message({
              message: "文章编辑成功",
              type: "success",
            });
            this.$router.push("/home/postlist");
          }
          this.loading = false;
        });
      } else {
        // 发送请求
        this.$axios({
          url: "/post",
          method: "post",
          data: this.form,
        }).then((res) => {
          console.log(res);
          if ((res.data.message = "文章发布成功")) {
            this.$message({
              message: "发布成功",
              type: "success",
            });
            this.$router.push("/home/postlist");
          }
          this.loading = false;
        });
      }
    },
    //处理富文本框自定义上传图片逻辑 点击上传后返回4个参数
    // file 选中的图片
    // Editor 是当前编辑器实例对象
    // cursorLocation 当前光标所在位置
    // resetUploader 这是上传完图片用来重新初始化上传功能的函数
    // 富文本框图片上传方法
    imgUpload(file, Editor, cursorLocation, resetUploader) {
      // 1.上传图片
      let formData = new FormData();
      formData.append("file", file);

      this.$axios({
        url: "/upload",
        method: "post",
        data: formData,
      })
        .then((result) => {
          let url = result.data.data.url; // Get url from response
          // 拿到图片地址
          // 要放入富文本框当中
          // Editor.insertEmbed(cursorLocation, "image", url);这是编辑器自带函数, 可以往编辑框内放入内容 三个参数 位置 / 类型 / 内容
          Editor.insertEmbed(
            cursorLocation,
            "image",
            this.$axios.defaults.baseURL + url
          );
          // 将图片插入到富文本框之后还要重置上传功能
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 封面图片移除方法
    handleRemove(flie, fileList) {
      console.log("handleRemove");
      // 将删除后的fileList赋值给cover
      this.form.cover = fileList;
      // console.log(this.form.cover);
    },
    // 上传封面图片成功方法
    handleSuccess(res, file, fileList) {
      // 上传组件成功上传可以接受三个参数
      // res 请求结果
      // file 文件本身
      // fileList 文件列表
      // 1. 需要将 file 文件放入 this.form.cover 数组里面
      // 2. 我们的封面需要 id 这个 id 是从服务器传回来的
      file.id = res.data.id;
      this.form.cover.push(file);
      console.log("上传封面成功");
      console.log(this.form.cover);
    },
    // 加载栏目信息
    loadCategorys() {
      this.$axios({
        url: "/category",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        // 过滤到头条
        this.categoryList = res.data.data.filter((item) => {
          return item.id != 0 && item.id != 999;
        });
      });
    },
    // 编辑页面渲染数据方法
    loadPost() {
      this.$axios({
        url: "/post/" + this.$route.query.id,
        method: "get",
      }).then((res) => {
        console.log(res.data.data);
        this.form = res.data.data;
        // 数据回显还需要改造数据才能正常显示
        this.form.cover.forEach((item) => {
          // 修改基地址 显示图片
          item.url = this.$axios.defaults.baseURL + item.url;
          // 修改它的uid 如果不修改那么他们的uid都是1就会报错
          item.uid = item.id;
        });
        // 将type转为string类型
        this.form.type = this.form.type + "";
        // 修改checkList的数据格式，改为只有id的数组
        this.checkList = this.form.categories.map((item) => {
          return item.id;
        });
          // 兼容旧的测试数据, 由于带有富文本框不支持的 div 标签
        // 所以需要替换成 p
        this.form.content = this.form.content.replace(/div/g, 'p')
      });
    },
  },
  mounted() {
    // 加载所有栏目信息,除了关注栏
    this.loadCategorys();
    // 看看进入页面是否带了参数，如果带了参数就渲染编辑页
    if (this.$route.query.id) {
      // console.log(this.$route.query.id);
      this.loadPost();
    }
  },
};
</script>

<style lang="less" scoped>
</style>