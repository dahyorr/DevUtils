"use client"
import { useState } from 'react'
import PageHeader from 'components/PageHeader'
import { Box, Button, OutlinedInput, MenuItem, Stack, InputAdornment, IconButton, Typography, Select, SelectChangeEvent } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyToClipboard, generateUuid } from '@/utils';
import { useSnackbar } from 'notistack';
import { UUIDVersion } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ALLOWED_VERSIONS = ['v1', 'v4']

const UuidGenerator = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();
  const queryVersion = searchParams.get('v') as UUIDVersion
  const version = ALLOWED_VERSIONS.includes(queryVersion) ? queryVersion as UUIDVersion : 'v4'
  const [value, setValue] = useState(generateUuid(version))
  const { enqueueSnackbar } = useSnackbar()

  const getNewUuid = () => {
    setValue(generateUuid(version))
  }

  const copyUuidToClipboard = (text: string) => {
    copyToClipboard(text)
    enqueueSnackbar('Copied to clipboard', { variant: 'success' })
  }

  const handleVersionChange = (event: SelectChangeEvent) => {
    const eventValue = event.target.value
    const params = new URLSearchParams(searchParams.toString())
    if (ALLOWED_VERSIONS.includes(eventValue)) {
      params.set('v', eventValue)
      replace(`${pathname}?${params.toString()}`);
      setValue(generateUuid(eventValue as UUIDVersion))
    }
  }

  return (
    <Box>
      <PageHeader>
        <Typography variant="h4" >UUID Generator</Typography>
      </PageHeader>

      <Stack alignItems={'center'} spacing={'1rem'} display={'flex'} maxWidth={'sm'} mx={'auto'}>
        <Box display='flex' alignItems={'center'} gap="1rem">
          <Typography>Generate UUID</Typography>
          <Select value={version} onChange={handleVersionChange} size='small'>
            <MenuItem value="v1">Version 1</MenuItem>
            <MenuItem value="v4">Version 4</MenuItem>
          </Select>
        </Box>

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
                onClick={() => copyUuidToClipboard(value)}
                edge="end"
              >
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          }
          label="key"
        />

        <Button variant="contained" color="primary" onClick={getNewUuid}>Generate</Button>

      </Stack>
    </Box>
  )
}

export default UuidGenerator