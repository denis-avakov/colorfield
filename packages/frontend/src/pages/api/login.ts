import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'utils/session';
import prisma from 'utils/prisma';

export default withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessCode } = await req.body;

  try {
    const order = await prisma.accessCode.findFirst({
      where: {
        code: accessCode
      }
    });

    if (!order) {
      throw new Error("Access code doesn't exist");
    }

    const session = {
      ...order,
      isLoggedIn: true
    };

    req.session.user = session;
    await req.session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}, sessionOptions);
