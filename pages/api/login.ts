import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUser,
  getUserByUsername,
  getUserWithPasswordHashByUsername,
  User,
} from '../../util/database';

type LoginRequestBody = {
  username: string;
  password: string;
};

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: Pick<User, 'id'> };

export default async function loginHandler(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponseBody>,
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
      return; // Important: will prevent "Headers already sent" error
    }

    // Verify CSRF Token
    //  const csrfTokenMatches = verifyCsrfToken(request.body.csrfToken);

    //  if (!csrfTokenMatches) {
    //    response.status(403).json({
    //      errors: [
    //        {
    //          message: 'Invalid CSRF token',
    //        },
    //      ],
    //    });
    //    return; // Important: will prevent "Headers already sent" error
    //  }

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

    // TODO RETURN CREATED SESSION IN COOKIE

    response.status(201).json({
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
