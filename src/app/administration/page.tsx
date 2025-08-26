import React from 'react';
import ForceNativeImage from '@/components/ui/ForceNativeImage';
import { getPage } from '@/lib/wordpress';

interface AdminACF {
  sub_heading?: string;
  heading?: string;
  cover?: { url: string; alt: string };
  content_sub_heading?: string;
  content_heading?: string;
  principals_image?: { url: string; alt: string };
  principals_name?: string;
  vice_principals_image?: { url: string; alt: string };
  vice_principals_name?: string;
  "1st_paragraph"?: string;
  sectional_heads?: Array<{
    acf_fc_layout: string;
    teacher_image?: { url: string; alt: string };
    teacher_name?: string;
    section?: string;
  }>;
  prefects_year?: string;
  prefects_image?: { url: string; alt: string };
  seated_row?: string;
  standing_first_row?: string;
  standing_second_row?: string;
}

export default async function AdministrationPage() {
  const pageData = await getPage('administration');
  const acf = (pageData?.acf || {}) as AdminACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      {acf.cover?.url && (
        <section className="relative min-h-[40vh] flex items-center justify-center bg-gray-900">
          <div className="absolute inset-0 w-full h-full z-0">
            <ForceNativeImage
              src={acf.cover.url}
              alt={acf.cover.alt || acf.heading || 'Administration'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
            {acf.sub_heading && (
              <div className="text-white text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase drop-shadow">
                {acf.sub_heading}
              </div>
            )}
            {acf.heading && (
              <h1 className="text-3xl md:text-6xl text-white mb-4 drop-shadow-lg">
                {acf.heading}
              </h1>
            )}
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            {acf.content_sub_heading && (
              <div className="text-[#9d0202] text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase">
                {acf.content_sub_heading}
              </div>
            )}
            {acf.content_heading && (
              <h2 className="text-2xl md:text-3xl text-gray-900 mb-8">
                {acf.content_heading}
              </h2>
            )}
          </div>

          {/* Principal & Vice Principal */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 items-start mb-16">
            {/* Principal */}
            <div className="flex flex-col items-center h-full">
              {acf.principals_image?.url && (
                <div className="rounded-xl overflow-hidden shadow-xl mb-4" style={{ width: 320, height: 400 }}>
                  <ForceNativeImage
                    src={acf.principals_image.url}
                    alt={acf.principals_image.alt || acf.principals_name || 'Principal'}
                    width={320}
                    height={400}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              {acf.principals_name && (
                <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                  {acf.principals_name}
                </h3>
              )}
              <div className="text-[#9d0202] text-sm font-semibold text-center">The Principal</div>
            </div>
            {/* Vice Principal */}
            <div className="flex flex-col items-center h-full">
              {acf.vice_principals_image?.url && (
                <div className="rounded-xl overflow-hidden shadow-xl mb-4" style={{ width: 320, height: 400 }}>
                  <ForceNativeImage
                    src={acf.vice_principals_image.url}
                    alt={acf.vice_principals_image.alt || acf.vice_principals_name || 'Vice Principal'}
                    width={320}
                    height={400}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              {acf.vice_principals_name && (
                <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                  {acf.vice_principals_name}
                </h3>
              )}
              <div className="text-[#9d0202] text-sm font-semibold text-center">The Vice Principal</div>
            </div>
          </div>

          {/* Sectional Heads */}
          <h2 className="text-2xl md:text-3xl text-[#9d0202] font-bold text-center mb-8">Sectional Heads</h2>
          {acf["1st_paragraph"] && (
            <div className="max-w-4xl mx-auto mb-8 wysiwyg-content text-center">
              <div dangerouslySetInnerHTML={{ __html: acf["1st_paragraph"] }} />
            </div>
          )}
          {acf.sectional_heads && acf.sectional_heads.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
              {acf.sectional_heads.map((head, idx) => (
                <div key={idx} className="w-full h-full flex flex-col items-center bg-white rounded-xl shadow p-6">
                  {head.teacher_image?.url && (
                    <div className="w-full h-56 mb-4 rounded-lg overflow-hidden relative">
                      <ForceNativeImage
                        src={head.teacher_image.url}
                        alt={head.teacher_image.alt || head.teacher_name || 'Sectional Head'}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="text-lg font-semibold text-gray-900 mb-1 text-center">{head.teacher_name}</div>
                  <div className="text-[#9d0202] text-sm font-semibold text-center">{head.section}</div>
                </div>
              ))}
            </div>
          )}

          {/* Prefects Section */}
          {acf.prefects_year && (
            <h2 className="text-2xl md:text-3xl text-[#9d0202] font-bold text-center mb-8">{acf.prefects_year}</h2>
          )}
          {acf.prefects_image?.url && (
            <div className="flex justify-center mb-8">
              <div className="rounded-xl overflow-hidden shadow-xl w-full max-w-2xl">
                <ForceNativeImage
                  src={acf.prefects_image.url}
                  alt={acf.prefects_image.alt || 'Prefects'}
                  width={800}
                  height={533}
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            </div>
          )}
          <div className="max-w-3xl mx-auto">
            {acf.seated_row && (
              <>
                <div className="text-[#9d0202] text-lg font-semibold mb-1">Seated</div>
                <div className="wysiwyg-content mb-4" dangerouslySetInnerHTML={{ __html: acf.seated_row }} />
              </>
            )}
            {acf.standing_first_row && (
              <>
                <div className="text-[#9d0202] text-lg font-semibold mb-1">Standing 1st Row</div>
                <div className="wysiwyg-content mb-4" dangerouslySetInnerHTML={{ __html: acf.standing_first_row }} />
              </>
            )}
            {acf.standing_second_row && (
              <>
                <div className="text-[#9d0202] text-lg font-semibold mb-1">Standing 2nd Row</div>
                <div className="wysiwyg-content mb-4" dangerouslySetInnerHTML={{ __html: acf.standing_second_row }} />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 