import { defaultNS, resources } from "config/i18n"

declare module "react-i18next" {
  // @ts-ignore
  type DefaultResources = typeof resources["en-GB"]
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Resources extends DefaultResources {}
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources["en-GB"]
  }
}
