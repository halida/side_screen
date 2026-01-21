import React from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

const Header = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              侧边显示器方案
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="切换主题"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="菜单"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? '亮色' : '暗色'}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
