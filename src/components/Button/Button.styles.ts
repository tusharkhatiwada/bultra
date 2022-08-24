export const themeButton = {
  sizes: {
    lg: {
      _text: {
        fontSize: "lg",
      },
    },
    md: {
      _text: {
        fontSize: "md",
      },
    },
    sm: {
      _text: {
        fontSize: "sm",
      },
    },
    xs: {
      _text: {
        fontSize: "xs",
      },
    },
  },
  variants: {
    solid: ({ colorScheme }: { colorScheme: string }) => {
      return {
        _light: {
          bg: `${colorScheme}.900`,
          _text: {
            color: `white`,
          },
          _icon: {
            color: `white`,
          },
          _spinner: {
            color: `white`,
          },
          _pressed: {
            bg: `${colorScheme}.800`,
          },
          _disabled: {
            bg: `${colorScheme}.700`,
          },
        },
        _dark: {
          bg: `${colorScheme}.100`,
          _text: {
            color: `black`,
          },
          _icon: {
            color: `black`,
          },
          _spinner: {
            color: `black`,
          },
          _pressed: {
            bg: `${colorScheme}.200`,
          },
          _disabled: {
            bg: `${colorScheme}.100`,
          },
        },
      }
    },
    outline: ({ colorScheme }: { colorScheme: string }) => {
      return {
        _light: {
          borderColor: `${colorScheme}.500`,
        },
        _dark: {
          borderColor: `${colorScheme}.500`,
        },
      }
    },
  },
}
