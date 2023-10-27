import { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'
import { useGetProducts } from './useGetProducts'

export function useAppState() {
  const appState = useRef(AppState.currentState)
  const [appStateValue, setAppStateValue] = useState(appState.current)

  const { refetch } = useGetProducts()

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        return refetch()
      }

      appState.current = nextAppState
      setAppStateValue(appState.current)
      return console.log('JA VOLTO')
    })

    return () => {
      subscription.remove()
    }
  }, [])
}
