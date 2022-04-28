import Layout from 'components/Layout';
import HeroSection from 'components/LandingPage/HeroSection';
import VideoGuide from 'components/LandingPage/VideoGuide';
import CatalogPreview from 'components/LandingPage/CatalogPreview';

export default function Home() {
  return (
    <Layout className="space-y-14 lg:space-y-20 lg:pt-20">
      <HeroSection className="lg:-top-6 lg:scale-110" />
      <VideoGuide />
      <CatalogPreview />
    </Layout>
  );
}
