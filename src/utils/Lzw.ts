export class Lzw {
  public encode(text: string) {
    const dictPhrases = new Map<string, number>();
    const data = text.split('');
    const encodedArray: number[] = [];
    let code = 256;
    let phrase = data[0];

    data.slice(1).forEach((currentSymbol) => {
      if (dictPhrases.has(phrase + currentSymbol)) {
        phrase += currentSymbol;
      } else {
        encodedArray.push(phrase.length > 1 ? dictPhrases.get(phrase) as number : phrase.charCodeAt(0));
        dictPhrases.set(phrase + currentSymbol, code);
        phrase = currentSymbol;
        code += 1;
      }
    });
    encodedArray.push(phrase.length > 1 ? dictPhrases.get(phrase) as number : phrase.charCodeAt(0));

    return encodedArray.map((encodedPhrase) => String.fromCharCode(encodedPhrase)).join('');
  }

  public decode(text: string) {
    const dictPhrases = new Map<number, string>();
    const data = text.split('');
    let currentChar = data[0];
    let oldPhrase = currentChar;
    let code = 256;
    let phrase: string;

    const decodedArray: string[] = [currentChar];

    data.slice(1).forEach((currentSymbol) => {
      const currentSymbolCode = currentSymbol.charCodeAt(0);
      if (currentSymbolCode < 256) {
        phrase = currentSymbol;
      } else {
        phrase = dictPhrases.has(currentSymbolCode)
          ? dictPhrases.get(currentSymbolCode) as string : (oldPhrase + currentChar);
      }

      decodedArray.push(phrase);
      currentChar = phrase.charAt(0);
      dictPhrases.set(code, oldPhrase + currentChar);
      oldPhrase = phrase;
      code += 1;
    });

    return decodedArray.join('');
  }
}
