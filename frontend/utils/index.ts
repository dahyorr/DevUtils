export {convertByteSize} from './convertByteSize'
export {generateUuid} from './generateUuid'
export {navTree} from './navTree'

export const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

export const copyImgToClipboard =  async  (imgUrl: string) =>{
  try {
    const data = await fetch(imgUrl);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
  } catch (err) {
    console.error(err);
  }
}

