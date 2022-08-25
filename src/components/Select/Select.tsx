import {
  CheckIcon,
  FormControl,
  ISelectItemProps,
  ISelectProps,
  Pressable,
  Select as SelectPrimitive,
  WarningOutlineIcon,
  useDisclose,
  useTheme,
} from "native-base"

import { BottomSheet } from "components/BottomSheet"
import { FC } from "react"
import { Icon } from "components/Icon"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import _ from "lodash"

export type SelectProps = ISelectProps & {
  label: string
  cta?: string
  bottomLabel?: string
  options: ISelectItemProps[]
  onChange: (value: string) => void
  placeholder?: string
  defaultValue?: string
  message?: string
  isRequired?: boolean
  custom?: boolean
}

export const Select: FC<SelectProps> = ({
  label,
  cta,
  bottomLabel,
  options,
  defaultValue,
  placeholder,
  message,
  isRequired,
  onChange,
  custom,
  ...rest
}) => {
  const { colors } = useTheme()
  const { isOpen, onOpen, onClose } = useDisclose()

  const selectedOption = options.find((option) => option.value === defaultValue)

  return (
    <FormControl w="100%" isRequired={isRequired} isInvalid={!!message} style={styles.container}>
      <Typography accessibilityLabel={label} size="small" style={styles.label}>
        {label}
      </Typography>
      {custom ? (
        <>
          <Pressable
            onPress={onOpen}
            style={[styles.input, styles.customInput, { borderColor: colors.primary[300] }]}
          >
            {selectedOption ? (
              <Typography size="mini">{selectedOption.label}</Typography>
            ) : (
              <Typography color="primary.400" size="mini">
                {placeholder || "Select..."}
              </Typography>
            )}

            <Icon name="chevron-down" size="md" />
          </Pressable>

          <BottomSheet
            title={bottomLabel}
            cta={cta}
            isOpen={isOpen}
            closeBottomSheet={onClose}
            options={options}
            onChange={onChange}
            value={defaultValue}
            {...rest}
          />
        </>
      ) : (
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
          dropdownIcon={<Icon name="chevron-down" size="md" style={styles.icon} />}
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
      )}

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
  customInput: {
    marginTop: 4,
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
})
