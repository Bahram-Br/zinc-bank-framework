import { config } from '../config/config';

/**
 * Read a credential only when a scenario asks for it.
 * Missing values fail that scenario instead of falling back to a password in source.
 */
function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value?.trim()) {
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
  // Casey fixture: fixed accounts for ZTM8 and registered email for ZTM4.
  zincBank: {
    get username(): string {
      return requiredEnv('TEST_USERNAME');
    },
    get password(): string {
      return requiredEnv('TEST_PASSWORD');
    },
  },

  zincTM: {
    get username(): string {
      return requiredEnv('ZINCTM_USERNAME');
    },
    get password(): string {
      return requiredEnv('ZINCTM_PASSWORD');
    },
  },

  // Personal sandbox account used by ZTM1.
  owner: {
    get username(): string {
      return requiredEnv('OWNER_USERNAME');
    },
    get password(): string {
      return requiredEnv('OWNER_PASSWORD');
    },
  },
};

export type TestData = typeof testData;

// Re-export config for convenience so test-data consumers can reach it.
export { config };
