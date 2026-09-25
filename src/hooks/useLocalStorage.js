import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key)

      if (savedValue) {
        return JSON.parse(savedValue)
      }

      return initialValue
    } catch (error) {
      console.error('Could not read LocalStorage:', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Could not save to LocalStorage:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}