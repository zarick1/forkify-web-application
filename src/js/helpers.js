import { TIMEOUT_SEC } from './config.js';

/**
 * Creates a promise that rejects after a specified timeout period.
 *
 * @param {number} s - The number of seconds before the timeout occurs.
 * @returns {Promise<never>} A promise that rejects with an error after the timeout period.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Asynchronously fetches JSON data from a specified URL with a timeout.
 *
 * @param {string} url - The URL from which to fetch the JSON data.
 * @returns {Promise<Object>} A promise that resolves with the parsed JSON data.
 * @throws {Error} If the request times out, the response is not OK, or the data cannot be parsed.
 */
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * Asynchronously sends JSON data to a specified URL with a timeout.
 *
 * @param {string} url - The URL to which the JSON data will be sent.
 * @param {Object} uploadData - The data to be sent as JSON.
 * @returns {Promise<Object>} A promise that resolves with the parsed JSON response.
 * @throws {Error} If the request times out, the response is not OK, or the data cannot be sent.
 */
export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
