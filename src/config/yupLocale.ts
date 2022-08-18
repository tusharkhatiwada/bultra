import * as y from "yup"

import { TOptions } from "i18next"

y.setLocale({
  mixed: {
    default: (attrs: TOptions) => ({
      key: "validations.mixed.default",
      attrs,
    }),
    required: (attrs: TOptions) => ({
      key: "validations.mixed.required",
      attrs,
    }),
    oneOf: (attrs: TOptions) => ({
      key: "validations.mixed.oneOf",
      attrs,
    }),
    notOneOf: (attrs: TOptions) => ({
      key: "validations.mixed.notOneOf",
      attrs,
    }),
    defined: (attrs: TOptions) => ({
      key: "validations.mixed.defined",
      attrs,
    }),
  },
  string: {
    length: (attrs: TOptions) => ({
      key: "validations.string.length",
      attrs,
    }),
    min: (attrs: TOptions) => ({ key: "validations.string.min", attrs }),
    max: (attrs: TOptions) => ({ key: "validations.string.max", attrs }),
    matches: (attrs: TOptions) => ({
      key: "validations.string.matches",
      attrs,
    }),
    email: (attrs: TOptions) => ({
      key: "validations.string.email",
      attrs,
    }),
    url: (attrs: TOptions) => ({ key: "validations.string.url", attrs }),
    uuid: (attrs: TOptions) => ({
      key: "validations.string.uuid",
      attrs,
    }),
    trim: (attrs: TOptions) => ({
      key: "validations.string.trim",
      attrs,
    }),
    lowercase: (attrs: TOptions) => ({
      key: "validations.string.lowercase",
      attrs,
    }),
    uppercase: (attrs: TOptions) => ({
      key: "validations.string.uppercase",
      attrs,
    }),
  },
  number: {
    min: (attrs: TOptions) => ({ key: "validations.number.min", attrs }),
    max: (attrs: TOptions) => ({ key: "validations.number.max", attrs }),
    lessThan: (attrs: TOptions) => ({
      key: "validations.number.lessThan",
      attrs,
    }),
    moreThan: (attrs: TOptions) => ({
      key: "validations.number.moreThan",
      attrs,
    }),
    positive: (attrs: TOptions) => ({
      key: "validations.number.positive",
      attrs,
    }),
    negative: (attrs: TOptions) => ({
      key: "validations.number.negative",
      attrs,
    }),
    integer: (attrs: TOptions) => ({
      key: "validations.number.integer",
      attrs,
    }),
  },
  date: {
    min: (attrs: TOptions) => ({ key: "validations.date.min", attrs }),
    max: (attrs: TOptions) => ({ key: "validations.date.max", attrs }),
  },
  boolean: {},
  object: {},
  array: {},
})
