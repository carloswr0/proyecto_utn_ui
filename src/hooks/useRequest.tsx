import { useState } from "react";

interface Request {
  message: string;
  status: number;
  ok: boolean;
  data?: unknown;
}

const useRequest = () => {
  const [response, setResponse] = useState<Request | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async ({
    requestCb,
  }: {
    requestCb: () => Promise<Request>;
  }) => {
    setLoading(true);
    try {
      const res = await requestCb();
      
      if (!res.ok) {
        throw Error(res.message);
      }

      setError(null);
      setResponse(res);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendRequest,
    response,
    error,
    loading,
  };
};

export default useRequest;
