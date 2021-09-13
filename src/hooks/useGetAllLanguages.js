import { useQuery } from 'react-query';
import { getAllLanguages } from '../services';

function useGetAllLanguages() {
  return useQuery('allLocale', async () => {
    return await getAllLanguages();
  });
}
export default useGetAllLanguages;
