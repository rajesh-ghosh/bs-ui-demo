import { useQuery } from 'react-query';
import { getAllFlashCards } from '../services';

function useGetAllFlashCards(queryType, query) {
  return useQuery(['allFlashCards', queryType, query], async () => {
    return await getAllFlashCards(queryType, query);
  });
}
export default useGetAllFlashCards;
