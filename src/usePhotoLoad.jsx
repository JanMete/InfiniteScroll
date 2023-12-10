import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useLoadPhotos(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const apiKey = '8reh6PFnmVgWIxXKnv5S61k5DPHhle2EE8ETvEOGoHc';

    axios({
      method: 'GET',
      url: `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${pageNumber}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPhotos((prevPhotos) => {
          return [...new Set([...prevPhotos, ...res.data])];
        });
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [pageNumber]);

  return { loading, error, photos };
}
