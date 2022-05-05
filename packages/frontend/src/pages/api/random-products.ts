import { sampleSize } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') {
    return response.status(405).end();
  }

  const products = await prisma.product.findMany();
  const randomProducts = sampleSize(products, 3);

  const result = [];

  for (const product of randomProducts) {
    const temporary: any = { ...product, images: [] };
    delete temporary.imageIds;

    for (const imageId of product.imageIds) {
      const image = await prisma.productImage.findFirst({
        where: {
          id: imageId
        }
      });

      temporary.images.push({
        id: image!.id,
        src: image!.src,
        alt: image!.alt
      });
    }

    result.push(temporary);
  }

  response.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
  return response.status(200).json(result);
}
