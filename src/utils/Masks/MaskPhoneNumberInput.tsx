import { useState } from 'react'
import { Masks, formatWithMask } from 'react-native-mask-input'

export default function MaskPhoneNumberInput() {
  const [phoneNumberPersonal, setPhoneNumberPersonal] = useState<string>('')

  const MaskFormatPhoneNumber = formatWithMask({
    text: phoneNumberPersonal,
    mask: Masks.BRL_PHONE,
    obfuscationCharacter: '',
  })

  return {
    MaskFormatPhoneNumber,
    setPhoneNumberPersonal,
  }
}

// essa lib de mask serve para formatar o input ex: (se tiver q colocar apenas 3 numeros e colocar 4 ela formata para 3)
