import Layout from 'components/Layout';
import ButtonLink from 'components/ButtonLink';

export default function NotFound() {
  return (
    <Layout
      title="404 – COLORFIELD"
      className="flex flex-col items-center justify-center space-y-6"
    >
      <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
        404 – СТРАНИЦА НЕ НАЙДЕНА
      </h1>

      <ButtonLink href="/" buttonType="primary-outline">
        Вернуться на главную
      </ButtonLink>
    </Layout>
  );
}
