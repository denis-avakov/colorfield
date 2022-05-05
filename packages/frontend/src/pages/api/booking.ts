import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end();
  }

  const user = await prisma.user.create({
    data: {}
  });

  const order = await prisma.order.create({
    data: {
      email: request.body.email,
      phone: request.body.phone,
      firstName: request.body.firstName,
      secondName: request.body.secondName,
      deliveryType: request.body.deliveryType || 'Почта России',
      paymentType: request.body.paymentType || 'Карта МИР',
      city: request.body.city,
      address: request.body.address,
      zip: request.body.zip,
      comment: request.body.comment,
      buyer: {
        connect: {
          id: user.id
        }
      },
      products: {
        create: Object.values(request.body.products).map((product: any) => ({
          productId: product.id,
          quantity: product.quantity
        }))
      }
    }
  });

  const accessCode = await prisma.accessCode.create({
    data: {
      orderId: order.id,
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      active: true
    }
  });

  response.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
  return response.status(200).json({
    success: true,
    accessCode: accessCode.code
  });
}
