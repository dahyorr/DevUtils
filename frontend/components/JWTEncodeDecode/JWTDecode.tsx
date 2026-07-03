import { Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { decodeJwt, decodeProtectedHeader, jwtVerify } from 'jose'
import JWTSettings, { JWTDecodeSettings } from './JWTSettings'
import { enqueueSnackbar } from 'notistack'

type Props = {
  allowedAlg: string[]
}


const JWTDecode = ({ allowedAlg }: Props) => {
  const [token, setToken] = useState<string>("")
  const [header, setHeader] = useState<string>("")
  const [payload, setPayload] = useState<string>("")
  const [signature, setSignature] = useState<string>("")
  const [signatureValid, setSignatureValid] = useState<boolean | undefined>()
  const [settings, setSettings] = useState<JWTDecodeSettings>({
    verifySignature: false
  })

  useEffect(() => {
    (async () => {
      try {
        const payload = decodeJwt(token)
        const header = decodeProtectedHeader(token)
        setHeader(JSON.stringify(header, null, 2))
        setPayload(JSON.stringify(payload, null, 2))

        if (!settings.verifySignature || !signature) {
          setSignatureValid(undefined)
          return
        }
        if (allowedAlg.includes(header.alg || "")) {
          await jwtVerify(token, new TextEncoder().encode(signature,))
          setSignatureValid(true)
        }
        else {
          setSignatureValid(undefined)
          enqueueSnackbar('Algorithm Unsupported', { variant: 'error' })
          return
        }
      } catch (error: any) {
        if (error?.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
          setSignatureValid(false)
        }
        else {
          console.log(error)
        }
      }
    })()
  }, [token, signature, allowedAlg, settings.verifySignature])

  return (
    <>
      <TextField
        id="jwt"
        label="JWT Token"
        multiline
        maxRows={4}
        value={token}
        onChange={(e) => setToken(e.target.value)}
        minRows={4}
        fullWidth
      />

      <Box display='flex'>
        <TextField
          id="header"
          label="Header"
          disabled
          multiline
          value={header}
          maxRows={5}
          minRows={5}
          fullWidth
        />
        <TextField
          id="payload"
          label="Payload"
          multiline
          disabled
          value={payload}
          maxRows={5}
          minRows={5}
          fullWidth
        />
      </Box>

      <JWTSettings
        settings={settings}
        mode='decode'
        onUpdate={(settings) => setSettings(settings as JWTDecodeSettings)}
      />


      {settings.verifySignature && (<TextField
        id="signature"
        label="Signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        multiline
        maxRows={4}
        minRows={4}
        fullWidth
      />)}

      {settings.verifySignature && signatureValid !== undefined && (
        <Typography color={signatureValid ? 'success' : 'error'}>
          {signatureValid ? 'Signature is valid' : 'Signature is invalid'}
        </Typography>
      )}

    </>
  )
}

export default JWTDecode