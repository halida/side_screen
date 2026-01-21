import React, { useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'

// 卡片组件
export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 my-4">
      {children}
    </div>
  )
}

// 标签页组件
interface TabItemProps {
  label: string
  children: React.ReactNode
}

export const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)
  const items = React.Children.toArray(children) as React.ReactElement<TabItemProps>[]

  return (
    <div className="my-4">
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors ' +
              (activeTab === index
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600')
            }
          >
            {item.props.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {items[activeTab]?.props.children}
      </div>
    </div>
  )
}

export const TabItem: React.FC<TabItemProps> = ({ children }) => {
  return <>{children}</>
}

// 可折叠组件
export const Collapsible: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="font-semibold text-left">{title}</span>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  )
}

// 折叠面板组件
export const Accordion: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="space-y-2 my-4">
      {children}
    </div>
  )
}

export const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="font-semibold text-left">{title}</span>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900">
          {children}
        </div>
      )}
    </div>
  )
}

// 对比组件
export const Comparison: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const items = React.Children.toArray(children)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {items}
    </div>
  )
}

export const ComparisonItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h4 className="font-bold text-lg mb-4">{title}</h4>
      {children}
    </div>
  )
}

// 提示框组件
type TipBoxType = 'info' | 'warning' | 'success' | 'error'

export const TipBox: React.FC<{ type?: TipBoxType; children: React.ReactNode }> = ({ type = 'info', children }) => {
  const colors = {
    info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
    warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
    success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
    error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
  }

  const icons = {
    info: <Info size={20} />,
    warning: <AlertCircle size={20} />,
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
  }

  const textColors = {
    info: 'text-blue-700 dark:text-blue-300',
    warning: 'text-yellow-700 dark:text-yellow-300',
    success: 'text-green-700 dark:text-green-300',
    error: 'text-red-700 dark:text-red-300',
  }

  return (
    <div className={`border-l-4 ${colors[type]} p-4 rounded-r-lg my-4`}>
      <div className="flex items-start gap-2">
        <div className={textColors[type]}>
          {icons[type]}
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}

// 网格组件
export const Grid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const items = React.Children.toArray(children)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {items}
    </div>
  )
}

export const GridItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {children}
    </div>
  )
}

// 警告/信息组件
export const Alert: React.FC<{ type?: TipBoxType; children: React.ReactNode }> = ({ type = 'info', children }) => {
  return <TipBox type={type}>{children}</TipBox>
}

// 进度条组件
export const Progress: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="space-y-4 my-4">
      {children}
    </div>
  )
}

export const ProgressItem: React.FC<{ title: string; value: number; children: React.ReactNode }> = ({
  title,
  value,
  children,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      {children}
    </div>
  )
}

// 行动召唤组件
export const CallToAction: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-white my-4">
      <h3 className="font-bold text-xl mb-4">{title}</h3>
      {children}
    </div>
  )
}
