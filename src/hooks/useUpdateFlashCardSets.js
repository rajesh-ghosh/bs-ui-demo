import { useMutation } from 'react-query';
import { updateFlashCardSets } from '../services';
import { toast } from 'react-toastify';

function useUpdateFlashCardSets() {
  return useMutation(({ data, id }) => updateFlashCardSets(data, id), {
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
}

export default useUpdateFlashCardSets;
