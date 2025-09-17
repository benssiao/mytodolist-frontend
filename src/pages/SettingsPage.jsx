import { useAuth } from "../hooks/useAuth";

function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex-1 py-20 grid grid-cols-[1fr_3fr_1fr]">
      <div></div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <p className="mt-1 text-sm text-gray-900">{user?.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <p className="mt-1 text-sm text-gray-900">{user?.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Roles
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {user?.roles?.join(", ")}
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default SettingsPage;
