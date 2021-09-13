import { useQuery } from 'react-query';
import { getAllFlashCardSets } from '../services';

function useGetAllFlashCardSets() {
  return useQuery('allFlashCardSets', async () => {
    return await getAllFlashCardSets();
  });
}
export default useGetAllFlashCardSets;
