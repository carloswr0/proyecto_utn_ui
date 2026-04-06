import { useEffect } from "react";
import useRequest from "../hooks/useRequest";
import type { UserWorkspaces } from "../models";
import { getWorkspaces } from "../services/workspaceService";
import { useNavigate } from "react-router";

const WorkspacesSidebar = () => {
  const { sendRequest, error, loading, response } = useRequest();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("HomeScreen mounted, fetching workspaces...");
    const fetchWorkspaces = () => {
      sendRequest({
        requestCb: async () => {
          return await getWorkspaces();
        },
      });
    };

    fetchWorkspaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const workspaces = (response?.data as UserWorkspaces[]) || [];
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Workspaces</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {loading && <p className="text-gray-400 text-sm">Loading...</p>}
        {error && (
          <p className="text-red-400 text-sm">Error loading workspaces</p>
        )}

        <div className="space-y-2">
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition-colors text-gray-200 hover:text-white"
            onClick={() => navigate("/workspace/new")}
          >
            Create New Workspace
          </button>
          {workspaces.map((workspace: UserWorkspaces) => (
            <button
              onClick={() => navigate(`/workspace/${workspace.workspace_id}`)}
              key={workspace.workspace_id}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition-colors text-gray-200 hover:text-white"
            >
              {workspace.workspace_title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspacesSidebar;
