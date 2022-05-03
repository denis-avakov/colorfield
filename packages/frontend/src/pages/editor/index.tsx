import Layout from 'components/Layout';
import ButtonLink from 'components/ButtonLink';

export default function Editor() {
  return (
    <Layout
      title="Бесплатный онлайн редактор – COLORFIELD"
      className="flex flex-col items-center justify-center"
    >
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
        Готовы приступить?
      </h2>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <ButtonLink href="/editor/free" buttonType="primary-outline" className="w-full sm:w-auto">
          Попробовать бесплатно
        </ButtonLink>

        <span className="font-medium text-zinc-400">или</span>

        <ButtonLink
          href="/editor/login"
          buttonType="primary-outline"
          className="relative w-full sm:w-auto"
        >
          <div className="absolute -top-4 -right-4 rounded-xl bg-zinc-50 px-2">
            <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 bg-clip-text font-[Fraunces] text-xl font-extrabold uppercase text-transparent">
              Premium
            </span>
          </div>

          <span className="uppercase">Войти в Редактор</span>
        </ButtonLink>
      </div>
    </Layout>
  );
}
