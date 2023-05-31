import * as Crypto from "expo-crypto"
import { Buffer } from "buffer"

export const hashedPassword = async (password: string, salt: string) => {
  const stringBuffer = Buffer.from(password, "utf-8")
  const saltBuffer = Buffer.from(salt, "utf-8")

  const data = Buffer.concat([stringBuffer, saltBuffer])

  const hashedData = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    data.toString("base64"),
  )
  return hashedData
}
