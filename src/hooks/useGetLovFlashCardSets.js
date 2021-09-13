import { useQuery } from 'react-query';
import { getLovFlashCardSets } from '../services';

function useGetLovFlashCardSets() {
  return useQuery('lovFlashCardSets', async () => {
    return await getLovFlashCardSets();
  });
}
export default useGetLovFlashCardSets;
