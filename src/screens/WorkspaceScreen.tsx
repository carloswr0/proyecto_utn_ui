import { useParams } from "react-router";
import WorkspacesSidebar from "../components/WorkspacesSidebar";
import { useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { getWorkspaceDetailsAndMembers } from "../services/workspaceService";
import type { WorkspaceDetails, WorkspaceMember } from "../models";

const WorkspaceScreen = () => {
  const { workspaceId } = useParams();

  const { sendRequest, error, loading, response } = useRequest();

  useEffect(() => {
    const fetchWorkspaceDetailsAndMembers = () => {
      sendRequest({
        requestCb: async () => {
          return await getWorkspaceDetailsAndMembers(workspaceId || "");
        },
      });
    };

    fetchWorkspaceDetailsAndMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  const data = response?.data as {
    workspaceDetails: WorkspaceDetails;
    workspaceMembers: WorkspaceMember[];
  };

  const workspaceDetails = data.workspaceDetails;
  const workspaceMembers = data.workspaceMembers;
  return (
    <div className="flex h-screen bg-gray-100">
      <WorkspacesSidebar />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Members */}
        <aside className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Miembros</h2>
          {loading ? (
            <p className="text-gray-400 text-sm">Cargando miembros...</p>
          ) : error ? (
            <p className="text-red-400 text-sm">Error al cargar miembros</p>
          ) : workspaceMembers.length ? (
            <ul className="space-y-2">
              {workspaceMembers.map((member: WorkspaceMember) => (
                <li key={member.user_id} className="p-3 rounded-lg bg-gray-50">
                  <p className="font-medium">
                    {member.user_name} ({member.user_email})
                  </p>
                  {member.member_role && (
                    <p className="text-sm text-gray-500">
                      {member.member_role}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No hay miembros cargados.</p>
          )}
        </aside>

        {/* Details */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            {loading ? (
              <p className="text-gray-400 text-sm">Cargando detalles...</p>
            ) : error ? (
              <p className="text-red-400 text-sm">Error al cargar detalles</p>
            ) : (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                  {workspaceDetails.url_image ? (
                    <img
                      src={workspaceDetails.url_image}
                      alt={workspaceDetails.title || "Workspace"}
                      className="h-28 w-28 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-28 w-28 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                      Sin imagen
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold">
                      {workspaceDetails.title || "Workspace"}
                    </h1>
                    <p className="mt-2 text-gray-600">
                      {workspaceDetails.description || "Sin descripción"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm uppercase tracking-wide text-gray-500">
                      Activo
                    </p>
                    <p className="mt-2 font-medium">
                      {workspaceDetails.active ? "Sí" : "No"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm uppercase tracking-wide text-gray-500">
                      Creado
                    </p>
                    <p className="mt-2 font-medium">
                      {workspaceDetails.created_at
                        ? new Date(workspaceDetails.created_at).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkspaceScreen;
