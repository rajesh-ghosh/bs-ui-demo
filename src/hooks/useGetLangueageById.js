import { useQuery } from 'react-query';
import { getLanguageById } from '../services';

function useGetLangueageById(id) {
  return useQuery(
    ['languageById', id],
    async () => {
      return await getLanguageById(id);
    },
    { enabled: !!id },
  );
}
export default useGetLangueageById;
