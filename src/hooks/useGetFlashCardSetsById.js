import { useQuery } from 'react-query';
import { getFlashCardSetsById } from '../services';

function useGetFlashCardSetsById(id) {
  return useQuery(
    ['flashCardById', id],
    async () => {
      return await getFlashCardSetsById(id);
    },
    { enabled: !!id },
  );
}
export default useGetFlashCardSetsById;
