import { Camera, CameraCapturedPicture, CameraType } from "expo-camera"
import { DeviceEventEmitter, StyleSheet } from "react-native"
import { FC, useRef, useState } from "react"
import { Image, Spinner, Stack } from "native-base"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { Events } from "models/Events"
import { Icon } from "components/Icon"
import Layout from "constants/Layout"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

export type DocumentPhotoProps = AuthStackScreenProps<typeof Routes.auth.document_photo>

export const DocumentPhoto: FC<DocumentPhotoProps> = ({ navigation }) => {
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [photo, setPhoto] = useState<CameraCapturedPicture>()
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const { top, bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  const cameraRef = useRef<Camera>(null)

  const takePicture = async () => {
    if (isCameraReady) {
      const photo = await cameraRef.current?.takePictureAsync({
        skipProcessing: true,
      })

      setPhoto(photo)
    }
  }

  const sendPicture = () => {
    if (photo) {
      DeviceEventEmitter.emit(Events.CameraCapture, photo)
      navigation.goBack()
    }
  }

  const resetPicture = () => {
    setPhoto(undefined)
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

  const imageHeight = Layout.window.height - 252 - top - bottom

  if (photo) {
    return (
      <RootView style={[styles.container, { paddingBottom: bottom + 24 }]}>
        <Image source={photo} height={imageHeight} />
        <Stack space="lg">
          <Button onPress={sendPicture} leftIcon={<Icon name="paper-plane" size="md" />}>
            {t("wallet.kyc.documentPhoto.send")}
          </Button>
          <Button onPress={resetPicture} variant="outline">
            {t("wallet.kyc.documentPhoto.retry")}
          </Button>
        </Stack>
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

      <Stack space="lg">
        <Button onPress={takePicture} leftIcon={<Icon name="camera" size="md" />}>
          {t("wallet.kyc.documentPhoto.capture")}
        </Button>
        <Button isDisabled={true} variant="outline">
          {t("wallet.kyc.documentPhoto.retry")}
        </Button>
      </Stack>
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
    marginBottom: 24,
  },
})
