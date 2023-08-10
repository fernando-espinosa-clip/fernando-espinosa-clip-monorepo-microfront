import { useQuery } from 'react-query';
import { apiPaths } from '../../utils/apiPaths';
import axios from 'axios';

export const fetchCustomers = async () => {
  const { data } = await axios.get(apiPaths.customersList);
  return data;
};
export const useCustomers = (storage) => {
  return useQuery(`costumers/${storage.getAuthToken()}`, () => fetchCustomers());
};
export default useCustomers;
