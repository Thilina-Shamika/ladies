"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';
import Link from 'next/link';
import Image from 'next/image';
import { format } from "date-fns";

// Dynamically import Calendar with no SSR
const Calendar = dynamic(() => import('react-calendar'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 rounded-lg animate-pulse" />
});

// Add Value type for react-calendar
type CalendarValue = Date | Date[] | null;

interface EventItem {
  id: number;
  slug: string;
  title: string;
  acf: {
    event_name: string;
    event_start_date: string;
    event_start_time: string;
    event_end_date: string;
    event_end_time: string;
    event_location: string;
    event_description: string;
    event_image?: { url: string };
    event_link?: { url: string; title: string };
  };
}

function parseEventDate(date: string) {
  if (!date) return undefined;
  const [d, m, y] = date.split('/');
  if (!d || !m || !y) return undefined;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

// Helper to get a single Date from CalendarValue
function getSelectedDate(date: CalendarValue): Date {
  if (date instanceof Date) return date;
  if (Array.isArray(date) && date[0] instanceof Date) return date[0];
  return new Date();
}

export default function EventsCalendarAndList() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date());

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/event?acf_format=standard&per_page=100`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  // Prepare a set of event dates for quick lookup
  const eventDatesSet = useMemo(() => {
    return new Set(events.map(ev => parseEventDate(ev.acf.event_start_date)));
  }, [events]);

  // Events for the selected day
  const selectedDayEvents = useMemo(() => {
    const selectedStr = format(getSelectedDate(selectedDate), 'yyyy-MM-dd');
    return events.filter(ev => parseEventDate(ev.acf.event_start_date) === selectedStr);
  }, [events, selectedDate]);

  // Only filter the list below by search and date
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const nameMatch = event.acf.event_name.toLowerCase().includes(search.toLowerCase());
      let dateMatch = true;
      if (dateFilter) {
        const eventDate = parseEventDate(event.acf.event_start_date);
        dateMatch = !!eventDate && eventDate === dateFilter;
      }
      return nameMatch && dateMatch;
    });
  }, [events, search, dateFilter]);

  // Add this new function after the existing useMemo hooks
  const recentPastEvents = useMemo(() => {
    const today = new Date();
    return events
      .filter(event => {
        const eventDate = parseEventDate(event.acf.event_start_date);
        if (!eventDate) return false;
        return new Date(eventDate) < today;
      })
      .sort((a, b) => {
        const dateA = parseEventDate(a.acf.event_start_date);
        const dateB = parseEventDate(b.acf.event_start_date);
        if (!dateA || !dateB) return 0;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      })
      .slice(0, 3);
  }, [events]);

  return (
    <div className="w-full max-w-7xl mt-10 mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Events List (8/12) */}
        <div className="w-full lg:w-8/12">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <input
              type="text"
              placeholder="Search events by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 text-gray-900"
            />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 text-gray-900"
            />
          </div>

          {/* Events List */}
          <div className="flex flex-col gap-6">
            {loading && <div className="text-gray-900">Loading events...</div>}
            {!loading && filteredEvents.length === 0 && <div className="text-gray-900">No events found.</div>}
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="bg-white rounded-xl shadow flex flex-col md:flex-row items-center p-4 gap-4 hover:shadow-lg transition cursor-pointer no-underline"
              >
                {event.acf.event_image?.url && (
                  <div className="w-full md:w-40 h-32 relative rounded-lg overflow-hidden">
                    <Image
                      src={event.acf.event_image.url}
                      alt={event.acf.event_name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-4 text-xs text-gray-700 items-center">
                    <span>📅 {event.acf.event_start_date} {event.acf.event_start_time && `| ${event.acf.event_start_time}`}</span>
                    {event.acf.event_end_date && (
                      <span> - {event.acf.event_end_date} {event.acf.event_end_time && `| ${event.acf.event_end_time}`}</span>
                    )}
                    {event.acf.event_location && <span>📍 {event.acf.event_location}</span>}
                  </div>
                  <div className="font-semibold text-lg md:text-xl text-gray-900">
                    {event.acf.event_name}
                  </div>
                  <div className="text-gray-700 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: event.acf.event_description }} />
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  {event.acf.event_link?.url && (
                    <a
                      href={event.acf.event_link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                      onClick={e => e.stopPropagation()}
                    >
                      {event.acf.event_link.title || 'Read More'}
                    </a>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column - Calendar (4/12) */}
        <div className="w-full lg:w-4/12">
          <div className="bg-white rounded-xl shadow p-4 sticky top-4">
            <Calendar
              onChange={(value) => {
                if (value instanceof Date) {
                  setSelectedDate(value);
                } else if (Array.isArray(value) && value[0] instanceof Date) {
                  setSelectedDate(value[0]);
                }
              }}
              value={getSelectedDate(selectedDate)}
              tileContent={({ date }) => {
                const dateStr = format(date, 'yyyy-MM-dd');
                if (eventDatesSet.has(dateStr)) {
                  return <span className="block w-2 h-2 mx-auto mt-1 rounded-full bg-red-600" />;
                }
                return null;
              }}
            />

            {/* Events for the selected day */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Events on {format(getSelectedDate(selectedDate), 'PPP')}:</h3>
              {selectedDayEvents.length === 0 && <div className="text-gray-700">No events for this day.</div>}
              <div className="flex flex-col gap-4">
                {selectedDayEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition cursor-pointer no-underline"
                  >
                    <div className="font-semibold text-gray-900">{event.acf.event_name}</div>
                    <div className="text-sm text-gray-700">
                      {event.acf.event_start_time && `${event.acf.event_start_time}`}
                      {event.acf.event_location && <span className="block mt-1">📍 {event.acf.event_location}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Past Events */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Past Events</h3>
              <div className="flex flex-col gap-4">
                {recentPastEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition cursor-pointer no-underline"
                  >
                    <div className="flex gap-3">
                      {event.acf.event_image?.url ? (
                        <Image
                          src={event.acf.event_image.url}
                          alt={event.acf.event_name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-2xl">📅</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 line-clamp-1">{event.acf.event_name}</div>
                        <div className="text-sm text-gray-700">
                          <div>{event.acf.event_start_date}</div>
                          {event.acf.event_location && (
                            <div className="text-xs mt-1">📍 {event.acf.event_location}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 