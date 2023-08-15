import { useQuery } from 'react-query';
import { apiPaths } from '../../utils/apiPaths';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { getLocale } from '../../translations/dateLocale';

export const fetchLatestProducts = async (lang) => {
  const { data } = await axios.get(apiPaths.productsLatest);
  const locale = getLocale(lang);
  data.forEach((r) => (r.updatedAtToNow = formatDistanceToNow(new Date(r.updatedAt), { locale })));
  return data;
};
const useProducts = (storage, locale) => {
  return useQuery(`products/latest/${locale}/${storage.getAuthToken()}`, () => fetchLatestProducts(locale));
};
export default useProducts;
