import { NextApiRequest, NextApiResponse } from 'next';
import { Profile } from '../../../util/database';

type ProfileRequestBody = {
  profile: Profile;
};

type ProfileNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: ProfileRequestBody;
};

export type ProfileResponseBody = { error: string } | { profile: Profile };

export default async function ProfileHandler(
  request: ProfileNextApiRequest,
  response: NextApiResponse<ProfileResponseBody>,
) {
  if (request.method === 'GET') {
  }
}
