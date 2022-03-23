import { NextApiRequest, NextApiResponse } from 'next';
import {
  deletePostByPostId,
  getPostById,
  Post,
  updatePostById,
} from '../../../util/database';

type PostRequestBody = {
  post: Post;
};

export type DeletePostResponseBody =
  | { errors: { message: string }[] }
  | { post: Post };

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
      response.status(404).json({ error: 'post not found' });
      return;
    }

    // if the method is GET return the post with the matching id

    response.status(200).json({ post: post });
    return;
  }
  // if the method id PUT update the post and response with the updated post
  else if (request.method === 'PUT') {
    // Access the body post from the request object
    const postFromRequest = request.body.post;

    const updatedPost = await updatePostById(
      postId,
      postFromRequest.image,
      postFromRequest.title,
      postFromRequest.description,
      postFromRequest.needleSize,
      postFromRequest.yarnName,
    );

    if (!updatedPost) {
      response.status(404).json({ error: 'post not found' });
      return;
    }

    response.status(200).json({ post: updatedPost });
    return;
  } else if (request.method === 'DELETE') {
    // if the method is DELETE, delete the animal matching the id and response with the deleted post
    const deletedPost = await deletePostByPostId(postId);

    if (!deletedPost) {
      response.status(404).json({ error: 'post not found' });
      return;
    }

    response.status(200).json({ post: deletedPost });
    return;
  }

  response.status(405).json({ error: 'Method not allowed!' });
}
