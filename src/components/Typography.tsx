import { Text, TextProps } from 'react-native'

interface TypographyProps extends TextProps {
  text: string | number
  size: number
  color: string
  onPress?: () => void
}

export default function Typography({
  text,
  color,
  size,
  onPress,
  ...props
}: TypographyProps) {
  return (
    <Text
      style={{
        ...(props.style as object),
        color,
        fontSize: size,
      }}
      onPress={onPress}
    >
      {text}
    </Text>
  )
}
