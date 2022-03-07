import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  getUserWithPasswordHashByUsername,
  User,
} from '../../util/database';

type LoginRequestBody = {
  username: string;
  password: string;
  csrfToken: string;
};

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: Pick<User, 'id'> };

type LoginNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: LoginRequestBody;
};

export default async function loginHandler(
  request: LoginNextApiRequest,
  response: NextApiResponse<LoginResponseBody>,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password ||
      typeof request.body.csrfToken !== 'string' ||
      !request.body.csrfToken
    ) {
      response.status(400).json({
        errors: [
          {
            message: '* username, password or CSRF token not provided',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // Verify CSRF Token
    const csrfTokenMatches = verifyCsrfToken(request.body.csrfToken);

    if (!csrfTokenMatches) {
      response.status(403).json({
        errors: [
          {
            message: 'Invalid CSRF token',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      request.body.username,
    );

    if (!userWithPasswordHash) {
      response.status(401).json({
        errors: [
          {
            message: "* username or password don't match",
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    const passwordMatches = await bcrypt.compare(
      request.body.password,
      userWithPasswordHash.passwordHash,
    );

    if (!passwordMatches) {
      response.status(401).json({
        errors: [
          {
            message: "* username or password don't match",
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    //  RETURN CREATED SESSION IN COOKIE
    // 1. Create a unique token
    const sessionToken = crypto.randomBytes(64).toString('base64');

    // 2. Create the session
    const session = await createSession(sessionToken, userWithPasswordHash.id);

    // 3. Serialize the cookie
    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );
    // 4. Add the cookie to the header response

    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({
        user: {
          id: userWithPasswordHash.id,
        },
      });
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
