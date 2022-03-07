import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  createUser,
  getUserByUsername,
  getValidSessionByToken,
} from '../../util/database';

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      response.status(400).json({
        errors: [
          {
            message: '* username, password or CSRF token not provided',
          },
        ],
      });
      return;
    }

    // If there is already a user  machting the username, return error message
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [{ message: '* sorry, username already exists' }],
      });
      return; // IMPORTANT: will prevent 'Headers already sent' error
    }

    const passwordHash = await bcrypt.hash(request.body.password, 12);
    const user = await createUser(request.body.username, passwordHash);

    //  RETURN CREATED SESSION IN COOKIE
    // 1. Create a unique token
    const token = crypto.randomBytes(64).toString('base64');

    // 2. Create the session
    const session = await createSession(token, user.id);

    // 3. Serialize the cookie
    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // 4. Add the cookie to the header response

    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: user });
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
