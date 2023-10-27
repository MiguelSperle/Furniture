import { useState } from 'react'
import { formatWithMask } from 'react-native-mask-input'

export default function MaskDateExpirationCreditCardInput() {
  const [dateExpirationCard, setDateExpirationCard] = useState<string>('')

  const DATE_MASK = [/[0-9]/, /[0-9]/, '/', /[2-9]/, /[0-9]/] // MM/YY
  const date = new Date()

  const MaskFormatDateExpirationCreditCard = formatWithMask({
    text: dateExpirationCard,
    mask: DATE_MASK,
    obfuscationCharacter: '',
  })

  const currentYear = date.getFullYear()

  const inputYear = dateExpirationCard
    ? parseInt(dateExpirationCard.slice(-2), 10)
    : null

  return {
    setDateExpirationCard,
    MaskFormatDateExpirationCreditCard,
  }
}

// essa lib de mask serve para formatar o input ex: (se tiver q colocar apenas 3 numeros e colocar 4 ela formata para 3)
