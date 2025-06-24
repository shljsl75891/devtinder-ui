import {QueryClient} from '@tanstack/react-query';

export const FEED_LIMIT = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

/**
 * @param {unknown} value
 * @returns {value is null | undefined}
 */
export const isNullOrUndefined = value => {
  return value === null || value === undefined;
};
