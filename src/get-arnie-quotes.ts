import { httpGet } from './mock-http-interface';

type KeyType = 'Arnie Quote' | 'FAILURE';
type TResult = {
  [key in KeyType]?: string;
};

/**
 * Requests all URLs
 * @param urls
 * @returns
 */
const requestUrls = async (urls: string[]): Promise<TResult[]> => {
  let requests = urls.map(async (url) => {
    const response = await httpGet(url);
    if (response.status === 200) {
      return {
        'Arnie Quote': JSON.parse(response.body).message,
      };
    } else {
      return {
        FAILURE: JSON.parse(response.body).message,
      };
    }
  });
  return Promise.all(requests);
};

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  return new Promise(async (resolve, reject) => {
    const results: TResult[] = await requestUrls(urls);
    resolve(results);
  });
};
