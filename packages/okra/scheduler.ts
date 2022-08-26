// export const scheduler = window.requestIdleCallback;
// scheduler.cancel = window.cancelIdleCallback;

// https://gist.github.com/paullewis/55efe5d6f05434a96c36
// https://github.com/pladaria/requestidlecallback-polyfill

const reqIdleCallback = (cb, { timeout = 50, debounce = 10 }) => {
  const start = Date.now();
  // TODO: Use requestIdleCallback instead of setTimeout
  return setTimeout(
    () => cb({ didTimeout: false, timeRemaining: () => Math.max(0, timeout - (Date.now() - start)) }),
    debounce
  );
};

reqIdleCallback.cancel = (id) => clearTimeout(id);

export const scheduler = (cb) => reqIdleCallback(cb, { timeout: 100 });
