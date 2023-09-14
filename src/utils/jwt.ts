import config from 'config';

import { createVerifier, createSigner } from 'fast-jwt';

const jwtSecret = config.get<string>('jwt.secret');
const expiresIn = config.get<number>('jwt.expiresIn');

if (!jwtSecret || !expiresIn) throw new Error('JWT secret or expiresIn is not defined');

const signSync = createSigner({ key: jwtSecret, expiresIn });

const verifySync = createVerifier({ key: jwtSecret, cache: true });

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

export const signToken = (tokenPayload: TokenPayload) => {
  return signSync(tokenPayload);
};

export const verifyToken = (token: string): TokenPayload => {
  return verifySync(token) as TokenPayload;
};
