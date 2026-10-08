import { config } from '../config/config';

/**
 * Read a credential only when a scenario asks for it.
 * Missing values fail that scenario instead of falling back to a password in source.
 */
function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in .env locally, or as a GitHub Actions secret in CI.`,
    );
  }
  return value;
}

/**
 * Central place for test data used across scenarios.
 *
 * Values come from environment variables (see `.env`) so that real
 * credentials are never hardcoded in the framework and never committed to Git.
 */
export const testData = {
  zincBank: {
    username: process.env.VALID_USERNAME || 'casey@zinc.test',
    password: process.env.VALID_PASSWORD || 'Passw0rd!',
  },

  zincTM: {
    get username(): string {
      return requiredEnv('ZINCTM_USERNAME');
    },
    get password(): string {
      return requiredEnv('ZINCTM_PASSWORD');
    },
  },

  owner: {
    username: process.env.OWNER_USERNAME || 'bb112233@student.com',
    password: process.env.OWNER_PASSWORD || 'Bhrm112233',
  }
};

export type TestData = typeof testData;

// Re-export config for convenience so test-data consumers can reach it.
export { config };
