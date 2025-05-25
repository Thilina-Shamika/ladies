'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { WordPressHeader } from '@/lib/wordpress';

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

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="bg-[#9d0101] text-white py-2 hidden md:block"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Contact Info */}
            <div className="flex items-center space-x-4">
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

            {/* Top Bar Menu & Social Links */}
            <div className="flex items-center space-x-6">
              {/* Top Bar Menu */}
              <div className="hidden md:flex items-center space-x-4">
                {headerData?.acf.top_bar_menu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.item_link.url}
                    className="text-[12px] hover:text-white/80 transition-colors"
                  >
                    {item.item_name}
                  </Link>
                ))}
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
        className="bg-white border-b"
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
                  <img
                    src={headerData.acf.main_logo.url}
                    alt={headerData.acf.main_logo.alt || 'Logo'}
                    width={headerData.acf.main_logo.width}
                    height={headerData.acf.main_logo.height}
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
              {headerData?.acf.main_menu_items.map((item, index) => (
                <Link
                  key={index}
                  href={item.main_menu_item_link.url}
                  className="text-[#000000] text-sm uppercase hover:text-primary transition-colors"
                >
                  {item.main_menu_item_name}
                </Link>
              ))}
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
              className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 md:hidden"
            >
              <div className="p-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:text-primary transition-colors"
                  >
                    <X className="w-6 h-6 text-[#000000]" />
                  </button>
                </div>

                <nav className="mt-8 space-y-4">
                  {headerData?.acf.main_menu_items.map((item, index) => (
                    <Link
                      key={index}
                      href={item.main_menu_item_link.url}
                      className="block py-2 text-[#000000] text-sm uppercase hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.main_menu_item_name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 