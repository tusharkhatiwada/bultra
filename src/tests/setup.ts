jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}))

jest.mock("react-native-reanimated", () => ({
  ...require("react-native-reanimated/mock"),
  SlideInDown: {
    delay: jest.fn(),
  },
  SlideInUp: {
    delay: jest.fn(),
  },
}))

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => undefined),
      },
    }
  },
  Trans: jest
    .fn()
    .mockImplementation(({ children }) => (Array.isArray(children) ? children : [children])),
}))

jest.mock("expo-localization", () => ({
  ...jest.requireActual("expo-localization"),
  region: "US",
}))

jest.mock("@codler/react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: jest
    .fn()
    .mockImplementation(({ children }) => (Array.isArray(children) ? children : [children])),
}))

jest.useFakeTimers()

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})
