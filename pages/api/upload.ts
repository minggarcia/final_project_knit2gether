import { NextApiRequest, NextApiResponse } from 'next';
import { createPost } from '../../util/database';

export default async function uploadPostHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const post = await createPost(
      request.body.title,
      request.body.description,
      request.body.needleSize,
      request.body.yarnName,
    );

    response.status(201).json({ post: post });
    return;
  }

  response.status(405).json({
    errors: [
      {
        message: 'Method not supported, try POST instead',
      },
    ],
  });
}
