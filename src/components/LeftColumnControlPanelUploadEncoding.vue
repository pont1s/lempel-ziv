<script lang="ts" setup>
import { ref } from 'vue';
import {
  NUpload, NUploadDragger, UploadCustomRequestOptions, UploadFileInfo,
} from 'naive-ui';

import { useTextStore } from '@/stores/textFileStore';

const textStore = useTextStore();

const fileListEncodedText = ref<Array<UploadFileInfo>>([]);

const fileListDecodedText = ref<Array<UploadFileInfo>>([]);

const fileListDecodedLz77Text = ref<Array<UploadFileInfo>>([]);

const onUploadEncodedTextActionHandler = async ({
  file,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions): Promise<void> => {
  if (file.type === 'text/plain') {
    onProgress({ percent: 1 });
    const uploadedText = (await (file.file as Blob).text());
    textStore.$patch({
      textToEncodingDecoding: uploadedText,
      uploadTextFileSize: file.file?.size,
    });
    onFinish();
    onProgress({ percent: 100 });
  } else {
    onError();
  }

  setTimeout(() => {
    fileListEncodedText.value.pop();
  }, 1000);
};

const onUploadDecodedTextActionHandler = async ({
  file,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions): Promise<void> => {
  if (file.type === 'text/plain') {
    onProgress({ percent: 1 });
    const uploadedText = (await (file.file as Blob).text());
    textStore.$patch({
      textToDecoding: uploadedText,
      uploadEncodedTextFileSize: file.file?.size,
    });
    onFinish();
    onProgress({ percent: 100 });
  } else {
    onError();
  }

  setTimeout(() => {
    fileListDecodedText.value.pop();
  }, 1000);
};

const onUploadDecodedLz77TextActionHandler = async ({
  file,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions): Promise<void> => {
  if (file.type === 'text/plain') {
    onProgress({ percent: 1 });
    const uploadedText = (await (file.file as Blob).text());
    textStore.$patch({
      textToLz77Decoding: uploadedText,
      uploadEncodedTextFileSize: file.file?.size,
    });
    onFinish();
    onProgress({ percent: 100 });
  } else {
    onError();
  }

  setTimeout(() => {
    fileListDecodedLz77Text.value.pop();
  }, 1000);
};
</script>

<template>
  <div class="upload">
    <n-upload
      v-model:file-list="fileListEncodedText"
      :custom-request="onUploadEncodedTextActionHandler"
      accept=".txt"
    >
      <n-upload-dragger>
        <div class="upload-zone-container">
          Загрузить текст для кодирования
        </div>
      </n-upload-dragger>
    </n-upload>

    <n-upload
      v-model:file-list="fileListDecodedText"
      :custom-request="onUploadDecodedTextActionHandler"
      accept=".txt"
    >
      <n-upload-dragger>
        <div class="upload-zone-container">
          Загрузить текст LZW для декодирования
        </div>
      </n-upload-dragger>
    </n-upload>

    <n-upload
      v-model:file-list="fileListDecodedLz77Text"
      :custom-request="onUploadDecodedLz77TextActionHandler"
      accept=".txt"
    >
      <n-upload-dragger>
        <div class="upload-zone-container">
          Загрузить текст LZ77 для декодирования
        </div>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<style lang="scss" scoped>
.upload {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  :deep(.n-upload) {
    width: 100%;

    .n-upload-trigger {
      width: 100%;
    }

    .n-upload-file-list {
    }
  }

  .upload-zone-container {
    width: 100%;
  }
}
</style>
