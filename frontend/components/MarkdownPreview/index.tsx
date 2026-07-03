"use client"
import { Box } from "@mui/material"
import MarkdownEditor from "./MarkdownEditor"
import { useEffect, useRef, useState } from "react"
import { OnChange, OnMount, OnValidate } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { useTheme } from '@mui/material/styles'


interface Props { }

const MarkdownPreview = ({ }: Props) => {
  const [editorContent, setEditorContent] = useState("# Markdown Preview")
  const [htmlContent, setHtmlContent] = useState("")
  const [editorErrors, setEditorErrors] = useState<string[]>([])
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const theme = useTheme()
  const themeMode = theme.palette.mode

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  }

  const handleEditorValidation: OnValidate = (markers) => {
    const errors = markers.map(marker => marker.message)
    setEditorErrors(errors)
  }

  const handleEditorChange: OnChange = (value) => {
    setEditorContent(value || "")
  }

  // con

  const convertMarkdownToHtml = async (markdown: string) => {
    const { remark } = await import('remark')
    const { default: html } = await import('remark-html')
    const result = await remark().use(html).process(markdown)
    setHtmlContent(result.toString())
  }

  useEffect(() => {
    convertMarkdownToHtml(editorContent)
  }, [editorContent, editorErrors])
  console.log(theme.mixins.toolbar.minHeight)

  return (
    <Box sx={{
      height: '100%'
    }}>
      <Box
        sx={{
          width: '150%',
          maxWidth: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        <MarkdownEditor
          value={editorContent}
          onMount={handleEditorDidMount}
          theme={themeMode === 'light' ? themeMode : 'vs-dark'}
          onChange={handleEditorChange}
          onValidate={handleEditorValidation}
        />
        <Box
          sx={{
            px: 2,
            flexGrow: 1,
            height: '100%',
            maxWidth: '50%', 
            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
            overflow: 'auto'
          }}
        >
          <Box
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            maxWidth={'100%'}
          />
        </Box>
      </Box>
    </Box>
  )
}
export default MarkdownPreview