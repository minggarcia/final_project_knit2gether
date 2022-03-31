import { NextApiRequest, NextApiResponse } from 'next';
import { createPost, Post } from '../../util/database';

type UploadRequestBody = {
  userId: number;
  image: string;
  title: string;
  description: string;
  needleSize: string;
  yarnName: string;
  username: string;
};

type UploadNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: UploadRequestBody;
};

export type UploadResponseBody =
  | { errors: { message: string }[] }
  | { post: Post };

export default async function uploadPostHandler(
  request: UploadNextApiRequest,
  response: NextApiResponse<UploadResponseBody>,
) {
  if (request.method === 'POST') {
    console.log('request body', request.body);
    const post = await createPost(
      request.body.userId,
      request.body.image,
      request.body.title,
      request.body.description,
      request.body.needleSize,
      request.body.yarnName,
      request.body.username,
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
