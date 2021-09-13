import { useQuery } from 'react-query';
import { getFlashCardsByFuzzySearch } from '../services';

function useGetFlashCardsByFuzzySearch(term) {
    return useQuery(
        ['flashCardByFuzzySearch', term],
        async () => {
          return await getFlashCardsByFuzzySearch(term);
        },
        { enabled: !!term }
      );
}

export default useGetFlashCardsByFuzzySearch;