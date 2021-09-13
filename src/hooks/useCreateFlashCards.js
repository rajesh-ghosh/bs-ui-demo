import { useMutation } from 'react-query';
import { createFlashCard } from '../services';
import { toast } from 'react-toastify';

function useCreateFlashCards() {
  return useMutation((data) => createFlashCard(data), {
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
}

export default useCreateFlashCards;
