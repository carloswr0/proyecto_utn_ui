import { useNavigate, useSearchParams } from "react-router";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import { resetPassword } from "../services/authService";
import { useEffect, useState } from "react";

const ResetPasswordScreen = () => {
  const [searchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get("reset_password_token");
  const { sendRequest, error, loading, response } = useRequest();
  const navigate = useNavigate();
  const RESET_PASSWORD_FORM_FIELDS = {
    PASSWORD: "password",
  };
  const [redirectCountdown, setRedirectCountdown] = useState(0);

  const initialFormState = {
    [RESET_PASSWORD_FORM_FIELDS.PASSWORD]: "",
  };

  const onResetPassword = (formData: Record<string, string>) => {
    if (resetPasswordToken) {
      sendRequest({
        requestCb: async () => {
          return await resetPassword({
            password: formData[RESET_PASSWORD_FORM_FIELDS.PASSWORD],
            token: resetPasswordToken,
          });
        },
      });
    }
  };

  const { handleChangeInput, onSubmit } = useForm({
    initialFormState,
    submitFn: onResetPassword,
  });

  useEffect(() => {
    if (!response) return;

    setTimeout(() => {
      setRedirectCountdown(3);
    }, 0);

    const timer = setInterval(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [response, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Restablecer contraseña
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name={RESET_PASSWORD_FORM_FIELDS.PASSWORD}
              onChange={handleChangeInput}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Cambiar contraseña"}
          </button>

          {/* Error */}
          {error && (
            <span className="text-sm text-red-500 text-center block">
              {error}
            </span>
          )}

          {loading && (
            <p className="text-sm text-blue-500 text-center">Verificando...</p>
          )}

          {response && (
            <p className="text-sm text-green-500 text-center">
              {response.message} Redirecting in {redirectCountdown || 0}{" "}
              seconds...
            </p>
          )}

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Regresar a iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
