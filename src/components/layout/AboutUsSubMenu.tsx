import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubMenuItem {
  acf_fc_layout: string;
  page_name: string;
  page_link: {
    title: string;
    url: string;
    target?: string;
  };
}

interface AboutUsSubMenuProps {
  items: SubMenuItem[];
}

const AboutUsSubMenu: React.FC<AboutUsSubMenuProps> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  console.log('AboutUsSubMenu items:', items);

  // Close submenu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center gap-2 text-[#000] text-sm uppercase hover:text-primary transition-colors focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        About Us <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-64 bg-[#9d0101] shadow-lg rounded-lg py-2 z-50"
        >
          {items.map((item, index) => {
            const nextHref = item.page_link.url.replace(/^https?:\/\/[^/]+/, '');
            return (
              <Link
                key={index}
                href={nextHref}
                className="block px-4 py-2 text-sm text-white hover:bg-[#b30000] transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.page_name}
              </Link>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default AboutUsSubMenu; 