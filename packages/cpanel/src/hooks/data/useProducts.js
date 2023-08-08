import { useQuery } from 'react-query';
import { apiPaths } from '../../utils/apiPaths';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const fetchLatestProducts = async () => {
  const { data } = await axios.get(apiPaths.productsLatest);
  data.forEach((r) => (r.updatedAtToNow = formatDistanceToNow(new Date(r.updatedAt))));
  return data;
};
const useProducts = (storage) => {
  return useQuery(`products/latest/${storage.getAuthToken()}`, () => fetchLatestProducts());
};
export default useProducts;
