import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPage } from '@/lib/wordpress';

interface PDFFile {
  url: string;
  title?: string;
}

interface ALResultAnalysis {
  acf_fc_layout: string;
  al_analysis_title: string;
  al_analysis_pdf_file: PDFFile;
}

interface LocalALResultAnalysis {
  acf_fc_layout: string;
  local_al_analysis_title: string;
  local_al_analysis_file: PDFFile;
}

interface Prospectus {
  acf_fc_layout: string;
  prospectus_title: string;
  prospectus_link: PDFFile;
}

interface BTECProspectus {
  acf_fc_layout: string;
  btec_prospectus_title: string;
  upload_prospectus_title: PDFFile;
}

interface AdvanceLevelChoicesACF {
  sub_heading?: string;
  heading?: string;
  cover?: {
    url: string;
    alt?: string;
  };
  application_link?: string;
  application_form_link?: string;
  "selection_of_subjects_-_year"?: string;
  selection_file?: PDFFile;
  prospectus?: Prospectus[];
  btec_prospectus?: BTECProspectus[];
  al_result_analysis?: ALResultAnalysis[];
  local_al_result_analysis?: LocalALResultAnalysis[];
  vocational_title?: string;
  vocational_link?: PDFFile;
  "1st_paragraph"?: string;
  al_choices?: PDFFile;
  local_ol_choices?: PDFFile;
}

export default async function AdvanceLevelChoicesPage() {
  const pageData = await getPage('advance-level-choices');
  const acf = (pageData?.acf || {}) as AdvanceLevelChoicesACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover?.url && (
            <Image
              src={acf.cover.url}
              alt={acf.cover.alt || acf.heading || 'Advance Level Choices'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 w-full">
          <div className="text-white text-sm md:text-base font-semibold mb-4 tracking-widest uppercase drop-shadow">
            {acf.sub_heading ?? ''}
          </div>
          <h1 className="text-4xl md:text-7xl text-white mb-8 drop-shadow-lg font-light">
            {acf.heading ?? ''}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* First Paragraph */}
          {acf["1st_paragraph"] && (
            <div className="max-w-4xl mx-auto mb-16">
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                dangerouslySetInnerHTML={{ __html: acf["1st_paragraph"] }}
              />
            </div>
          )}

          {/* Advance Level Choices Heading */}
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl text-[#9d0202] font-bold text-center mb-8">Advance Level Choices</h2>
          </div>

          {/* AL Choices PDF Button */}
          {(acf.al_choices?.url || acf.local_ol_choices?.url) && (
            <div className="max-w-4xl mx-auto mb-8 flex flex-wrap justify-center gap-4">
              {acf.al_choices?.url && (
                <Link
                  href={acf.al_choices.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#9d0202] hover:bg-[#7a0101] text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
                >
                  British A/L Options
                </Link>
              )}
              {acf.local_ol_choices?.url && (
                <Link
                  href={acf.local_ol_choices.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#9d0202] hover:bg-[#7a0101] text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
                >
                  Local A/L Options
                </Link>
              )}
            </div>
          )}

          {/* Application Link Button */}
          {acf.application_link && (
            <div className="max-w-4xl mx-auto mb-16 flex justify-center">
              <Link
                href={acf.application_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#9d0202] hover:bg-[#7a0101] text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 