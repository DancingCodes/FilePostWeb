<template>
  <div class="app">
    <h2>File Host For Node.Js</h2>
    <el-upload class="upload" :action="`${apiUrl}/uploadFile/uploadImage`" drag :show-file-list="false" :on-success="uploadSuccess"
      @mouseenter.native="pasteInput.focus()">
      <el-image class="img" v-if="imageSrc" :src="imageSrc" fit="contain" />
      <el-icon class="uploadIcon" v-else><i-ep-Plus /></el-icon>
      <input type="text" ref="pasteInput" @paste="getPasteValue" class="none">
    </el-upload>
    <el-input v-model="imageSrc" disabled>
      <template #suffix>
        <el-icon class="copyIcon" @click="copyInput"><i-ep-CopyDocument /></el-icon>
      </template>
    </el-input>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { uploadImage } from "@/api/upLoadImage";
import { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus'
const apiUrl = import.meta.env.VITE_APP_API_URL

const imageSrc = ref("")
const uploadSuccess = (res: AxiosResponse<any, any>) => {
  imageSrc.value = res.data.fileUrl
}

const pasteInput = ref()
const getPasteValue = async (file: any) => {
  const formData = new FormData()
  formData.append('file', file.clipboardData.files[0])
  try {
    const res = await uploadImage(formData)
    uploadSuccess(res)
  } catch (error) {
    console.log(error)
  }
}

// 拷贝输入框内容
const copyInput = () => {
  if (!imageSrc.value) {
    return ElMessage("无内容")
  }
  navigator.clipboard.writeText(imageSrc.value);
  ElMessage("复制成功")
}

</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 25%;

  .upload {
    width: 100%;
    height: 30%;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;

    :deep(.el-upload) {
      width: 100%;
      height: 100%;

      .el-upload-dragger {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: unset;
        border: unset;

        .img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .uploadIcon {
          font-size: 30px;
          color: #ccc;
        }
      }
    }


    .none {
      width: 0;
      height: 0;
      padding: 0;
      border: 0;
    }
  }

  .upload:hover {
    border-color: var(--el-color-primary);
  }


  .copyIcon {
    cursor: pointer;
  }
}
</style>