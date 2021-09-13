import { useMutation } from 'react-query';
import { addTranslation } from '../services';
import { toast } from 'react-toastify';

function useAddTranslation() {
  return useMutation(({ data, id }) => addTranslation(data, id), {
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
}

export default useAddTranslation;
