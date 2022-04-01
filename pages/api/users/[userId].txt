import { NextApiRequest, NextApiResponse } from 'next';
import {
  createProfileImageAndBio,
  getProfileImageAndBioById,
  Profile,
} from '../../../util/database';

type ProfileRequestBody = {
  profile: Profile;
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
  const userId = Number(request.query.userId);

  if (request.method === 'POST') {
    console.log('request body', request.body);
    const profile = await createProfileImageAndBio(
      request.body.profile.userId,
      request.body.profile.image,
      request.body.profile.bio,
    );

    response.status(201).json({ profile: profile });
    return;
  }

  if (request.method === 'GET') {
    const profileInfo = await getProfileImageAndBioById(userId);
    console.log(profileInfo);

    response.status(200).json({ profile: profileInfo });
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
