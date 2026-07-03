"use client"
import {useEffect} from 'react';
import { useUi } from 'hooks';
// Shows HeaderProgressBar when rendered

const ShowHeaderProgressBar = () => {
  const {displayHeaderProgressBar, hideHeaderProgressBar} = useUi()

  useEffect(() => {
    displayHeaderProgressBar()
    return () => {
      hideHeaderProgressBar()
    }
  }, [displayHeaderProgressBar, hideHeaderProgressBar])

  return null;
};

export default ShowHeaderProgressBar;
