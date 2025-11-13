import themeData from "./theme.json"

export const theme = themeData

// Color helpers
export const colors = theme.colors
export const getColor = (path: string) => {
  const keys = path.split(".")
  let value: any = colors
  for (const key of keys) {
    value = value?.[key]
  }
  return value
}

// Typography helpers
export const typography = theme.typography
export const spacing = theme.spacing
export const borderRadius = theme.borderRadius
export const shadows = theme.shadows
export const zIndex = theme.zIndex

// Component styles
export const buttonStyles = theme.components.button
export const cardStyles = theme.components.card
export const inputStyles = theme.components.input
