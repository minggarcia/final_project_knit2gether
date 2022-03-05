import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByUsername } from '../../util/database';

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse,
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
        errors:[
          {
            message: 'username, password or CSRF token not provides'
          }
        ]
      });
      return;
 if (await getUserByUsername(request.body.username)){


 response.status(409).json({
  errors: [{ message: 'sorry, username is already taken' }],
});
return;
 }


     const passwordHash = await bcrypt.hash(request.body.password, 12);

    const user = createUser(request.body.username, passwordHash);
    response.status(201).json({ user: user });
