"use client"
import { Typography, Tabs, Tab, Box } from "@mui/material";
import PageHeader from "../PageHeader";
import { useState } from "react";
import Base64ImageDecoder from "./Base64ImageDecoder";
import Base64ImageEncoder from "./Base64ImageEncoder";

const Base64ImageConverter = () => {

  const [mode, setMode] = useState<'encode' | "decode">("decode")

  const onModeChange = (e: React.SyntheticEvent, value: 'encode' | "decode") => {
    setMode(value)
  }

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent={'space-between'} alignItems={'center'}>

          <Typography variant="h4">Base64 Image Encoder/Decoder</Typography>
          <Tabs value={mode} onChange={onModeChange} aria-label="basic tabs example">
            <Tab label="Decode" defaultChecked value="decode" />
            <Tab label="Encode" value={'encode'} />
          </Tabs>
        </Box>
      </PageHeader>

      {mode === "decode" ? (<Base64ImageDecoder />) : (<Base64ImageEncoder/>)}


    </>
  )
}
export default Base64ImageConverter;