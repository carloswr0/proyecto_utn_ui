import { ENVIRONTMENT } from "../../config/environment.config";
import { LOCAL_STORAGE_TOKEN } from "../contexts/Auth/AuthProvider";

export const getWorkspaces = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  const response = await fetch(`${ENVIRONTMENT.URL_BACKEND}/api/workspaces/get-user-workspaces`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch workspaces");
  }
  return response.json();
};
