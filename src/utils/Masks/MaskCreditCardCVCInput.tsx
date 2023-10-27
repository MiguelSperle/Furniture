import { useState } from 'react'
import { formatWithMask } from 'react-native-mask-input'

export default function MaskCreditCardCVCInput() {
  const [creditCardCvC, setCreditCardCvC] = useState<string>('')

  const DATE_MASK = [/[0-9]/, /[0-9]/, /[0-9]/] // CVC

  const MaskFormatCreditCardCVC = formatWithMask({
    text: creditCardCvC,
    mask: DATE_MASK,
    obfuscationCharacter: '',
  })

  return {
    setCreditCardCvC,
    MaskFormatCreditCardCVC,
  }
}

// essa lib de mask serve para formatar o input ex: (se tiver q colocar apenas 3 numeros e colocar 4 ela formata para 3)
