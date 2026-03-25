import { Link, useNavigate } from "react-router";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import { login as loginRequest } from "../services/authService";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

const LoginScreen = () => {
  const { sendRequest, error, loading, response } = useRequest();
  const navigate = useNavigate();
  
  const { login } = useContext(AuthContext);

  const LOGIN_FORM_FIELDS = {
    EMAIL: "email",
    PASSWORD: "password",
  };

  const initialFormState = {
    [LOGIN_FORM_FIELDS.EMAIL]: "",
    [LOGIN_FORM_FIELDS.PASSWORD]: "",
  };

  const onLogin = (formData: Record<string, string>) => {
    sendRequest({
      requestCb: async () => {
        return await loginRequest({
          email: formData[LOGIN_FORM_FIELDS.EMAIL],
          password: formData[LOGIN_FORM_FIELDS.PASSWORD],
        });
      },
    });
  };

  const { handleChangeInput, onSubmit } = useForm({
    initialFormState,
    submitFn: onLogin,
  });

  useEffect(() => {
    if (response?.ok) {
      const authToken = (response.data as { auth_token: string }).auth_token || "";
      login(authToken);
      navigate("/home");
    }
  }, [response, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar sesión
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
              name={LOGIN_FORM_FIELDS.PASSWORD}
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
            {loading ? "Loading..." : "Iniciar sesión"}
          </button>

          {/* Error */}
          {error && (
            <span className="text-sm text-red-500 text-center block">
              {error}
            </span>
          )}
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Registrarse
          </Link>
        </p>

        <p className="text-sm text-gray-600 text-center mt-3">
          ¿Se te ha olvidado tu contraseña?{" "}
          <Link
            to="/request-reset-password"
            className="text-blue-600 hover:underline font-medium"
          >
            Restablecer contraseña
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
