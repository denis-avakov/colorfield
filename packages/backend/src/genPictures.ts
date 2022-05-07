import * as fs from 'fs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import paintByNumbers from './paint-by-numbers';

const BASE_URL = 'https://colorfield.denis-avakov.ru';

const createWrapper = (body: string) => {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>

    <body>
      <div class="flex flex-wrap items-center justify-center gap-4 p-4">
        ${body}

        <div class="flex w-full items-center justify-center">
          <span class="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold uppercase tracking-tight text-transparent">Colorfield</span>
        </div>
      </div>
    </body>
  </html>
  `;
};

const createColorUnit = (currentNumber: number, color: string) => {
  return `<div class="flex flex-col items-center space-y-2"><div class="h-20 w-20 bg-[${color}]"></div><span class="text-lg font-medium text-slate-700">${currentNumber}</span></div>`;
};

async function genPictures() {
  const imagePath = process.argv[2];
  const imageName = process.argv[3];
  const colorScheme = process.argv[4];

  console.log('_', imagePath);
  console.log('_', imageName);

  await paintByNumbers(imagePath, imageName, {
    kMeansColorRestrictions: colorScheme,
    maximumNumberOfFacets: 10000
  });

  const guide = await fs.readFileSync(
    path.join(__dirname, `../public/output/${imageName}.json`),
    'utf8'
  );

  const guideData = JSON.parse(guide);

  const colorSchemeHTMLs = guideData.map((value: any, key: number) => {
    return createColorUnit(key, `rgb(${value.color.join(',')})`);
  });

  console.log('Генерация цветов по номерам...');

  try {
    await fs.writeFileSync(
      'public/output/' + imageName + '.html',
      createWrapper(colorSchemeHTMLs.join(''))
    );

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      ignoreDefaultArgs: ['--disable-extensions'],
      slowMo: 100
    });

    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/output/${imageName}.html`);
    await page.screenshot({ path: `public/output/${imageName}-palette.png` });
    await browser.close();
  } catch (error) {
    console.log('puppeteer', error);
  }

  console.log('Генерация цветов по номерам... готова');
  console.log('Все готово!');
}

genPictures();
