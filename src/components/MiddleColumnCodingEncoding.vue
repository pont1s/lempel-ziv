<script lang="ts" setup>
import { ref } from 'vue';
import { NTabPane, NTabs } from 'naive-ui';
import '@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css';

import { useTextStore } from '@/stores/textFileStore';

import { Lzw } from '@/utils/Lzw';
import { Code, Lz77 } from '@/utils/Lz77';

import VButton from '@/components/kit/VButton.vue';

const textStore = useTextStore();

const lzw = new Lzw();
const lz77 = new Lz77();

const lzwEncodedText = ref('');
let lzwBytesEncodedFile: Blob | null = null;
const lzwBytesEncodedFileSize = ref<null | number>(null);
const lzwDecodedText = ref('');

const encodedTextLz77 = ref('');
let lz77BytesEncodedFile: Blob | null = null;
const lz77BytesEncodedFileSize = ref<null | number>(null);
const lz77DecodedText = ref('');

textStore.$subscribe((mutation, state) => {
  if (state.textToEncodingDecoding.length > 0) {
    lzwEncodedText.value = lzw.encode(state.textToEncodingDecoding);
    lzwBytesEncodedFile = new Blob([lzwEncodedText.value], { type: 'application/octet-stream' });
    lzwBytesEncodedFileSize.value = lzwBytesEncodedFile.size;

    encodedTextLz77.value = JSON.stringify(lz77.encode(state.textToEncodingDecoding));
    lz77BytesEncodedFile = new Blob([encodedTextLz77.value], { type: 'application/octet-stream' });
    lz77BytesEncodedFileSize.value = lz77BytesEncodedFile.size;
  }

  if (state.textToDecoding.length > 0) {
    lzwDecodedText.value = lzw.decode(state.textToDecoding);
  }

  if (state.textToLz77Decoding.length > 0) {
    lz77DecodedText.value = lz77.decode(JSON.parse(state.textToLz77Decoding) as Code[]);
  }
});

// const text = 'The eight teams now qualified will meet in Jönköping on November 25 to compete for the lion\'s share of a $123,000 prize pool. The squads will be split across two GSL-style group stages, with the opening and winner\'s matches being best-of-one and the rest best-of-three, the top two teams from each group making it to a single-elimination playoff bracket. The winners of the previous two Impact LAN events, Nigma Galaxy, will find themselves heavy favourites when the teams clash in Sweden as they set about an attempt to make it a three-peat of trophies.';
// const text2 = 'The eight teams now qualified will meet in Jönköping on November 25 to compete for the lion\'s share of a $123,000 prize pool.';
// const encoded = lz77.encode(text2);
// console.log(text2);
// console.log(encoded);
// const decoded = lz77.decode(encoded);
// console.log(decoded);

const download = (content: BlobPart, fileName: string, contentType: string) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

const onClickDownloadEncodingHuffmanTextButtonHandler = () => {
  if (lzwBytesEncodedFile) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(lzwBytesEncodedFile);
    a.download = 'encoded-text.txt';
    a.click();
  }
};

const onClickDownloadDecodedHuffmanTextButtonHandler = () => {
  download(lzwDecodedText.value, 'decoded-text.txt', 'text/plain');
};

const onClickDownloadEncodingShannonTextButtonHandler = () => {
  if (lz77BytesEncodedFile) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(lz77BytesEncodedFile);
    a.download = 'encoded-text.txt';
    a.click();
  }
};

const onClickDownloadDecodedShannonTextButtonHandler = () => {
  download(lz77DecodedText.value, 'decoded-text.txt', 'text/plain');
};
</script>

<template>
  <div class="middle">
    <n-tabs
      class="tabs"
      type="segment"
      :animated="true"
    >
      <n-tab-pane
        class="tab"
        name="table"
        tab="LZW"
      >
        <div class="encoding-decoding">
          <div v-if="lzwEncodedText.length > 0 && lzwBytesEncodedFileSize" class="encoding">
            <v-button type="primary" @click="onClickDownloadEncodingHuffmanTextButtonHandler">
              Скачать закодированный текст
            </v-button>
            <div class="encoding-decoding-info">
              <span>Размер оригинального файла: {{ textStore.uploadTextFileSize }}</span>
              <span>Размер сжатого файла: {{ lzwBytesEncodedFileSize }}</span>
            </div>
          </div>

          <v-button
            v-if="lzwDecodedText.length > 0"
            type="primary"
            @click="onClickDownloadDecodedHuffmanTextButtonHandler"
          >
            Скачать декодированный текст
          </v-button>
        </div>
      </n-tab-pane>
      <n-tab-pane
        class="tab"
        name="bars"
        tab="LZ77"
      >
        <div class="encoding-decoding">
          <div v-if="encodedTextLz77.length > 0 && lz77BytesEncodedFileSize" class="encoding">
            <v-button type="primary" @click="onClickDownloadEncodingShannonTextButtonHandler">
              Скачать закодированный текст
            </v-button>
            <div class="encoding-decoding-info">
              <span>Размер оригинального файла: {{ textStore.uploadTextFileSize }}</span>
              <span>Размер сжатого файла: {{ lz77BytesEncodedFileSize }}</span>
            </div>
          </div>

          <v-button
            v-if="lz77DecodedText.length > 0"
            type="primary"
            @click="onClickDownloadDecodedShannonTextButtonHandler"
          >
            Скачать декодированный текст
          </v-button>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style lang="scss" scoped>
.middle {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem;

  .tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    :deep(.n-tabs-nav) {
      max-width: 400px;
    }

    :deep(.n-tabs-pane-wrapper) {
      height: 100%;
    }

    .tab {
      height: 100%;
      padding: 0;
    }
  }

  .encoding-decoding {
    display: flex;
    gap: 2rem;

    .encoding-decoding-info {
      display: flex;
      flex-direction: column;
    }
  }

  .tree {
    margin-top: 1rem;
    height: 100%;
  }

  .tree-node {
    max-width: max-content;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #4b4b4b;
    border-radius: 0.25rem;
  }
}
</style>
