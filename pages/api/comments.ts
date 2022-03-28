import { NextApiRequest, NextApiResponse } from 'next';
import { Comment, createComment, deleteCommentById } from '../../util/database';

type CommentRequestBody = {
  userId: number;
  postId: number;
  content: string;
  username: string;
};

type CommentNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: CommentRequestBody;
};

export type CommentResponseBody =
  | { errors: { message: string }[] }
  | { comment: Comment };

export async function commentsHandler(
  request: CommentNextApiRequest,
  response: NextApiResponse<CommentResponseBody>,
) {
  const commentId = Number(request.query.commentId);

  if (request.method === 'POST') {
    const createdComment = await createComment(
      request.body.userId,
      request.body.postId,
      request.body.content,
      request.body.username,
    );
    response.status(201).json({ comment: createdComment });
    return;
  }

  if (request.method === 'DELETE') {
    const deletedComment = await deleteCommentById(commentId);
    response.status(201).json({ comment: deletedComment });
    return;
  }
}
