import { Link } from "react-router";
import useForm from "../hooks/useForm";
import { register } from "../services/authService";
import useRequest from "../hooks/useRequest";

const RegisterScreen = () => {
  const { sendRequest, error, loading, response } = useRequest();
  const REGISTER_FORM_FIELDS = {
    EMAIL: "email",
    PASSWORD: "password",
    NAME: "name",
  };

  const initialFormState = {
    [REGISTER_FORM_FIELDS.NAME]: "",
    [REGISTER_FORM_FIELDS.EMAIL]: "",
    [REGISTER_FORM_FIELDS.PASSWORD]: "",
  };

  const onRegister = (formData: Record<string, string>) => {
    sendRequest({
      requestCb: async () => {
        return await register({
          name: formData[REGISTER_FORM_FIELDS.NAME],
          email: formData[REGISTER_FORM_FIELDS.EMAIL],
          password: formData[REGISTER_FORM_FIELDS.PASSWORD],
        });
      },
    });
  };

  const { handleChangeInput, onSubmit } = useForm({
    initialFormState,
    submitFn: onRegister,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registrarse
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name={REGISTER_FORM_FIELDS.NAME}
              onChange={handleChangeInput}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Tu nombre"
            />
          </div>

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
              name={REGISTER_FORM_FIELDS.EMAIL}
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
              name={REGISTER_FORM_FIELDS.PASSWORD}
              onChange={handleChangeInput}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Loading..." : "Registrarse"}
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
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
