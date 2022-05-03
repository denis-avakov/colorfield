import type { IronSessionOptions } from 'iron-session';
import type { User } from 'pages/api/user';

export const sessionOptions: IronSessionOptions = {
  // password: process.env.SECRET_COOKIE_PASSWORD as string,
  password: 'mCgTt7VfC2J0TgMamiayeMC1cd0TJrfD2otfBQAA',
  cookieName: 'iron-session-examples-next.js',
  cookieOptions: {
    // secure: process.env.NODE_ENV === 'production'
    secure: false
  }
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
