import WorkspacesSidebar from "../components/WorkspacesSidebar";

const HomeScreen = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <WorkspacesSidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Fake Slack
          </h2>
          <p className="text-gray-600">Select a workspace to get started</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
