import * as Clipboard from "expo-clipboard"

import { FC } from "react"
import { useTheme } from "native-base"
import { Pressable, StyleSheet, View } from "react-native"
import { isNil } from "lodash"

import { RootView } from "components/RootView"
import { Routes } from "models/Routes"

import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { WalletStackScreenProps } from "models/Navigation"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToastContext } from "context/ToastContext"
import { Icon } from "../../../../components/Icon"

export type PositionDetailsProps = WalletStackScreenProps<
  typeof Routes.main.wallet.historyPositionDetails
>

export const HistoryPositionDetails: FC<PositionDetailsProps> = ({ route }) => {
  const operation = route.params.position
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { showToast } = useToastContext()
  // const { wallet } = useGetWallet()
  //
  // const [selectedNetwork, setSelectedNetwork] = useState<WalletsType>()

  const copyToClipboard = async (value?: string) => {
    if (isNil(value)) return
    await Clipboard.setStringAsync(value).then(() => {
      showToast({
        type: ToastType.info,
        title: value,
        description: "copied to clipboard",
      })
    })
  }

  const date = new Date(operation.date)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return (
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingTop: space[6],
          paddingBottom: bottom + space[1],
        },
      ]}
    >
      <Typography color="primary.800" style={styles.description}>
        Amount
      </Typography>
      <View style={styles.informationBox}>
        <Typography color="primary.800" size="small">
          {operation.amount}
        </Typography>
        <Icon name="dollar-sign" size="md" color="primary.800" />
      </View>
      <Typography color="primary.800" style={styles.description}>
        Destination address
      </Typography>
      <View style={styles.informationBox}>
        <Typography color="primary.800" size="small">
          TFTGaKXqQhCxx7aPF22mfEnbg2gxYnKuM5
        </Typography>
        <Pressable onPress={() => copyToClipboard(" TFTGaKXqQhCxx7aPF22mfEnbg2gxYnKuM5")}>
          <Icon name="copy" size="md" color="primary.800" />
        </Pressable>
      </View>
      <View></View>
      <Typography color="primary.800" style={styles.description}>
        Transaction hash
      </Typography>
      <View style={styles.informationBox}>
        <Typography color="primary.800" size="small" style={styles.hashText}>
          {operation.hash}
        </Typography>
        <Pressable onPress={() => copyToClipboard(operation.hash)}>
          <Icon name="copy" size="md" color="primary.800" />
        </Pressable>
      </View>
      <Typography color="primary.800" style={styles.description}>
        Transaction platform fee
      </Typography>
      <View style={styles.informationBox}>
        <Typography color="primary.800" size="small" style={styles.hashText}>
          0.2
        </Typography>
        <Icon name="dollar-sign" size="md" color="primary.800" />
      </View>
      <Typography color="primary.800" style={styles.description}>
        Transaction date
      </Typography>
      <View style={styles.informationBox}>
        <Typography color="primary.800" size="small" style={styles.hashText}>
          {`${date.toLocaleDateString()} ${hours}:${minutes}`}
        </Typography>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    marginTop: 26,
    marginBottom: 8,
  },
  // eslint-disable-next-line react-native/no-color-literals
  informationBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D4D4D8",
    borderRadius: 4,
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  hashText: {
    width: 250,
  },
})
