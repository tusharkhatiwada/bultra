type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never

export type Path<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? // @ts-ignore
    { [K in keyof T]-?: Join<K, Path<T[K], Prev[D]>> }[keyof T]
  : ""

export type TranslationKeys = Path<typeof import("locales/en.json")["translation"]>
