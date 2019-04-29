import api from '@/api';

export const search = async query => {
  const response = await api.spotify.search.search(query);
  tracks = await getNext(
    'https://api.spotify.com/v1/me/following?type=artist',
    []
  );

  debugger;
};

const getNext = async (url, data) => {
  console.log(`getNext() url > ${url}`);
  const response = await api.spotify.next.get(url);
  let d = response.data.tracks || response.data;
  console.dir(d);
  console.log(`next > ${d.next}`);
  data.push(...d.items);
  if (d.next !== null) return getNext(d.next, data);
  else return data;
};
