import MonacoEditor, {OnChange, OnMount, OnValidate} from '@monaco-editor/react'
import { Box } from '@mui/system'
import Spinner from "@/components/loaders/Spinner";

interface EditorProps {
  value: string;
  onMount?: OnMount;
  onChange?: OnChange;
  theme?: string;
  onValidate?: OnValidate;
}

const MarkdownEditor: React.FC<EditorProps> = ({value, onMount, theme, onValidate, onChange}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
        maxWidth: '50%',
        overflow: 'hidden',
      }}
    >
      <MonacoEditor
        defaultLanguage='markdown'
        defaultValue={value}
        onMount={onMount}
        theme={theme}
        onChange={onChange}
        options={{
          automaticLayout: true
        }}
        loading={<Spinner message="Loading Editor"/>}
        onValidate={onValidate}
      />
    </Box>
  )
}

export default MarkdownEditor