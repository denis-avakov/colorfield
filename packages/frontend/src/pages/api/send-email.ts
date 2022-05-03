import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  return response.status(200).json({
    data: {
      messageId: 'foo',
      previewUrl: 'foo'
    }
  });
}
