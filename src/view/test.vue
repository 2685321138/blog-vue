<template>
  <el-upload
      action="http://localhost:1212/upload/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      name = "custom-field-name"
      accept = ".jpg,.png"
      :on-success="handleSuccess"
      :data="aaa"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      aaa:{type:1},
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    handleSuccess(res,file,list){
      console.log(res,file,list)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
