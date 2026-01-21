import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import mainMd from '../../main.md?raw'
import { ScrollTop } from './ScrollTop'
import { TableOfContents } from './TableOfContents'

const MainContent = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)

      const sections = document.querySelectorAll('h2')
      let current = null

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const tocItems = [
    { id: '选型：选择合适的显示器', text: '选型：选择合适的显示器' },
    { id: '使用方法：搭建显示器和配件', text: '使用方法：搭建显示器和配件' },
    { id: '思考：选购和维护', text: '思考：选购和维护' },
    { id: '进一步扩展：打造更舒适的桌面环境', text: '进一步扩展：打造更舒适的桌面环境' },
    { id: '总结', text: '总结' },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <article className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                h1: ({ ...props }) => (
                  <h1
                    {...props}
                    className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    {...props}
                    id={props.children as string}
                    className="text-2xl font-bold mt-8 mb-4 pb-2 border-b-2 border-gray-200 dark:border-gray-700 scroll-mt-24"
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    {...props}
                    className="text-xl font-semibold mt-6 mb-3"
                  />
                ),
                p: ({ ...props }) => (
                  <p
                    {...props}
                    className="mb-4 leading-relaxed"
                  />
                ),
                ul: ({ ...props }) => (
                  <ul
                    {...props}
                    className="mb-4 ml-6 list-disc"
                  />
                ),
                ol: ({ ...props }) => (
                  <ol
                    {...props}
                    className="mb-4 ml-6 list-decimal"
                  />
                ),
                li: ({ ...props }) => (
                  <li
                    {...props}
                    className="mb-2"
                  />
                ),
                a: ({ ...props }) => (
                  <a
                    {...props}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    {...props}
                    className="border-l-4 border-blue-500 pl-4 py-1 my-6 bg-gray-50 dark:bg-gray-800 italic"
                  />
                ),
                code: ({ ...props }) => {
                  if (props.className?.includes('language-')) {
                    return (
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                        <pre className="text-sm">
                          <code {...props} />
                        </pre>
                      </div>
                    )
                  }
                  return (
                    <code
                      {...props}
                      className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                    />
                  )
                },
                pre: ({ ...props }) => {
                  return (
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                      <pre className="text-sm" {...props} />
                    </div>
                  )
                },
                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-4">
                    <table
                      {...props}
                      className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    />
                  </div>
                ),
                thead: ({ ...props }) => (
                  <thead
                    {...props}
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                ),
                tbody: ({ ...props }) => (
                  <tbody
                    {...props}
                    className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
                  />
                ),
                tr: ({ ...props }) => (
                  <tr
                    {...props}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  />
                ),
                th: ({ ...props }) => (
                  <th
                    {...props}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  />
                ),
                td: ({ ...props }) => (
                  <td
                    {...props}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                  />
                ),
              }}
            >
              {mainMd}
            </ReactMarkdown>
          </article>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-24">
            <TableOfContents
              items={tocItems}
              activeSection={activeSection}
              onNavClick={handleNavClick}
            />
          </div>
        </div>
      </div>

      <ScrollTop show={showScrollTop} />
    </main>
  )
}

export default MainContent
