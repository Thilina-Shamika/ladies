import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

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
        <div className="absolute left-0 mt-2 z-50 min-w-[220px] bg-[#9d0202] text-white rounded-xl shadow-xl py-2 px-2 flex flex-col animate-fade-in">
          {items && items.length > 0 ? (
            items.map((item, idx) => (
              <Link
                key={idx}
                href={item.page_link.url.replace(/^https?:\/\/[^/]+/, '')}
                className="block px-4 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-200 transition-colors text-base font-medium"
                onClick={() => setOpen(false)}
                prefetch={false}
              >
                {item.page_name}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-white">Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutUsSubMenu; 