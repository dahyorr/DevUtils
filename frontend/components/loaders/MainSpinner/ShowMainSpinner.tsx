import {useEffect} from 'react';
import { useLoader } from '@/hooks';

// Shows HeaderProgressBar when rendered

const ShowMainSpinner = () => {
  const {showLoader, hideLoader} = useLoader()

  useEffect(() => {
    showLoader()
    return () => {
      hideLoader()
    }
  }, [showLoader, hideLoader])

  return null;
};

export default ShowMainSpinner;
