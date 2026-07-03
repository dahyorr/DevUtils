"use client";
import { useState } from 'react'
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import PageHeader from '../PageHeader';

const TextEscapeUnescape = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const onConvert = (type: 'escape' | 'unescape') => {
    try {
      if (type === 'escape') {
        const escaped = encodeURIComponent(inputValue);
        setOutputValue(escaped);
      } else {
        const unescaped = decodeURIComponent(inputValue);
        setOutputValue(unescaped);
      }
    }
    catch (err) {
      if (err instanceof Error) {
        enqueueSnackbar(err.message, { variant: 'error' })
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  }

  return (
    <>
      <PageHeader>
        <Typography variant="h4">Text Escape/Unescape</Typography>
      </PageHeader>

      <Box sx={{
        // height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Stack
          direction="row"
          sx={{}}
          spacing={4}
          alignItems="center"
        >
          <TextField
            sx={{
              width: 300,
            }}
            variant="outlined"
            multiline
            minRows={10}
            maxRows={10}
            value={inputValue}
            onChange={handleChange}
            placeholder="Input value"
          />
          <Stack alignItems="center" spacing={2}>
            <Button
              variant={"contained"}
              onClick={() => onConvert('escape')}
            >Escape</Button>
            <Button
              variant={"contained"}
              onClick={() => onConvert('unescape')}
            >Unescape</Button>
          </Stack>
          <TextField
            sx={{
              width: 300,
            }}
            disabled
            value={outputValue}
            variant="outlined"
            multiline
            minRows={10}
            maxRows={10}
            placeholder="Output value"

          />
        </Stack>
      </Box>
    </>
  )
};

export default TextEscapeUnescape;
