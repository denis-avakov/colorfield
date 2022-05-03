import { PRODUCTS } from 'utils/vars';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  response.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
  return response.status(200).json(PRODUCTS);
}
