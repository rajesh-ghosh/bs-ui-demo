import { useMutation } from 'react-query';
import { createLanguage } from '../services';
import { toast } from 'react-toastify';

function useCreateLanguage() {
  return useMutation((data) => createLanguage(data), {
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
}

export default useCreateLanguage;
