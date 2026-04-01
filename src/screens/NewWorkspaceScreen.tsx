import useRequest from "../hooks/useRequest";
import useForm from "../hooks/useForm";
import { createWorkspace } from "../services/workspaceService";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function NewWorkspaceScreen() {
  const navigate = useNavigate();
  const { sendRequest, error, loading, response } = useRequest();
  const CREATE_WORKSPACE_FORM_FIELD = {
    TITLE: "title",
    DESCRIPTION: "description",
    URL_IMAGE: "url_image",
  };

  const initialFormState = {
    [CREATE_WORKSPACE_FORM_FIELD.TITLE]: "",
    [CREATE_WORKSPACE_FORM_FIELD.DESCRIPTION]: "",
    [CREATE_WORKSPACE_FORM_FIELD.URL_IMAGE]: "",
  };

  const onWorkspaceCreate = (formData: Record<string, string>) => {
    sendRequest({
      requestCb: async () => {
        return await createWorkspace({
          title: formData[CREATE_WORKSPACE_FORM_FIELD.TITLE],
          description: formData[CREATE_WORKSPACE_FORM_FIELD.DESCRIPTION],
          url_image: formData[CREATE_WORKSPACE_FORM_FIELD.URL_IMAGE],
        });
      },
    });
  };

  const { handleChangeInput, onSubmit } = useForm({
    initialFormState,
    submitFn: onWorkspaceCreate,
  });

  useEffect(() => {
    if (response?.ok) {
      navigate("/home");
    }
  }, [response, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create Workspace
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Titulo
            </label>
            <input
              type="text"
              id="name"
              name={CREATE_WORKSPACE_FORM_FIELD.TITLE}
              onChange={handleChangeInput}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Titulo del workspace"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Descripción
            </label>
            <input
              type="text"
              id="email"
              name={CREATE_WORKSPACE_FORM_FIELD.DESCRIPTION}
              onChange={handleChangeInput}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Descripción del workspace"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            {loading ? "Creando Workspace..." : "Crear Workspace"}
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
      </div>
    </div>
  );
}
