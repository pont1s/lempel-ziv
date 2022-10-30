import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTextStore = defineStore('text', () => {
  const text = ref<string>('');

  const textToEncodingDecoding = ref<string>('');
  const uploadTextFileSize = ref<null | number>(null);

  const textToDecoding = ref<string>('');
  const textToLz77Decoding = ref<string>('');
  const uploadEncodedTextFileSize = ref<null | number>(null);

  return {
    text,
    textToEncodingDecoding,
    uploadTextFileSize,
    textToDecoding,
    textToLz77Decoding,
    uploadEncodedTextFileSize,
  };
});
