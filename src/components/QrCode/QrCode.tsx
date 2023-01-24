import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import QRCode from "react-qr-code"

interface Props {
  walletKey: string
}

export const QrCode: FC<Props> = ({ walletKey }) => {
  return (
    <View style={styles.container}>
      <QRCode value={walletKey} size={200} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})
