export interface Code {
  symbolCode: number | undefined;
  offset: number;
  length: number;
}

export class Lz77 {
  windowSize: number;

  constructor(windowsSize = 255) {
    this.windowSize = windowsSize;
  }

  public encode(text: string) {
    const encoded: Code[] = [];
    let position = 0;
    while (position < text.length) {
      let prefix = Math.max(position - this.windowSize, 0);
      let len = 0;
      let off = 0;
      const maxLength = Math.min(position + this.windowSize, text.length) - position;

      while (prefix < position) {
        for (let i = 0; i < maxLength; i += 1) {
          if (text[prefix + i] !== text[position + i]) {
            break;
          }

          if (i + 1 >= len) {
            len = i + 1;
            off = position - prefix;
          }
        }

        prefix += 1;
      }

      position += (len + 1);
      encoded.push({
        symbolCode: text[position - 1]?.charCodeAt(0) ?? undefined,
        offset: off,
        length: len,
      });
    }

    return encoded;
  }

  public decode(encoded: Code[]) {
    let decoded = '';
    encoded.forEach((code) => {
      const position = decoded.length - code.offset;
      const append = (code.length > 0 ? decoded.substring(position, position + code.length) : '')
          + (typeof code.symbolCode === 'number' ? String.fromCharCode(code.symbolCode) : '');
      // console.log(append);
      decoded += append;
    });

    return decoded;
  }
}
