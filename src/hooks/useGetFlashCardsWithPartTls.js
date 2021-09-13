import { useQuery } from 'react-query';
import { getFlashCardsWithPartTls } from '../services';

function useGetFlashCardsWithPartTls() {
  return useQuery('allFashCardsWithPartTls', async () => {
    return await getFlashCardsWithPartTls();
  });
}
export default useGetFlashCardsWithPartTls;