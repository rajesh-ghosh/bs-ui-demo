import { useMutation } from 'react-query';
import { updateImage } from '../services';
import { toast } from 'react-toastify';

function useUploadImage() {
  return useMutation((data) => updateImage(data), {
    onError: (error) => {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
}

export default useUploadImage;
