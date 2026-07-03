"use client"
import { Box, Button, OutlinedInput, Stack, Typography, useTheme } from '@mui/material'
import { useRef, useState } from 'react'
import PageHeader from '../PageHeader'
import { QRCodeCanvas } from 'qrcode.react';
import { useSnackbar } from 'notistack';

const defaultValue = "https://devutils.dayo.dev/generators/qr-code"

const QrCodeGenerator = () => {
  const [value, setValue] = useState<string>(defaultValue)
  const theme = useTheme()
  const themeMode = theme.palette.mode
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { enqueueSnackbar } = useSnackbar()


  const onUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const getCanvasImage = async (output: "url" | "blob") => {
    const canvas = canvasRef.current
    if (!canvas) return; 
    if (output === "url") {
      return canvas.toDataURL('image/png')
    }
    if (output === "blob") {
      return await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        })
      })
    }
  }
  const onDownload = async () => {
    const dataUrl = await getCanvasImage('url')
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = dataUrl as string;
      link.click();
    }
  }

  const onCopy = async () => {
    const dataUrl = await getCanvasImage('blob')
    if (!dataUrl) {
      return;
    }
    try {
      navigator.clipboard.write([
        new ClipboardItem({
          'image/png': dataUrl
        })
      ]);
    } catch (error) {
      enqueueSnackbar('Failed to copy QR Code to clipboard', { variant: 'error' })
    }
  }

  return (
    <Box>
      <PageHeader >
        <Typography variant="h4" >QR Code Generator</Typography>
      </PageHeader>

      <Stack spacing={'2rem'} display={'flex'} maxWidth={'sm'} mx={'auto'} alignItems={'center'}>
        <OutlinedInput
          id='text'
          type={'text'}
          value={value}
          fullWidth
          onChange={onUpdateValue}
        />

        <QRCodeCanvas
          ref={canvasRef}
          value={value}
          // title={"Title for my QR Code"}
          size={320}
          bgColor={themeMode === "light" ? "#ffffff" : "#000000"}
          fgColor={themeMode === "light" ? "#000000" : "#ffffff"}
          level={"L"}
        // imageSettings={{
        //   src: "https://static.zpao.com/favicon.png",
        //   x: undefined,
        //   y: undefined,
        //   height: 180,
        //   width: 180,
        //   opacity: 1,
        //   excavate: true,
        // }}
        />

        <Box 
          display={'flex'}
          gap={'1rem'}
        >
          <Button
            variant="contained"
            onClick={onDownload}
          >
            Download
          </Button>
          <Button
            variant="contained"
            onClick={onCopy}
          >
            Copy Image
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default QrCodeGenerator