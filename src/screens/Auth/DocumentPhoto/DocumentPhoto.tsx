import { Camera, CameraType } from "expo-camera"
import { DeviceEventEmitter, StyleSheet } from "react-native"
import { FC, useRef, useState } from "react"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { Events } from "models/Events"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Spinner } from "native-base"
import { Typography } from "components/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

export type DocumentPhotoProps = AuthStackScreenProps<typeof Routes.auth.document_photo>

export const DocumentPhoto: FC<DocumentPhotoProps> = ({ navigation }) => {
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  const cameraRef = useRef<Camera>(null)

  const takePicture = async () => {
    if (isCameraReady) {
      const photo = await cameraRef.current?.takePictureAsync({
        skipProcessing: true,
      })

      DeviceEventEmitter.emit(Events.CameraCapture, photo)
      navigation.goBack()
    }
  }

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  if (!permission) {
    return (
      <RootView style={[styles.loading, { paddingBottom: bottom + 24 }]}>
        <Spinner />
      </RootView>
    )
  }

  if (!permission.granted) {
    return (
      <RootView style={[styles.container, { paddingBottom: bottom + 24 }]}>
        <Typography>{t("wallet.kyc.documentPhoto.requestPermissions")}</Typography>
        <Button onPress={requestPermission}>
          {t("wallet.kyc.documentPhoto.requestPermissionsCta")}
        </Button>
      </RootView>
    )
  }

  return (
    <RootView style={[styles.container, { paddingBottom: bottom + 24 }]}>
      <Camera
        ref={cameraRef}
        type={CameraType.back}
        onCameraReady={onCameraReady}
        style={styles.camera}
      />

      <Button onPress={takePicture}>{t("wallet.kyc.documentPhoto.capture")}</Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  loading: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    marginBottom: 60,
  },
})
