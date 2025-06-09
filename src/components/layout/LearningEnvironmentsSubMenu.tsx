import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubMenuItem {
  acf_fc_layout: string;
  page_name: string;
  page_link: {
    title: string;
    url: string;
    target: string;
  };
}

interface LearningEnvironmentsSubMenuProps {
  items: SubMenuItem[];
}

export default function LearningEnvironmentsSubMenu({ items }: LearningEnvironmentsSubMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-[#000000] text-sm uppercase hover:text-primary transition-colors"
      >
        Learning Environments
        <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-[28rem] min-w-[20rem] bg-[#9d0101] shadow-lg rounded-lg py-2 z-50"
          >
            <div className="grid grid-cols-2 gap-x-2">
              {items.map((item, index) => {
                const nextHref = item.page_link.url.replace(/^https?:\/\/[^/]+/, '');
                return (
                  <Link
                    key={index}
                    href={nextHref}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#b30000] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.page_name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 