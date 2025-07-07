'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import ChatMessages from './chat-messages';

export default function Chat() {
  return (
    <Accordion
      className="relative z-40 bg-white shadow"
      collapsible
      type="single"
    >
      <AccordionItem value="item-1">
        <div className="fixed right-8 bottom-8 w-80 overflow-hidden rounded-md border border-gray-200 bg-white">
          <div className="flex h-full w-full flex-col">
            <AccordionTrigger className="border-zinc-300 border-b px-6 hover:no-underline">
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex h-80 flex-col">
                <ChatMessages className="flex-1 px-2 py-3" />
                <ChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
