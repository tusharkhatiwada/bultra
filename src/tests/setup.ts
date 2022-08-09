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

jest.useFakeTimers()

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})
