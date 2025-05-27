import { getHomePage } from '@/lib/wordpress';
import { HomeSlider } from '@/components/home/HomeSlider';
import { PrincipalMessage } from '@/components/home/PrincipalMessage';
import NewsEvents from '@/components/home/NewsEvents';
import AboutUs from '@/components/home/AboutUs';

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <main>
      {homePage?.acf.home_slider && (
        <HomeSlider slides={homePage.acf.home_slider} />
      )}
      <NewsEvents />
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
      <AboutUs
        subheading={homePage?.acf.about_us_subhaeding}
        heading={homePage?.acf.about_heading}
        description={homePage?.acf.about_description}
        buttonText={homePage?.acf.about_button_text}
        buttonLink={homePage?.acf.about_button_link?.url}
        imageUrl={homePage?.acf.about_image?.url}
        imageAlt={homePage?.acf.about_image?.alt}
        image2Url={homePage?.acf.about_image2?.url}
        image2Alt={homePage?.acf.about_image2?.alt}
        backgroundImageUrl={homePage?.acf.about_background_image?.url}
      />
    </main>
  );
}
