import { getHomePage } from '@/lib/wordpress';
import { HomeSlider } from '@/components/home/HomeSlider';
import { PrincipalMessage } from '@/components/home/PrincipalMessage';

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <main>
      {homePage?.acf.home_slider && (
        <HomeSlider slides={homePage.acf.home_slider} />
      )}
      {homePage?.acf.principal && (
        <PrincipalMessage
          image={homePage.acf.principal}
          name={homePage.acf.principals_name}
          designation={homePage.acf.designation_or_qualifications}
          subheading={homePage.acf.principals_message_subheading}
          heading={homePage.acf.principals_message_heading}
          message={homePage.acf.principals_message}
          buttonText={homePage.acf.principals_section_button_text}
          buttonLink={homePage.acf.principals_section_button_link}
          anniversaryImage={homePage.acf["125_years"]}
        />
      )}
    </main>
  );
}
