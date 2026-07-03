"use client"
import { Box, Input, Select, Typography, MenuItem, InputAdornment } from '@mui/material'
import { useEffect, useState } from 'react'
import PageHeader from '../PageHeader'

type Props = {}

const byteMetrics = {
  B: { name: 'Byte', value: 1 },
  KB: { name: 'Kilobyte', value: 1024 },
  MB: { name: 'Megabyte', value: Math.pow(1024, 2) },
  GB: { name: 'Gigabyte', value: Math.pow(1024, 3) },
  TB: { name: 'Terabyte', value: Math.pow(1024, 4) },
  PB: { name: 'Petabyte', value: Math.pow(1024, 5) },
  EB: { name: 'Exabyte', value: Math.pow(1024, 6) },
  ZB: { name: 'Zettabyte', value: Math.pow(1024, 7) },
  YB: { name: 'Yottabyte', value: Math.pow(1024, 8) }
};

const bitMetrics = {
  b: { name: 'Bit', value: 0.125 },
  Kb: { name: 'Kilobit', value: 0.125 * 1024 },
  Mb: { name: 'Megabit', value: 0.125 * Math.pow(1024, 2) },
  Gb: { name: 'Gigabit', value: 0.125 * Math.pow(1024, 3) },
  Tb: { name: 'Terabit', value: 0.125 * Math.pow(1024, 4) },
  Pb: { name: 'Petabit', value: 0.125 * Math.pow(1024, 5) },
  Eb: { name: 'Exabit', value: 0.125 * Math.pow(1024, 6) },
  Zb: { name: 'Zettabit', value: 0.125 * Math.pow(1024, 7) },
  Yb: { name: 'Yottabit', value: 0.125 * Math.pow(1024, 8) },
};

const metrics = { ...byteMetrics, ...bitMetrics }

type MetricKey = keyof typeof metrics
type ByteMetricKey = keyof typeof byteMetrics
type BitMetricKey = keyof typeof bitMetrics

function FileSizeConverter({ }: Props) {

  const [fromMetric, setFromMetric] = useState<MetricKey>("B")
  const [toMetric, setToMetric] = useState<MetricKey>("B")
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)

  const convertFromToByte = (metricKey: MetricKey, value: number) => {
    return metrics[metricKey].value * value
  }

  const convertByteTo = (metricKey: MetricKey, value: number) => {
    return value / metrics[metricKey].value
  }

  useEffect(() => {
    setToValue(convertByteTo(toMetric, convertFromToByte(fromMetric, fromValue)))
  }, [fromValue, fromMetric])

  useEffect(() => {
    setFromValue(convertByteTo(fromMetric, convertFromToByte(toMetric, toValue)))
  }, [toMetric, toValue])

  const onMetricChange = (pos: 'to' | 'from') => (event: any) => {
    const value = event.target.value
    if (pos === 'to') {
      setToMetric(value)
    } else {
      setFromMetric(value)
    }
  }

  const onValueChange = (pos: 'to' | 'from') => (event: any) => {
    const value = event.target.value
    if (pos === 'to') {
      setToValue(value)
    } else {
      setFromValue(value)
    }
  }

  return (
    <Box width={"100%"}>
      <PageHeader>
        <Typography variant="h4" >File Size Converter</Typography>
      </PageHeader>


      <Box display="flex" gap="2rem" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <Box display='flex' alignItems={'center'} gap="1rem" justifyContent={'center'}>
          <Typography>Convert from </Typography>
          <Select
            native
            value={fromMetric}
            onChange={onMetricChange('from')}
          >
            <optgroup label="Byte">
              {Object.keys(byteMetrics).map((key) => (
                <option key={key} value={key}>{byteMetrics[key as ByteMetricKey].name}({key})</option>
              ))}
            </optgroup>
            <optgroup label="bit">
              {Object.keys(bitMetrics).map((key) => (
                <option key={key} value={key}>{bitMetrics[key as BitMetricKey].name}({key})</option>
              ))}
            </optgroup>
          </Select>
          <Typography>to</Typography>
          <Select
            native
            value={toMetric}
            onChange={onMetricChange('to')}
          >
            <optgroup label="Byte">
              {Object.keys(byteMetrics).map((key) => (
                <option key={key} value={key}>{byteMetrics[key as ByteMetricKey].name}({key})</option>
              ))}
            </optgroup>
            <optgroup label="bit">
              {Object.keys(bitMetrics).map((key) => (
                <option key={key} value={key}>{bitMetrics[key as BitMetricKey].name}({key})</option>
              ))}
            </optgroup>
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: "1rem",
            justifyContent: 'center',
          }}
        >
          <Input
            type="number"
            value={fromValue}
            onChange={onValueChange('from')}
            endAdornment={<InputAdornment position="end">{fromMetric}</InputAdornment>}
          />
          <Typography> = </Typography>
          <Input
            type="number"
            value={toValue}
            onChange={onValueChange('to')}
            endAdornment={<InputAdornment position="end">{toMetric}</InputAdornment>}
          />
        </Box>
      </Box>

    </Box>
  )
}

export default FileSizeConverter