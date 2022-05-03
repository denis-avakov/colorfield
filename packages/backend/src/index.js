'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var fs = require('fs');
var path = require('path');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var Prisma = require('@prisma/client');
var nodemailer = require('nodemailer');
var from_hex_1 = require('@fantasy-color/from-hex');
var nodeHtmlToImage = require('node-html-to-image');
var paint_by_numbers_1 = require('./paint-by-numbers');
var storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (request, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var app = express();
var prisma = new Prisma.PrismaClient();
var upload = multer({ storage: storage });
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
var createWrapper = function (body) {
  return '\n  <!doctype html>\n  <html>\n    <head>\n      <meta charset="UTF-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1.0">\n      <script src="https://cdn.tailwindcss.com"></script>\n    </head>\n\n    <body>\n      <div class="flex flex-wrap items-center justify-center gap-4 p-4">\n        '.concat(
    body,
    '\n\n        <div class="flex w-full items-center justify-center">\n          <span class="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold uppercase tracking-tight text-transparent">Colorfield</span>\n        </div>\n      </div>\n    </body>\n  </html>\n  '
  );
};
var createColorUnit = function (currentNumber, color) {
  return '<div class="flex flex-col items-center space-y-2"><div class="h-20 w-20 bg-['
    .concat(color, ']"></div><span class="text-lg font-medium text-slate-700">')
    .concat(currentNumber, '</span></div>');
};
app.get('/', function (request, response) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
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
      return [2 /*return*/];
    });
  });
});
app.get('/users', function (request, response) {
  return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, prisma.user.findMany()];
        case 1:
          users = _a.sent();
          response.json({ data: users });
          return [2 /*return*/];
      }
    });
  });
});
app.get('/orders', function (request, response) {
  return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, prisma.order.findMany()];
        case 1:
          orders = _a.sent();
          response.json({ data: orders });
          return [2 /*return*/];
      }
    });
  });
});
app.get('/nodemailer', function (request, response) {
  return __awaiter(void 0, void 0, void 0, function () {
    var testAccount, transporter, info;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, nodemailer.createTestAccount()];
        case 1:
          testAccount = _a.sent();
          transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass
            }
          });
          return [
            4 /*yield*/,
            transporter.sendMail({
              from: '"Fred Foo 👻" <foo@example.com>',
              to: 'bar@example.com',
              subject: 'Hello ✔',
              text: 'Hello world?',
              html: '<b>Hello world?</b>'
            })
          ];
        case 2:
          info = _a.sent();
          response.json({
            data: {
              messageId: info.messageId,
              previewUrl: nodemailer.getTestMessageUrl(info)
            }
          });
          return [2 /*return*/];
      }
    });
  });
});
app.post('/upload', upload.single('image'), function (request, response) {
  return __awaiter(void 0, void 0, void 0, function () {
    var imagePath, imageName, colorScheme, guide, guideData, colorSchemeHTMLs, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 4, , 5]);
          imagePath = path.join(process.cwd(), request.file.path);
          imageName = request.file.filename.replace(/\.[^/.]+$/, '');
          colorScheme = request.body.colorScheme
            ? request.body.colorScheme.split(',').map(function (color) {
                var rgb = (0, from_hex_1.default)('#' + color);
                return [rgb.red, rgb.green, rgb.blue];
              })
            : [];
          return [
            4 /*yield*/,
            (0, paint_by_numbers_1.default)(imagePath, imageName, {
              kMeansColorRestrictions: colorScheme,
              maximumNumberOfFacets: 10000
            })
          ];
        case 1:
          _a.sent();
          return [
            4 /*yield*/,
            fs.readFileSync(
              path.join(__dirname, '../public/output/'.concat(imageName, '.json')),
              'utf8'
            )
          ];
        case 2:
          guide = _a.sent();
          guideData = JSON.parse(guide);
          colorSchemeHTMLs = guideData.map(function (value, key) {
            return createColorUnit(key, 'rgb('.concat(value.color.join(','), ')'));
          });
          return [
            4 /*yield*/,
            nodeHtmlToImage({
              output: './public/output/'.concat(imageName, '-guide.png'),
              html: createWrapper(colorSchemeHTMLs.join(''))
            })
          ];
        case 3:
          _a.sent();
          return [
            2 /*return*/,
            response.json({
              preview: 'http://84.38.180.139:8080/output/'.concat(imageName, '-preview.jpg'),
              guide: 'http://84.38.180.139:8080/output/'.concat(imageName, '-guide.png'),
              withColors: 'http://84.38.180.139:8080/output/'.concat(imageName, '-with-colors.png'),
              withBorders: 'http://84.38.180.139:8080/output/'.concat(
                imageName,
                '-with-borders.svg'
              )
            })
          ];
        case 4:
          error_1 = _a.sent();
          response.send('not ok', { code: 500 });
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
});
app.use(function (request, response, next) {
  response.status(404).json({ data: "Sorry can't find that!" });
});
app.listen(8080, function () {
  console.log('🔥 Server ready at: http://84.38.180.139:8080/');
});
//# sourceMappingURL=index.js.map
