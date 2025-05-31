import { useContext } from 'react'
import { EngineContext, EngineContextProps } from '../EngineContext'

export const useEngineContext = (): EngineContextProps => {
  const context = useContext(EngineContext)
  if (!context) {
    throw new Error('useEngineContext must be used within an EngineProvider')
  }
  return context
}
