import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  onPress?: () => void
}

export default function Button({ onPress, ...props }: ButtonProps) {
  return <TouchableOpacity {...props} onPress={onPress}></TouchableOpacity>
}

// OBS: QUANDO TRABALHAMOS COM EXTENDS DEVEMOS PASSAR {...PROPS}
