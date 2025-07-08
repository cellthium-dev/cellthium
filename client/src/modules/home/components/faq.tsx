'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'What does cellthium do and what does Cellthium offer?',
    answer: 'Cellthium is a company that provides all in one battery solution.',
  },
  {
    question: 'What are the benefits of using Cellthium',
    answer:
      'Cellthium focuses on sustainability and has many fields experience regarding battery management.',
  },
  {
    question: 'What is the mission and vision of Cellthium?',
    answer: 'Cellthium aims for battery solution that ...',
  },
];

export default function FAQ() {
  return (
    <section className="space-y-4 py-20">
      <h1 className="font-bold text-3xl">
        <span className="text-primary">Frequently Asked</span> Questions
      </h1>

      <Accordion collapsible type="single">
        {faqs.map((faq, index) => {
          return (
            <AccordionItem
              key={`accordion-${faq.question}`}
              value={`index-${index}`}
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="flex justify-center">
        <Button className="mt-4" variant={'secondary'}>
          See all questions
        </Button>
      </div>
    </section>
  );
}
