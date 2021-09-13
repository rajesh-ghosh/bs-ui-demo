import { useQuery } from 'react-query';
import { getDashboardFlashCardSets } from '../services';

function useGetDashboardFlashCardSets() {
  return useQuery('dashboardFlashCardSets', async () => {
    return await getDashboardFlashCardSets();
  });
}
export default useGetDashboardFlashCardSets;
