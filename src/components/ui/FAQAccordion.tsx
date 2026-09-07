import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '../../data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-gray-100">
      {faqs.map((faq) => (
        <div key={faq.id}>
          <button
            className="w-full flex items-start justify-between gap-6 py-5 text-left group"
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            aria-expanded={openId === faq.id}
            aria-controls={`faq-answer-${faq.id}`}
          >
            <span className="font-heading text-lg text-ink group-hover:text-ink transition-colors font-medium leading-snug">
              {faq.question}
            </span>
            <ChevronDown
              size={20}
              className={`text-ink flex-shrink-0 mt-1 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`}
            />
          </button>
          {openId === faq.id && (
            <div
              id={`faq-answer-${faq.id}`}
              className="pb-5 pl-0 pr-8"
            >
              <p className="font-body text-muted text-base leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
