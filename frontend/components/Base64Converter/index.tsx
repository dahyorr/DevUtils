"use client";
import {useState} from 'react'
import {Box, Stack, TextField, Button} from '@mui/material';
import { useSnackbar } from 'notistack';

const Base64Converter = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const {enqueueSnackbar} = useSnackbar();

  const connvertToBase64 = (str: string) => {
    return window.btoa(str);
  }

  const connvertFromBase64 = (str: string) => {
    return window.atob(str);
  }

  const onConvert = (type: 'encode' | 'decode') => {
    try{
      if (type === 'encode') {
        setOutputValue(connvertToBase64(inputValue));
      } else {
        setOutputValue(connvertFromBase64(inputValue));
      }
    }
    catch(err){
      if(err instanceof Error){
        enqueueSnackbar(err.message, {variant: 'error'})
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setInputValue(value);
  }

  return (
    <Box sx={{
      height: '100%',
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
            onClick={() => onConvert('encode')}
          >Encode</Button>
          <Button
            variant={"contained"}
            onClick={() => onConvert('decode')}
          >Decode</Button>
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
  )
};

export default Base64Converter;
