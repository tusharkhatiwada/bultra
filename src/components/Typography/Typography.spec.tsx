import { FontSizeTypes, FontSizes, LineHeights } from "styles/typography"

import { Typography } from "./Typography"
import { render } from "tests/app-tests-utils"

describe("Typography", () => {
  it.each([
    [
      "h1",
      {
        fontSize: FontSizes.h1,
        lineHeight: LineHeights.h1,
        fontFamily: "Canaro-Bold",
      },
    ],
    [
      "h2",
      {
        fontSize: FontSizes.h2,
        lineHeight: LineHeights.h2,
        fontFamily: "Canaro-Bold",
      },
    ],
    [
      "h3",
      {
        fontSize: FontSizes.h3,
        lineHeight: LineHeights.h3,
        fontFamily: "Canaro-Bold",
      },
    ],
    [
      "headline",
      {
        fontSize: FontSizes.headline,
        lineHeight: LineHeights.headline,
        fontFamily: "Canaro-Book",
      },
    ],
    [
      "body",
      {
        fontSize: FontSizes.body,
        lineHeight: LineHeights.body,
        fontFamily: "Canaro-Book",
      },
    ],
    [
      "small",
      {
        fontSize: FontSizes.small,
        lineHeight: LineHeights.small,
        fontFamily: "Canaro-Book",
      },
    ],
    [
      "mini",
      {
        fontSize: FontSizes.mini,
        lineHeight: LineHeights.mini,
        fontFamily: "Canaro-Book",
      },
    ],
  ])("renders the letter avatar %s size", async (value, expected) => {
    const { getByText } = await render(<Typography size={value as FontSizeTypes}>Text</Typography>)

    expect(getByText("Text")).toHaveStyle(expected)
  })
})
