import React from 'react';
import Image from 'next/image';
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
}

export default async function AdvanceLevelChoicesPage() {
  const pageData = await getPage('advance-level-choices');
  const acf = (pageData?.acf || {}) as AdvanceLevelChoicesACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-gray-900">
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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* British Advanced Level */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-[#9d0202] mb-8 border-b border-gray-200 pb-2">British Advanced Level</h2>
            {/* Application Form */}
            {acf.application_form_link && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Form</h3>
                <a
                  href={acf.application_form_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9d0202] hover:underline text-base font-medium"
                >
                  Application - British Advanced Level
                </a>
              </div>
            )}
            {/* Prospectus */}
            {(Array.isArray(acf.prospectus) && acf.prospectus.length > 0) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prospectus</h3>
                <ul className="list-none pl-0">
                  {acf.prospectus.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <a
                        href={item.prospectus_link?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9d0202] hover:underline text-base font-medium"
                      >
                        {item.prospectus_title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Result Analysis - British AL */}
            {(Array.isArray(acf.al_result_analysis) && acf.al_result_analysis.length > 0) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Result Analysis</h3>
                <ul className="list-none pl-0">
                  {acf.al_result_analysis.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <a
                        href={item.al_analysis_pdf_file?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9d0202] hover:underline text-base font-medium"
                      >
                        {item.al_analysis_title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Business and Technology Education Council */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-[#9d0202] mb-8 border-b border-gray-200 pb-2">Business and Technology Education Council</h2>
            {/* BTEC Prospectus */}
            {(Array.isArray(acf.btec_prospectus) && acf.btec_prospectus.length > 0) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prospectus</h3>
                <ul className="list-none pl-0">
                  {acf.btec_prospectus.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <a
                        href={item.upload_prospectus_title?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9d0202] hover:underline text-base font-medium"
                      >
                        {item.btec_prospectus_title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Local GCE Advanced Level */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-[#9d0202] mb-8 border-b border-gray-200 pb-2">Local GCE Advanced Level</h2>
            {/* Selection of Subjects */}
            {acf["selection_of_subjects_-_year"] && acf.selection_file?.url && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Selection of Subjects</h3>
                <a
                  href={acf.selection_file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9d0202] hover:underline text-base font-medium"
                >
                  {acf["selection_of_subjects_-_year"]}
                </a>
              </div>
            )}
            {/* Result Analysis - Local AL */}
            {(Array.isArray(acf.local_al_result_analysis) && acf.local_al_result_analysis.length > 0) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Results Analysis</h3>
                <ul className="list-none pl-0">
                  {acf.local_al_result_analysis.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <a
                        href={item.local_al_analysis_file?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9d0202] hover:underline text-base font-medium"
                      >
                        {item.local_al_analysis_title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Vocational Learning */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#9d0202] mb-8 border-b border-gray-200 pb-2">Vocational Learning</h2>
            {acf.vocational_title && acf.vocational_link?.url && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vocational Curriculum</h3>
                <a
                  href={acf.vocational_link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9d0202] hover:underline text-base font-medium"
                >
                  {acf.vocational_title}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 