import Layout from 'components/Layout';
import Logotype from 'components/Header/Logotype';
import BlurImage from 'components/BlurImage';
import ButtonLink from 'components/ButtonLink';

export default function Editor() {
  return (
    <Layout
      title="Бесплатный онлайн редактор – COLORFIELD"
      className="flex flex-col items-center justify-start"
    >
      <Logotype className="scale-150" />

      <div className="mt-4 mb-16 flex w-full">
        <div className="rotate-3">
          <div className="relative h-96 w-96 drop-shadow-md">
            <BlurImage
              src="/static/images/LandingPage/HeroSection/02.jpg"
              alt="Alternative text for image"
            />
          </div>
        </div>

        <div className="rotate-6">
          <div className="relative z-[1] -ml-10 h-96 w-96 border-2 border-white border-opacity-10 drop-shadow-2xl">
            <BlurImage
              src="/static/images/LandingPage/HeroSection/03.jpg"
              alt="Alternative text for image"
            />
          </div>
        </div>

        <div className="relative -ml-20 h-96 w-96 rotate-12 drop-shadow-lg">
          <BlurImage
            src="/static/images/LandingPage/HeroSection/07.jpg"
            alt="Alternative text for image"
          />
        </div>
      </div>

      <div className="flex w-full justify-between">
        <ButtonLink href="/editor-free-trial">Попробовать бесплатно</ButtonLink>
        <ButtonLink href="/editor-login" className="scale-125">
          PRO версия
        </ButtonLink>
        <ButtonLink href="/products">Купить</ButtonLink>
      </div>
    </Layout>
  );
}
