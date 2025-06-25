'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, LucideIcon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordPressHeader, WORDPRESS_API_URL } from '@/lib/wordpress';
import AboutUsSubMenu from './AboutUsSubMenu';
import LearningEnvironmentsSubMenu from './LearningEnvironmentsSubMenu';
import SafeImage from '@/components/ui/SafeImage';

interface HeaderProps {
  headerData: WordPressHeader | null;
}

const socialIcons: Record<string, LucideIcon> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function Header({ headerData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutSubMenu, setAboutSubMenu] = useState<any[]>([]);
  const [learningSubMenu, setLearningSubMenu] = useState<any[]>([]);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);

  useEffect(() => {
    async function fetchSubMenus() {
      try {
        // Fetch About Us submenu
        const aboutRes = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/about-submenu?per_page=1`);
        const aboutData = await aboutRes.json();
        if (aboutData && aboutData[0]?.acf?.about_submenu) {
          setAboutSubMenu(aboutData[0].acf.about_submenu);
        }

        // Fetch Learning Environments submenu
        const learningRes = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/learning-submenu?per_page=1`);
        const learningData = await learningRes.json();
        if (learningData && learningData[0]?.acf?.learning_environment_submenu) {
          setLearningSubMenu(learningData[0].acf.learning_environment_submenu);
        }
      } catch (error) {
        console.error('Error fetching submenus:', error);
      }
    }
    fetchSubMenus();
  }, []);

  // Remove About Us and Learning Environments from main menu items
  const mainMenuItems = headerData?.acf.main_menu_items.filter(
    (item) => !['about us', 'learning environments'].includes(item.main_menu_item_name.toLowerCase())
  ) || [];

  // Find Home menu item and the rest
  const homeMenuItem = mainMenuItems.find(
    (item) => item.main_menu_item_name.toLowerCase() === 'home'
  );
  const otherMenuItems = mainMenuItems.filter(
    (item) => item.main_menu_item_name.toLowerCase() !== 'home'
  );

  // Find 125 years celebration link
  const celebrationLink = headerData?.acf.top_bar_menu.find(
    (item) => item.item_name.toLowerCase().includes('125 years')
  );

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="bg-[#9d0101] text-white py-2"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Contact Info - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              {headerData?.acf.top_bar_phone && (
                <a href={`tel:${headerData.acf.top_bar_phone}`} className="flex items-center space-x-1 hover:text-white/80">
                  <Phone className="w-4 h-4" />
                  <span className="text-[12px]">{headerData.acf.top_bar_phone}</span>
                </a>
              )}
              {headerData?.acf.top_bar_email && (
                <a href={`mailto:${headerData.acf.top_bar_email}`} className="flex items-center space-x-1 hover:text-white/80">
                  <Mail className="w-4 h-4" />
                  <span className="text-[12px]">{headerData.acf.top_bar_email}</span>
                </a>
              )}
            </div>

            {/* Mobile: Email, 125 Years Celebration Link & Social Media Icons */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Email Address */}
              {headerData?.acf.top_bar_email && (
                <a href={`mailto:${headerData.acf.top_bar_email}`} className="flex items-center space-x-1 hover:text-white/80">
                  <Mail className="w-3 h-3" />
                  <span className="text-[12px]">{headerData.acf.top_bar_email}</span>
                </a>
              )}
              
              {/* 125 Years Celebration Link */}
              {celebrationLink && (
                <Link
                  href="/125-years"
                  className="text-[12px] hover:text-white/80 transition-colors"
                  prefetch={false}
                >
                  {celebrationLink.item_name}
                </Link>
              )}
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-2">
                {headerData?.acf.social_media_icons.map((social, index) => {
                  const Icon = socialIcons[social.social_media_name.toLowerCase()];
                  return Icon ? (
                    <a
                      key={index}
                      href={social.social_media_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/80 transition-colors"
                    >
                      <Icon className="w-3 h-3" />
                    </a>
                  ) : null;
                })}
              </div>
            </div>

            {/* Desktop: Top Bar Menu & Social Links */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Top Bar Menu */}
              <div className="flex items-center space-x-4">
                {headerData?.acf.top_bar_menu.map((item, index) => {
                  const url = item.item_link.url;
                  // Special handling for 125 years link
                  if (item.item_name.toLowerCase().includes('125 years')) {
                    return (
                      <Link
                        key={index}
                        href="/125-years"
                        className="text-[12px] hover:text-white/80 transition-colors"
                        prefetch={false}
                      >
                        {item.item_name}
                      </Link>
                    );
                  }
                  // Special handling for Parents Resources link
                  if (item.item_name.toLowerCase().includes('parents resources')) {
                    const nextjsUrl = url.replace('https://kal.cse.mybluehost.me', '');
                    return (
                      <Link
                        key={index}
                        href={nextjsUrl}
                        className="text-[12px] hover:text-white/80 transition-colors"
                        prefetch={false}
                      >
                        {item.item_name}
                      </Link>
                    );
                  }
                  // Handle external URLs and special protocols
                  if (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')) {
                    return (
                      <a
                        key={index}
                        href={url}
                        className="text-[12px] hover:text-white/80 transition-colors"
                        target={url.startsWith('http') ? '_blank' : undefined}
                        rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.item_name}
                      </a>
                    );
                  }
                  // Handle internal URLs
                  return (
                    <Link
                      key={index}
                      href={url.replace(/^https?:\/\/[^/]+/, '')}
                      className="text-[12px] hover:text-white/80 transition-colors"
                      prefetch={false}
                    >
                      {item.item_name}
                    </Link>
                  );
                })}
              </div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-3">
                {headerData?.acf.social_media_icons.map((social, index) => {
                  const Icon = socialIcons[social.social_media_name.toLowerCase()];
                  return Icon ? (
                    <a
                      key={index}
                      href={social.social_media_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/80 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.6, -0.05, 0.01, 0.99],
          opacity: { duration: 1.5 }
        }}
        className="bg-white border-b sticky top-0 z-50 md:static"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link href="/" className="block">
                {headerData?.acf.main_logo && (
                  <SafeImage
                    src={headerData.acf.main_logo.url}
                    alt={headerData.acf.main_logo.alt || 'Logo'}
                    width={200}
                    height={60}
                    className="h-12 w-auto"
                  />
                )}
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="hidden md:flex items-center space-x-8"
            >
              {/* Home menu item */}
              {homeMenuItem && (
                <Link
                  href={homeMenuItem.main_menu_item_link.url.replace(/^https?:\/\/[^/]+/, '')}
                  className="text-[#000000] text-sm uppercase hover:text-primary transition-colors"
                  prefetch={false}
                >
                  {homeMenuItem.main_menu_item_name}
                </Link>
              )}
              {/* About Us SubMenu */}
              <AboutUsSubMenu items={aboutSubMenu} />
              {/* Learning Environments SubMenu */}
              <LearningEnvironmentsSubMenu items={learningSubMenu} />
              {/* Other menu items */}
              {otherMenuItems.map((item, index) => {
                const nextHref = item.main_menu_item_link.url.replace(/^https?:\/\/[^/]+/, '');
                if (nextHref.startsWith('mailto:') || nextHref.startsWith('tel:')) {
                  return (
                    <a
                      key={index}
                      href={nextHref}
                      className="text-[#000000] text-sm uppercase hover:text-primary transition-colors"
                    >
                      {item.main_menu_item_name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={index}
                    href={nextHref}
                    className="text-[#000000] text-sm uppercase hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    {item.main_menu_item_name}
                  </Link>
                );
              })}
            </motion.nav>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6 text-[#000000]" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Off-canvas Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-[#9d0101] z-50 md:hidden overflow-y-auto max-h-screen"
            >
              <div className="p-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:text-white/80 text-white transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                <nav className="mt-8 space-y-4">
                  {/* Home menu item */}
                  {homeMenuItem && (
                    <Link
                      href={homeMenuItem.main_menu_item_link.url.replace(/^https?:\/\/[^/]+/, '')}
                      className="block py-2 text-white text-sm uppercase hover:text-white/80 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      prefetch={false}
                    >
                      {homeMenuItem.main_menu_item_name}
                    </Link>
                  )}

                  {/* About Us Submenu (Dropdown) */}
                  {aboutSubMenu.length > 0 && (
                    <div>
                      <button
                        className="flex items-center w-full py-2 text-white text-sm uppercase hover:text-white/80 transition-colors"
                        onClick={() => setAboutOpen((v) => !v)}
                        aria-expanded={aboutOpen}
                      >
                        About Us
                        <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${aboutOpen ? 'rotate-180' : ''} text-white`} />
                      </button>
                      {aboutOpen && aboutSubMenu.map((item, idx) => {
                        const nextHref = item.page_link.url.replace(/^https?:\/\/[^/]+/, '');
                        return (
                          <Link
                            key={idx}
                            href={nextHref}
                            className="block py-2 pl-6 text-white text-xs uppercase hover:text-white/80 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.page_name}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Learning Environments Submenu (Dropdown) */}
                  {learningSubMenu.length > 0 && (
                    <div>
                      <button
                        className="flex items-center w-full py-2 text-white text-sm uppercase hover:text-white/80 transition-colors"
                        onClick={() => setLearningOpen((v) => !v)}
                        aria-expanded={learningOpen}
                      >
                        Learning Environments
                        <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${learningOpen ? 'rotate-180' : ''} text-white`} />
                      </button>
                      {learningOpen && learningSubMenu.map((item, idx) => {
                        const nextHref = item.page_link.url.replace(/^https?:\/\/[^/]+/, '');
                        return (
                          <Link
                            key={idx}
                            href={nextHref}
                            className="block py-2 pl-6 text-white text-xs uppercase hover:text-white/80 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.page_name}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Other main menu items */}
                  {otherMenuItems.map((item, index) => {
                    const nextHref = item.main_menu_item_link.url.replace(/^https?:\/\/[^/]+/, '');
                    if (nextHref.startsWith('mailto:') || nextHref.startsWith('tel:')) {
                      return (
                        <a
                          key={index}
                          href={nextHref}
                          className="block py-2 text-white text-sm uppercase hover:text-white/80 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.main_menu_item_name}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={index}
                        href={nextHref}
                        className="block py-2 text-white text-sm uppercase hover:text-white/80 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                        prefetch={false}
                      >
                        {item.main_menu_item_name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 