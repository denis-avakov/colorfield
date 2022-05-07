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

const { fork } = require('child_process');

const BASE_URL = 'https://colorfield.denis-avakov.ru';

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

app.get('/', async (request: any, response: any) => {
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

app.get('/genPictures/:id', async (request: any, response: any) => {
  try {
    const paths = [
      path.join(__dirname, `../public/output/${request.params.id}-preview.jpg`),
      path.join(__dirname, `../public/output/${request.params.id}-palette.png`),
      path.join(__dirname, `../public/output/${request.params.id}-guide-with-colors.png`),
      path.join(__dirname, `../public/output/${request.params.id}-guide-without-colors.svg`)
    ];

    for (const currentPath of paths) {
      const isExist = await fs.existsSync(currentPath);

      if (!isExist) {
        throw new Error('Файлы еще не сгенерированы');
      }
    }

    response.json({
      data: {
        preview: `${BASE_URL}/output/${request.params.id}-preview.jpg`,
        palette: `${BASE_URL}/output/${request.params.id}-palette.png`,
        guideWithColors: `${BASE_URL}/output/${request.params.id}-guide-with-colors.png`,
        guideWithoutColors: `${BASE_URL}/output/${request.params.id}-guide-without-colors.svg`
      }
    });
  } catch (error) {
    return response.json({ data: false });
  }
});

app.post('/upload', upload.single('image'), async (request: any, response: any) => {
  try {
    response.status(200).json({
      token: request.file.filename.replace(/\.[^/.]+$/, '')
    });

    const imagePath = path.join(process.cwd(), request.file.path);
    const imageName = request.file.filename.replace(/\.[^/.]+$/, '');

    const colorScheme = request.body.colorScheme
      ? request.body.colorScheme.split(',').map((color: string) => {
          const rgb = fromHex('#' + color);
          return [rgb!.red, rgb!.green, rgb!.blue];
        })
      : [];

    const genPicturesForked = fork('./src/genPictures.ts', [imagePath, imageName, colorScheme]);

    genPicturesForked.on('close', (code: any) => {
      console.log('child process exited with code ' + code);
    });
  } catch (error) {
    response.status(500).json({ data: 'not ok' });
  }
});

app.use((request, response, next) => {
  response.status(404).json({ data: "Sorry can't find that!" });
});

app.listen(80, () => {
  console.log('🔥 Server ready at: http://127.0.0.1/');
});
