import { useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { getWorkspaces } from "../services/workspaceService";
import type { UserWorkspaces } from "../models";

const HomeScreen = () => {
	const { sendRequest, error, loading, response } = useRequest();

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

	const workspaces = response?.data as UserWorkspaces[] || [];

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 bg-gray-900 text-white flex flex-col">
				<div className="p-4 border-b border-gray-700">
					<h1 className="text-xl font-bold">Workspaces</h1>
				</div>

				<div className="flex-1 overflow-y-auto p-3">
					{loading && <p className="text-gray-400 text-sm">Loading...</p>}
					{error && <p className="text-red-400 text-sm">Error loading workspaces</p>}

					<div className="space-y-2">
						{workspaces.map((workspace: UserWorkspaces) => (
							<button
								key={workspace.workspace_id}
								className="w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition-colors text-gray-200 hover:text-white"
							>
								{workspace.workspace_title}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Fake Slack</h2>
					<p className="text-gray-600">Select a workspace to get started</p>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
