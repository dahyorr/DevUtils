'use client'
import { Box, Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material"
import FilePicker from "../FilePicker"
import { useRef, useState } from "react"
import { useSnackbar } from "notistack"
import { copyImgToClipboard } from "@/utils"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Props { }
const Base64ImageDecoder = ({ }: Props) => {

  const { enqueueSnackbar } = useSnackbar()
  const [encodedImage, setEnecodedImage] = useState<string>('')
  const [blob, setBlob] = useState<Blob>()
  const previewRef = useRef<HTMLImageElement>(null)

  const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  const onDecode = async () => {
    if (!encodedImage) {
      enqueueSnackbar('Please select a file', { variant: 'error' })
      return
    }
    //check endoded image for metadata and strip it into a variable if it exists
    let data: string = encodedImage
    let mimetype = ''

    const metadateIndex = encodedImage.indexOf('base64,')
    if (metadateIndex !== -1) {
      data = encodedImage.slice(metadateIndex + 7)
      mimetype = encodedImage.slice(5, metadateIndex - 1)
    }

    const blob = b64toBlob(data, mimetype)
    const url = URL.createObjectURL(blob)
    if (previewRef.current) {
      previewRef.current.src = url
    }
    setBlob(blob)
  }

  // const onCopyDecodedImage = () => {
  //   // copyToClipboard()
  //   if (blob) {
  //     copyImgToClipboard(URL.createObjectURL(blob))
  //   }
  //   enqueueSnackbar('Copied to clipboard', { variant: 'success' })
  // }

  const onDownloadDecodedImage = () => {
    if (blob) {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      // get mimetype extension from blob
      a.download = `decoded-image.${blob.type.split('/')[1]}`
      a.click()
    }
  }

  // useEffect(() => {
  //   onDecode()
  // }, [files])

  return (
    <Stack alignItems={'center'} spacing={2}>
      <TextField
        label="Encoded Image"
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        value={encodedImage}
        onChange={(e) => setEnecodedImage(e.target.value)}

      />

      <Box display={'flex'} gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onDecode}
        >
          Decode
        </Button>

        <Box display={"flex"} gap={2}>
          {/* <Button
            variant="outlined"
            color="primary"
            onClick={onCopyDecodedImage}
            disabled={!blob}
          >
            Copy
          </Button> */}
          <Button
            variant="outlined"
            color="primary"
            onClick={onDownloadDecodedImage}
            disabled={!blob}
          >
            Download
          </Button>
        </Box>

      </Box>

      <Box id="preview" display={blob ? 'block' : 'none'}>
        <img ref={previewRef} alt="preview" />
      </Box>

    </Stack>
  )
}
export default Base64ImageDecoder