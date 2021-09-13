import { useMutation } from 'react-query';
import { updateFlashCard } from '../services';
import { toast } from 'react-toastify';

function useUpdateFlashCards() {
  return useMutation((data, id) => updateFlashCard(data, id), {
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
}

export default useUpdateFlashCards;
