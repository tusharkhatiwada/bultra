import React, { useState, useEffect, FC } from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import { isNil } from "lodash"

import { WalletStackScreenProps } from "../../../../models/Navigation"
import { Routes } from "../../../../models/Routes"

export type QrScannerProps = WalletStackScreenProps<typeof Routes.main.wallet.qr_scanner>

export const QrScanner: FC<QrScannerProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      // @ts-ignore
      setHasPermission(status === "granted")
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleGoToWithdraw = (data: string) => {
    navigation.navigate(Routes.main.wallet.withdraw, { addressToSend: data })
  }

  // @ts-ignore
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
    if (!isNil(data)) {
      handleGoToWithdraw(data)
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
})
