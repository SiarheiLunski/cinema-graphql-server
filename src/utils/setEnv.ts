import 'dotenv/config';

const requiredEnv = [
  'SPARKPOST_API_KEY',
  'JWT_SECRET_KEY'
];

const unsetEnv = requiredEnv.filter(env => typeof process.env[env] === 'undefined');

if (unsetEnv.length > 0) {
  throw new Error(`Required ENV variables are not set: ${unsetEnv.join(', ')}`);
}
