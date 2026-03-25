import React from "react";
import { useSearchParams } from "react-router";
import useRequest from "../hooks/useRequest";
import { verifyEmail } from "../services/authService";

const VerifyEmailScreen = () => {
  const [searchParams] = useSearchParams();
  const verifyEmailToken = searchParams.get("verify_email_token");

  const { sendRequest, error, loading, response } = useRequest();

  const hasRequestedRef = React.useRef(false);

  React.useEffect(() => {
    if (!verifyEmailToken || hasRequestedRef.current) return;

    hasRequestedRef.current = true;

    sendRequest({
      requestCb: () =>
        verifyEmail({
          token: verifyEmailToken,
        }),
    });
  }, [verifyEmailToken, sendRequest]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verificación de email
        </h1>

        {loading && (
          <p className="text-sm text-blue-500 text-center">
            Verificando...
          </p>
        )}

        {response && (
          <p className="text-sm text-green-500 text-center">
            {response.message}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {!verifyEmailToken && (
          <p className="text-sm text-yellow-500 text-center">
            Token inválido o faltante
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailScreen;