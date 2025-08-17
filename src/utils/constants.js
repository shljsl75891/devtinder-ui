import {QueryClient} from '@tanstack/react-query';

export const FEED_LIMIT = 3;

/**
 * The number of milliseconds in 15 minutes.
 * Used for setting the stale time for queries.
 * @type {number}
 */
export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIFTEEN_MINUTES,
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

export const DATE_TIME_FORMAT = 'dd/MM/yy hh:mm aa';
