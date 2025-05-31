import { useEffect } from 'react'

const useUpdateTheme = (theme: 'dark' | 'light') => {
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])
}

export default useUpdateTheme
