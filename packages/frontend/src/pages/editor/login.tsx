import { useState, useEffect, useCallback } from 'react';
import NumberFormat from 'react-number-format';

import useUser from 'hooks/useUser';
import classNames from 'utils/classNames';
import Layout from 'components/Layout';
import Spinner from 'components/Spinner';

export default function EditorLogin() {
  const { mutateUser } = useUser({
    redirectTo: '/editor/pro',
    redirectIfFound: true
  });

  const [accessCode, setAccessCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!accessCode) {
      setErrorMessage('Введите код доступа');
      return;
    }

    if (accessCode.length !== 6) {
      setErrorMessage('Введите полный код доступа');
      return;
    }

    doLogin();
  };

  const doLogin = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await mutateUser(
        fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessCode })
        }).then((response) => response.json()),
        false
      );

      console.log('!!', result);

      if (!result?.isLoggedIn) {
        setIsLoading(false);
        setErrorMessage('Код не подходит');
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage('Код не подходит');
      console.error('An unexpected error happened:', error);
    }
  }, [accessCode, mutateUser]);

  useEffect(() => {
    if (accessCode.length === 6) {
      doLogin();
    }
  }, [accessCode, doLogin]);

  return (
    <Layout
      title="PRO онлайн редактор – COLORFIELD"
      className="flex flex-col items-center justify-center"
    >
      {isLoading && <Spinner className="mb-4" />}

      <div className={classNames(isLoading && 'pointer-events-none opacity-25')}>
        <p className="max-w-lg text-center text-lg font-medium">
          Введи шестизначный код из инструкции к набору
        </p>

        {errorMessage && <p className="mt-2 text-center text-red-400">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="flex justify-center">
          <NumberFormat
            type="text"
            value={accessCode}
            onChange={(event: any) => {
              setAccessCode(event.target.value.replace(/[^0-9]/g, ''));
              setErrorMessage('');
            }}
            className={classNames(
              'mt-4 block w-full max-w-lg rounded-md border border-gray-300 px-8 py-2 text-center text-3xl font-semibold uppercase shadow-sm placeholder:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-5xl',
              errorMessage.length > 0 && 'border-2 border-red-400'
            )}
            placeholder="XXX-XXX"
            format="###-###"
            mask="X"
          />
        </form>
      </div>
    </Layout>
  );
}
