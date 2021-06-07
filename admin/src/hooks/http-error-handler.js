import { useState, useCallback } from 'react';
import axios from '../configs/axios';

const HttpHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        url: requestConfig.url,
        method: requestConfig.method ? requestConfig.method : 'GET',
        data: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
        
      }

      const data = await response.data;
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return {isLoading, error, sendRequest, errorConfirmedHandler};
}

export default HttpHandler;