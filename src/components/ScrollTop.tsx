import React from 'react'
import { ArrowUp } from 'lucide-react'

interface ScrollTopProps {
  show: boolean
}

export const ScrollTop: React.FC<ScrollTopProps> = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!show) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="回到顶部"
    >
      <ArrowUp size={20} />
    </button>
  )
}
