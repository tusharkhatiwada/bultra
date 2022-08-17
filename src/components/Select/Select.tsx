import {
  CheckIcon,
  FormControl,
  ISelectItemProps,
  ISelectProps,
  Select as SelectPrimitive,
  WarningOutlineIcon,
} from "native-base"

import { FC } from "react"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import _ from "lodash"

export type SelectProps = ISelectProps & {
  label: string
  options: ISelectItemProps[]
  onChange?: (value: string) => void
  placeholder?: string
  defaultValue?: string
  message?: string
  isRequired?: boolean
}

export const Select: FC<SelectProps> = ({
  label,
  options,
  defaultValue,
  placeholder,
  message,
  isRequired,
  onChange = () => undefined,
  ...rest
}) => {
  return (
    <FormControl
      w="100%"
      maxW="300"
      isRequired={isRequired}
      isInvalid={!!message}
      style={styles.container}
    >
      <Typography accessibilityLabel={label} size="small" style={styles.label}>
        {label}
      </Typography>
      <SelectPrimitive
        style={styles.input}
        accessibilityLabel={label}
        placeholder={placeholder}
        onValueChange={onChange}
        defaultValue={defaultValue || undefined}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={5} />,
        }}
        mt="1"
        {...rest}
      >
        {options.map((option) => (
          <SelectPrimitive.Item
            key={`${option.value}-select-item`}
            label={option.label}
            value={option.value}
          />
        ))}
      </SelectPrimitive>
      {message ? (
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" />}
          style={styles.message}
        >
          {_.capitalize(message)}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText style={styles.message}>
          {_.capitalize(message)}
        </FormControl.HelperText>
      )}
    </FormControl>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 46,
  },
  message: {
    minHeight: 18,
  },
})
