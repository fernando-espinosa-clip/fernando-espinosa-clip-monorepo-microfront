import { useQuery } from 'react-query';
import { apiPaths } from '../../utils/apiPaths';
import { getLocaleStr } from '../../translations/dateLocale';
import axios from 'axios';

export const fetchTransactions = async (locale) => {
  const { data } = await axios.get(apiPaths.dashboard);

  switch (getLocaleStr(locale)) {
    case 'es':
      data.sales[0].name = 'Este año';
      data.sales[1].name = 'El año pasado';
      break;
    default:
  }
  return data;
};
const useDashboard = (storage, locale = 'en-US') => {
  return useQuery(`dashboard/${storage.getAuthToken()}/${locale}`, () => fetchTransactions(locale));
};
export default useDashboard;
