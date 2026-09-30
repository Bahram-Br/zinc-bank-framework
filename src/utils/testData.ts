import { config } from '../config/config';

/**
 * Central place for test data used across scenarios.
 *
 * Values come from environment variables (see `.env`) so that real
 * credentials are never hardcoded in the framework and never committed to Git.
 */
export const testData = {
  zincBank: {
    username: process.env.VALID_USERNAME || 'student01@zinc.test',
    password: process.env.VALID_PASSWORD || '9pJolA7GBQec',
  },

  zincTM: {
    username: process.env.ZINCTM_USERNAME || 'brr113114@gmail.com',
    password: process.env.ZINCTM_PASSWORD || 'Bb012185@',
  },

  owner: {
    username: process.env.OWNER_USERNAME || 'bb112233@student.com',
    password: process.env.OWNER_PASSWORD || 'Bhrm112233',
  }
};

export type TestData = typeof testData;

// Re-export config for convenience so test-data consumers can reach it.
export { config };
