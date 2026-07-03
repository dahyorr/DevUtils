"use client";
import React, { useState } from 'react'
import PageHeader from 'components/PageHeader'
import { Box, Button, OutlinedInput, Stack, InputAdornment, IconButton, Typography, Select, SelectChangeEvent, Slider, Input } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generateNanoid } from '@/utils/generateNanoid';
import { copyToClipboard } from '@/utils';
import { enqueueSnackbar } from 'notistack';

const defaultLength = 21

const NanoidGenerator = () => {
  const [value, setValue] = useState<string>(generateNanoid())
  const [sliderValue, setSliderValue] = useState<number>(defaultLength)

  const getNanoId = () => {
    return setValue(generateNanoid(sliderValue))
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number)
  }

  const copyNanoidToClipboard = (text: string) => {
    copyToClipboard(text)
    enqueueSnackbar('Copied to clipboard', { variant: 'success' })
  }

  return (
    <Box>
      <PageHeader>
        <Typography variant="h4" >NanoID Generator</Typography>
      </PageHeader>

      <Stack alignItems={'center'} spacing={'1rem'} display={'flex'} maxWidth={'sm'} mx={'auto'}>
        {/* <Box display='flex' alignItems={'center'} gap="1rem">
        <Typography>Generate NanoID</Typography>
      </Box> */}

        <OutlinedInput
          id="uuid"
          type={'text'}
          value={value}
          disabled
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="copy to clipboard"
                onClick={() => copyNanoidToClipboard(value)}
                edge="end"
              >
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          }
          label="key"
        />
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap:"1rem",
          width: '100%',
        }}
        >
        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          max={256}
          min={1}
          valueLabelDisplay='auto'
          sx={{
            flex: 1,
          }}
        />

        <Input
          value={sliderValue}
          onChange={(event) => setSliderValue(Number(event.target.value))}
          type="number"
          inputProps={{
            min: 1,
            max: 256
          }}
          style={{width: 50}}

        />
        </Box>


        <Button variant="contained" color="primary" onClick={getNanoId}>Generate</Button>

      </Stack>
    </Box>
  )
}

export default NanoidGenerator