import axios from 'axios';

const APIKEY = '25607511-28b83b13f0e2975028585da7b&image';

export default async function Api(querry, page) {
  const url = `https://pixabay.com/api/?q=${querry}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const resp = await axios.get(url);
  const arr = resp.data.hits.reduce(
    (acc, el) => [
      ...acc,
      {
        id: el.id,
        webformatURL: el.webformatURL,
        largeImageURL: el.largeImageURL,
      },
    ],
    []
  );
  return arr;
}
