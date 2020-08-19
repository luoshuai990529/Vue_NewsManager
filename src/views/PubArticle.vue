<template>
  <div class="edited">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- 富文本编辑器 -->
      <el-form-item label="内容">
        <VueEditor v-model="form.content" :useCustomImageHandler="true" @image-added="imgUpload" />
      </el-form-item>
      <!-- 封面图片上传 -->
      <el-form-item label="封面" align="left">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{
              Authorization: 'Bearer ' + token
            }"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="form.cover"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 栏目选择 -->
      <el-form-item label="栏目" align="left">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        </el-checkbox-group>
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
      form: {
        title: "",
        content: "",
        cover: [],
        type: 1,
      },
    };
  },
  methods: {
    // 发布方法
    onSubmit() {},
    // 处理图片预览方法
    handlePictureCardPreview() {},
    // 图片移除方法
    handleRemove() {},
    // 处理富文本框自定义上传图片逻辑
    imgUpload() {},
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>