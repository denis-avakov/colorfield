import Layout from 'components/Layout';

export default function EditorLogin() {
  return (
    <Layout
      title="PRO онлайн редактор – COLORFIELD"
      className="flex flex-col items-center justify-center"
    >
      <p className="max-w-lg text-center text-lg font-medium">
        Введи шестизначный код из инструкции к набору. Если у тебя их несколько, то введи код одного
        из на
      </p>

      <input
        type="text"
        id="asfasf"
        maxLength={7}
        className="mt-4 block w-full max-w-lg rounded-md border-gray-300 px-8 py-2 text-center text-3xl font-semibold uppercase shadow-sm placeholder:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-5xl"
        placeholder="XXX-XXX"
      />
    </Layout>
  );
}
