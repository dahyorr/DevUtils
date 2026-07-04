"use client";
import { useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/system'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Alert from '@mui/material/Alert';
import Spinner from '../loaders/Spinner';
import { getHashingResult } from '@/api/fileHash';
import { useLoader } from '@/hooks';
import { HashData } from '@/types';
import { useSocket } from '@/hooks/useSocket';
import { useSearchParams } from 'next/navigation';

const Preview = styled(Paper)({
  width: '100%',
  minHeight: "400px",
})

const HashPreview = () => {
  const searchParams = useSearchParams()
  const fileId = searchParams.get('fileId')
  const [data, setData] = useState<HashData[]>([])
  const [loading, setLoading] = useState(true)
  const {hideLoader, showLoader} = useLoader()
  const { socket, openSocket, closeSocket } = useSocket("/file-hash")

  const getResult = useCallback(async () => {
    if (fileId) {
      try {
        showLoader()
        const { data } = await getHashingResult(fileId)
        setData(data)
      }
      catch (err) {
        console.error(err)
        // show message in snackbar
      }
      finally {
        setLoading(false)
        hideLoader()
      }
    }
  }, [fileId, showLoader, hideLoader])

  useEffect(() => {
    // Genuine data fetch keyed off the fileId route param, not derived
    // state that could be computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getResult()
  }, [getResult])

  useEffect(() => {
    if (data.length > 0) {
      openSocket()

      socket.on('hash-completed', (body: HashData) => {
        console.error('received', body)
        setData(prev => {
          const dataIndex = prev.findIndex(item => item.type === body.type)
          if (dataIndex > -1) {
            prev[dataIndex] = body
          }
          return [...prev]
        })
      })

      data.forEach((hash) => {
        if (hash.status === 'pending') {
          socket.emit('hash-ready', {
            fileId,
            hashType: hash.type
          })
        }
      })

      if (
        (data
          .map(item => item.status)
          .filter(status => status === 'pending')
          .length < 1)
      ) {
        closeSocket()
      }
    }
  }, [data, fileId, socket, closeSocket, openSocket])

  if (!loading && data.length > 0) {
    return (
      <Preview elevation={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hash Type</TableCell>
              <TableCell align="left">Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.type}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ width: '150px' }}>
                  {row.type}
                </TableCell>
                <TableCell align="left">
                  {
                    row.status === "pending"
                      ? <Spinner size={25} />
                      : row.hash
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <Spinner size={80}/> */}
      </Preview>
    )
  }
  else if (loading) {
    return null
  }
  else {
    return (
      <Alert variant="filled" severity="error">
        Invalid File ID
      </Alert>
    )
  }
};

export default HashPreview;
