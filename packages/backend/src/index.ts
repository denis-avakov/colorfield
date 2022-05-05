import * as fs from 'fs';
import * as path from 'path';

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';

import * as Prisma from '@prisma/client';
import * as nodemailer from 'nodemailer';

import fromHex from '@fantasy-color/from-hex';
import * as io from '@pm2/io';
const nodeHtmlToImage = require('node-html-to-image');

import paintByNumbers from './paint-by-numbers';

io.init({
  catchExceptions: true,
  metrics: {
    network: true,
    http: true
  },
  tracing: {
    enabled: true
  }
});

var storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (request, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const app = express();
const prisma = new Prisma.PrismaClient();
const upload = multer({ storage });

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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

app.get('/', async (request: any, response: any) => {
  // await prisma.order.create({
  //   data: {
  //     access_code: '000000',
  //     title: 'test',
  //     body: 'test',
  //     buyer: {
  //       connect: {
  //         id: '627037fb5ad1a9bb27019a27'
  //       }
  //     }
  //   }
  // });

  response.json({ data: 'Hi...' });
});

app.get('/users', async (request: any, response: any) => {
  const users = await prisma.user.findMany();
  response.json({ data: users });
});

app.get('/orders', async (request: any, response: any) => {
  const orders = await prisma.order.findMany();
  response.json({ data: orders });
});

app.get('/nodemailer', async (request: any, response: any) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: 'bar@example.com',
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
  });

  response.json({
    data: {
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    }
  });
});

app.post('/upload', upload.single('image'), async (request: any, response: any) => {
  try {
    const imagePath = path.join(process.cwd(), request.file.path);
    const imageName = request.file.filename.replace(/\.[^/.]+$/, '');

    const colorScheme = request.body.colorScheme
      ? request.body.colorScheme.split(',').map((color: string) => {
          const rgb = fromHex('#' + color);
          return [rgb!.red, rgb!.green, rgb!.blue];
        })
      : [];

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

    console.log('path1', path.join(__dirname, `../public/output/${imageName}.json`));
    console.log('path2', path.join(__dirname, `../public/output/${imageName}-guide.png`));

    // await nodeHtmlToImage({
    //   output: path.join(__dirname, `../public/output/${imageName}-guide.png`),
    //   html: createWrapper(colorSchemeHTMLs.join(''))
    // });

    return response.status(200).json({
      preview: `http://84.38.180.139:8080/output/${imageName}-preview.jpg`,
      guide: `http://84.38.180.139:8080/output/${imageName}-guide.png`,
      withColors: `http://84.38.180.139:8080/output/${imageName}-with-colors.png`,
      withBorders: `http://84.38.180.139:8080/output/${imageName}-with-borders.svg`
    });
  } catch (error) {
    response.status(500).json({ data: 'not ok' });
  }
});

app.use((request, response, next) => {
  response.status(404).json({ data: "Sorry can't find that!" });
});

app.listen(8080, () => {
  console.log('🔥 Server ready at: http://84.38.180.139:8080/');
});
