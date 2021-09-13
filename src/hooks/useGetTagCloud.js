import { useQuery } from 'react-query';
import { getTagCloud } from '../services';

function useGetTagCloud() {
  return useQuery('getTagCloud', async () => {
    return await getTagCloud();
  });
}
export default useGetTagCloud;
