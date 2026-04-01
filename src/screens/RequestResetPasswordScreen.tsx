import { useNavigate } from "react-router";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import { requestResetPassword } from "../services/authService";

const ResetPasswordScreen = () => {
  const { sendRequest, error, loading, response } = useRequest();
  const navigate = useNavigate();
  const LOGIN_FORM_FIELDS = {
    EMAIL: "email",
  };

  const initialFormState = {
    [LOGIN_FORM_FIELDS.EMAIL]: "",
  };

  const onResetPassword = (formData: Record<string, string>) => {
    sendRequest({
      requestCb: async () => {
        return await requestResetPassword({
          email: formData[LOGIN_FORM_FIELDS.EMAIL],
        });
      },
    });
  };

  const { handleChangeInput, onSubmit } = useForm({
    initialFormState,
    submitFn: onResetPassword,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Restablecer contraseña
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name={LOGIN_FORM_FIELDS.EMAIL}
              onChange={handleChangeInput}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="tu@email.com"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Restablecer contraseña"}
          </button>

          {/* Error */}
          {error && (
            <span className="text-sm text-red-500 text-center block">
              {error}
            </span>
          )}

          {/* Success */}
          {response && (
            <span className="text-sm text-green-500 text-center block">
              {response.message}
            </span>
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
