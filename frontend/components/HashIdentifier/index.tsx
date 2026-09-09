"use client"
import { useState } from 'react'
import {
  Box, Stack, TextField, Typography,
  Table, TableHead, TableBody, TableRow, TableCell, Paper,
} from '@mui/material'
import PageHeader from '../PageHeader'
import { identifyHash, HashCandidate } from './identifyHash'

const initialInput = '5d41402abc4b2a76b9719d911017c592'

const HashIdentifier = () => {
  const [input, setInput] = useState<string>(initialInput)
  const [candidates, setCandidates] = useState<HashCandidate[]>(() => identifyHash(initialInput))

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    setCandidates(identifyHash(value))
  }

  const isBlank = input.trim().length === 0

  return (
    <Box>
      <PageHeader>
        <Typography variant="h4">Hash Identifier</Typography>
      </PageHeader>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <TextField
          label="Hash"
          placeholder="Paste a hash to identify it..."
          variant="outlined"
          fullWidth
          multiline
          value={input}
          onChange={onInputChange}
        />

        {isBlank ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Paste a hash above to see possible algorithm matches.
          </Typography>
        ) : candidates.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            No known algorithm matches this input.
          </Typography>
        ) : (
          <Paper elevation={12} sx={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Algorithm</TableCell>
                  <TableCell align="left">Format</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((c) => (
                  <TableRow key={c.algorithm}>
                    <TableCell component="th" scope="row" sx={{ width: '150px' }}>
                      {c.algorithm}
                    </TableCell>
                    <TableCell align="left">{c.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Stack>
    </Box>
  )
}

export default HashIdentifier
