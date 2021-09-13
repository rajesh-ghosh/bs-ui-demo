import { useQuery } from 'react-query';
import { getFlashCardById } from '../services';

function useGetFlashCardById(id) {
  return useQuery(
    ['flashCardById', id],
    async () => {
      return await getFlashCardById(id);
    },
    { enabled: !!id },
  );
}
export default useGetFlashCardById;
