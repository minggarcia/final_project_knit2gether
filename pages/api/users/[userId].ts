import { NextApiRequest, NextApiResponse } from 'next';
import { createProfileImageAndBio, Profile } from '../../../util/database';

type ProfileRequestBody = {
  image: string;
  bio: string;
  userId: number;
  postId: number;
};

type ProfileNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: ProfileRequestBody;
};

export type ProfileResponseBody =
  | { errors: { message: string }[] }
  | { profile: Profile };
export default async function profileHandler(
  request: ProfileNextApiRequest,
  response: NextApiResponse<ProfileResponseBody>,
) {
  if (request.method === 'POST') {
    console.log('request body', request.body);
    const profile = await createProfileImageAndBio(
      request.body.userId,
      request.body.image,
      request.body.bio,
    );

    response.status(201).json({ profile: profile });
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
