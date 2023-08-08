import { useQuery } from 'react-query';
import { apiPaths } from '../../utils/apiPaths';
import axios from 'axios';

export const fetchOrders = async () => {
  const { data } = await axios.get(apiPaths.ordersLatest);
  return data;
};
const useOrders = (storage) => {
  return useQuery(`orders/${storage.getAuthToken()}`, () => fetchOrders());
};
export default useOrders;
