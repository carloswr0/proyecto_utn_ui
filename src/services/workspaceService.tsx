import { ENVIRONTMENT } from "../../config/environment.config";
import { LOCAL_STORAGE_TOKEN } from "../constants";

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

export async function createWorkspace(params: { title: string; description: string, url_image: string }) {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  const response = await fetch(`${ENVIRONTMENT.URL_BACKEND}/api/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({...params, url_image: params.url_image || "https://placehold.co/600x400"}),
  });
  if (!response.ok) {
    throw new Error("Failed to create workspace");
  }
  return response.json();
}