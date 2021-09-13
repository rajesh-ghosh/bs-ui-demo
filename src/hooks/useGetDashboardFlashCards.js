import { useQuery } from 'react-query';
import { getDashboardFlashCards } from '../services';

function useGetDashboardFlashCards() {
  return useQuery('dashboardFlashCards', async () => {
    return await getDashboardFlashCards();
  });
}
export default useGetDashboardFlashCards;
