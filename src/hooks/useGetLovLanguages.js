import { useQuery } from 'react-query';
import { getLovLanguages } from '../services';

function useGetLovLanguages() {
  return useQuery('lovLocale', async () => {
    return await getLovLanguages();
  });
}
export default useGetLovLanguages;
