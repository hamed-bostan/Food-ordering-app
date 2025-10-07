import Banner from "@/presentation/components/Banner";
import image1 from "@/assets/images/bannerImages/banner-07.webp";
import AboutDetails from "@/presentation/features/public/about/AboutDetails";
import AboutHighlights from "@/presentation/features/public/about/AboutHighlights";

export default function AboutPage() {
  return (
    <section>
      <Banner imageSrc={image1} text="درباره حامد بیشتر بدانید!" />
      <AboutDetails />
      <AboutHighlights />
    </section>
  );
}
