import { useQuery } from 'react-query';
import { getAllFlashCards } from '../services';

function useGetAllFlashCards(query) {
  return useQuery(['allFlashCards', query], async () => {
    return await getAllFlashCards(query);
  });
}
export default useGetAllFlashCards;
