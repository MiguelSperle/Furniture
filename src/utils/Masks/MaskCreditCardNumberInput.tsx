import { useState } from 'react'
import { Masks, formatWithMask } from 'react-native-mask-input'

export default function MaskCreditCardInput() {
  const [creditCardNumber, setCreditCardNumber] = useState<string>('')

  const MaskFormatCreditCardNumber = formatWithMask({
    text: creditCardNumber,
    mask: Masks.CREDIT_CARD,
    obfuscationCharacter: '',
  })

  return {
    setCreditCardNumber,
    MaskFormatCreditCardNumber,
  }
}

// essa lib de mask serve para formatar o input ex: (se tiver q colocar apenas 3 numeros e colocar 4 ela formata para 3)
