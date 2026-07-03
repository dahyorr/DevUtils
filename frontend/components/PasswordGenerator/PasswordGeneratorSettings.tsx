import { Stack, Switch, FormControlLabel, Slider, TextField } from "@mui/material"

export type PasswordGeneratorSettingsType = {
  length: number
  includeLowercase: boolean
  includeUppercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  type: 'random' | 'human' | 'number'
}

interface Props {
  settings: PasswordGeneratorSettingsType
  onSettingsChange: (settings: PasswordGeneratorSettingsType) => void
}
const PasswordGeneratorSettings = (props: Props) => {
  const { settings, onSettingsChange } = props;

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleLengthChange = (event: Event, newValue: number | number[]) => {
    onSettingsChange({
      ...settings,
      length: newValue as number,
    });
  };

  const handleLengthInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);
    if (value && value <= 32) {
      onSettingsChange({
        ...settings,
        length: value,
      });
    }
  };

  return (
    <Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Slider
          value={settings.length}
          onChange={handleLengthChange}
          aria-labelledby="length-slider"
          max={32}
        />
        <TextField
          value={settings.length}
          onChange={handleLengthInputChange}
          inputProps={{
            step: 1,
            min: 1,
            max: 32,
            type: 'number',
            'aria-labelledby': 'length-slider',
          }}
          sx={{
            minWidth: "4.25rem",
          }}
        />
      </Stack>
      <FormControlLabel
        control={
          <Switch
            checked={settings.includeUppercase}
            onChange={handleToggle}
            name="includeUppercase"
            disabled={settings.type === 'number'}
          />
        }
        label="Include Uppercase"
      />
      <FormControlLabel
        control={
          <Switch
            checked={settings.includeLowercase}
            onChange={handleToggle}
            name="includeLowercase"
            disabled={settings.type === 'number'}
          />
        }
        label="Include Lowercase"
      />
      <FormControlLabel
        control={
          <Switch
            checked={settings.includeNumbers}
            onChange={handleToggle}
            name="includeNumbers"
            disabled={settings.type === 'number'}
          />
        }
        label="Include Numbers"
      />
      <FormControlLabel
        control={
          <Switch
            checked={settings.includeSymbols}
            onChange={handleToggle}
            name="includeSymbols"
          />
        }
        label="Include Symbols"
      />

    </Stack>
  )
}
export default PasswordGeneratorSettings