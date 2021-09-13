import { useMutation } from 'react-query';
import { updateLanguage } from '../services';
import { toast } from 'react-toastify';

function useUpdateLanguage() {
  return useMutation(({ data, id }) => updateLanguage(data, id), {
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
}

export default useUpdateLanguage;
