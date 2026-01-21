import React from 'react'
import { ChevronRight } from 'lucide-react'

interface TocItem {
  id: string
  text: string
}

interface TableOfContentsProps {
  items: TocItem[]
  activeSection: string | null
  onNavClick: (id: string) => void
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeSection,
  onNavClick,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">目录导航</h3>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavClick(item.id)}
                className={
                  'flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-all duration-200 w-full text-left ' +
                  (activeSection === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700')
                }
              >
                <ChevronRight size={16} className="flex-shrink-0" />
                <span className="truncate">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
