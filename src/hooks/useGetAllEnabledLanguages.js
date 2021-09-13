import { useQuery } from 'react-query';
import { getAllEnabledLanguages } from '../services';

function useGetAllEnabledLanguages() {
  return useQuery('allEnabledLocale', async () => {
    return await getAllEnabledLanguages();
  });
}
export default useGetAllEnabledLanguages;
