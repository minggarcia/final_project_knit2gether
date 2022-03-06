import { serialize } from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e. g. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 10; // 10 minutes
  return serialize('sessionToken', token, {
    // IMPORTANT FOR SECURITY
    magAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  });
}
