'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    try {
      const res = await fetch(`${WORDPRESS_API_URL}/wp-json/custom-contact/v1/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm(initialState);
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" autoComplete="off">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-800 mb-1">NAME</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-transparent border-0 border-b-2 border-red-700 focus:border-red-900 focus:ring-0 px-0 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-800 mb-1">EMAIL ADDRESS</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-transparent border-0 border-b-2 border-red-700 focus:border-red-900 focus:ring-0 px-0 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-800 mb-1">PHONE NUMBER</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(+94)777 123 4567"
            value={form.phone}
            onChange={handleChange}
            required
            className="bg-transparent border-0 border-b-2 border-red-700 focus:border-red-900 focus:ring-0 px-0 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-800 mb-1">SUBJECT</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Purpose of Email"
            value={form.subject}
            onChange={handleChange}
            required
            className="bg-transparent border-0 border-b-2 border-red-700 focus:border-red-900 focus:ring-0 px-0 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex flex-col mt-6 mb-6">
        <label htmlFor="message" className="text-sm font-medium text-gray-800 mb-1">YOUR MESSAGE</label>
        <textarea
          id="message"
          name="message"
          placeholder=""
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="bg-transparent border-0 border-b-2 border-red-700 focus:border-red-900 focus:ring-0 px-0 py-2 text-gray-700 placeholder-gray-400 resize-none"
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-8">
        <button
          type="submit"
          disabled={submitting}
          className="bg-red-700 hover:bg-red-800 text-white font-semibold px-8 py-3 rounded-xl shadow-none uppercase tracking-wide text-base transition-colors duration-200"
        >
          {submitting ? 'Submitting...' : 'Submit Message'}
        </button>
        {status === 'success' && <span className="text-green-700 mt-4 md:mt-0">Thank you! We will get in touch.</span>}
        {status === 'error' && <span className="text-red-700 mt-4 md:mt-0">Submission failed. Please try again.</span>}
      </div>
    </form>
  );
} 