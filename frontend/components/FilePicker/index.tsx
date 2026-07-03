import {useCallback} from 'react'
import {styled} from '@mui/system'
import { Paper, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorIcon from '@mui/icons-material/Error';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import {Accept, DropzoneOptions, useDropzone} from 'react-dropzone'
import { convertByteSize } from '@/utils';
import IconButton from '@mui/material/IconButton'

const UploadDropzone = styled('div')(({theme}) => ({
    width: '450px', 
    minHeight:"320px", 
    margin: 8,
    border: 1,
    borderRadius: 2,
    borderStyle: 'dashed',
    borderWodth: 2,
    borderColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'relative'
}))

const FilePicker: React.FC<{
    onChange: (files: File[]) => void;
    clearFiles: () => void;
    selectedFiles: File[];
    sizeLimit: number;
    disableDropzone?: boolean
    placeholder?: string
    accept?: Accept
}> = ({onChange, selectedFiles,placeholder, accept,clearFiles, sizeLimit, disableDropzone}) => {
    

    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [onChange])

    // Cast is type-only: DropzoneOptions' shipped types predate React 19's
    // updated HTMLProps event-handler typing and can be removed once
    // react-dropzone ships React 19-compatible types.
    const {getRootProps, getInputProps, isDragActive, open, fileRejections} = useDropzone({
        onDropAccepted,
        maxFiles: 1,
        maxSize: sizeLimit,
        multiple: false,
        accept
    } as unknown as DropzoneOptions)

    const fileErrors = fileRejections.length > 0 && fileRejections[0].errors || []

    const fileErrorContent = () => {
        if (fileErrors.length > 0){
        console.error(fileErrors[0].code)
        const message = fileErrors[0].code === "file-too-large" 
            && `File size should be less than ${convertByteSize(sizeLimit)}`
            
            return (
                <>
                    <ErrorIcon color="error" sx={{fontSize: 100}}/>
                    <Typography align="center">{message || fileErrors[0].message}</Typography>
                </>
            )
        }
    }
    
    const fileSelectedContent = () => (
        <>
            <UploadFileTwoToneIcon color="primary" sx={{fontSize: 100}}/>
            <Typography align="center" noWrap sx={{width: '100%'}}>{selectedFiles[0].name}</Typography>
            <IconButton
                sx={{
                    fontSize: 30, 
                    mt: 5, 
                    position: 'absolute',
                    bottom: 30
                    
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    clearFiles()
                }}
                color="error"
            >
                <CancelRoundedIcon/>
            </IconButton>
            
        </>
    )

    const defaultStateContent = () => (
        <>
            <CloudUploadIcon color="primary" sx={{fontSize: 100}} />
            <Typography 
                align="center"
            >
            {
                isDragActive
                ? "Drop the files here ..."
                : placeholder || "Drop a file to upload or click here"
            }
            </Typography>
        </>
    )
    
    return (
    <Paper 
    sx={{
        width: 'fit-content',   
        minHeight:"180px", 
        borderRadius: '5px'
    }}
    elevation={12}
    >
    <UploadDropzone
        {...getRootProps() as object}
        onClick={open}
        sx={{
            cursor: disableDropzone || selectedFiles.length > 0
                ? 'default'
                : 'pointer',
                backgroundImage: 'none',
            }}    
    >
        <input {...getInputProps() as object} />
        {fileErrors.length > 0
        ? fileErrorContent()
        :selectedFiles.length > 0
        ? fileSelectedContent()
        : defaultStateContent()
        }
    </UploadDropzone>
  </Paper>
  )
}
export default FilePicker