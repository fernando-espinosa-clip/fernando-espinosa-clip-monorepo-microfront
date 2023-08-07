import { useQuery } from 'react-query';
import { apiPaths } from '../../utils/apiPaths';
import axios from 'axios';

export const fetchTransactions = async () => {
  const { data } = await axios.get(apiPaths.dashboard);
  return data;
};
const useDashboard = (storage) => {
  return useQuery(`dashboard/${storage.getAuthToken()}`, () => fetchTransactions());
};
export default useDashboard;
