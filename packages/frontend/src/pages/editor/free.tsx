import Layout from 'components/Layout';
import ImageCrop from 'components/ImageCrop';

export default function EditorFree() {
  return (
    <Layout
      title="Пробная версия онлайн редактора – COLORFIELD"
      className="flex flex-col justify-center space-y-8"
    >
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
        Пробная версия
      </h2>

      <ImageCrop />
    </Layout>
  );
}
