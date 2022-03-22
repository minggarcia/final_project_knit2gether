import { NextApiRequest, NextApiResponse } from 'next';
import { getPostById, Post } from '../../../util/database';

type PostRequestBody = {
  post: Post;
};

type PostNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: PostRequestBody;
};

export type PostResponseBody = { error: string } | { post: Post };

export async function postHandler(
  request: PostNextApiRequest,
  response: NextApiResponse<PostResponseBody>,
) {
  console.log('this is the id', request.query.postId);

  // check that the id is passed as a number
  const postId = Number(request.query.postId);
  console.log(postId);

  // check if postId is not a number

  if (!postId) {
    response.status(400).json({ error: 'The postId must be a number' });
    return;
  }

  if (request.method === 'GET') {
    const post = await getPostById(postId);

    // check if there is no post with the id passed into the database

    console.log(post);

    if (!post) {
      responst;
    }
  }
}
