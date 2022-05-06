function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function getGenPictures(token: string) {
  return new Promise(async (resolve, reject) => {
    let attempts = 1;

    const fetcher = async () => {
      try {
        const target = `https://colorfield.denis-avakov.ru/genPictures/${token}`;
        const result = await fetch(target).then((response) => response.json());

        if (attempts >= 200) {
          throw new Error('Too many attempts');
        }

        if (result.data) {
          return resolve(result.data);
        }

        attempts = attempts + 1;

        await wait(3000);
        await fetcher();
      } catch (error) {
        reject();
      }
    };

    await fetcher();
  });
}
