import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'utils/session';

export type User = {
  isLoggedIn: boolean;
};

export default withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse<User>) => {
  res.send({ isLoggedIn: req.session.user?.isLoggedIn || false });
}, sessionOptions);
