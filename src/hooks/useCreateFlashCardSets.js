import { useMutation } from 'react-query';
import { createFlashCardSets } from '../services';
import { toast } from 'react-toastify';

function useCreateFlashCardSets() {
  return useMutation((data) => createFlashCardSets(data), {
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
}

export default useCreateFlashCardSets;
