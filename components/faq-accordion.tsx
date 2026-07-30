'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FaqItem = {
  question: string
  answer: React.ReactNode
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={item.question}
            className="rounded-2xl bg-white border border-[oklch(0.92_0.008_144)] overflow-hidden transition-shadow duration-300 hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                style={{ color: 'oklch(0.653 0.157 144)' }}
                aria-hidden="true"
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-sm md:text-base text-gray-500 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
