import { Link, usePage } from '@inertiajs/react';
import { BarChart3, ListTodo, Settings, Users } from 'lucide-react';
import { route } from 'ziggy-js';

export default function Sidebar() {
    const { url } = usePage();

    const isActive = (href: string) => url.startsWith(href);

    return (
        <aside className="w-64 bg-gray-900 text-white shadow-lg">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-2xl font-bold">TaskLogger</h1>
            </div>

            <nav className="p-6 space-y-4">
                <Link
                    href={route('dashboard')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                        isActive('/dashboard')
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                    }`}
                >
                    <BarChart3 size={20} />
                    <span>Dashboard</span>
                </Link>

                <Link
                    href={route('task-logs.create')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                        isActive('/task-logs/create')
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                    }`}
                >
                    <ListTodo size={20} />
                    <span>Log Time</span>
                </Link>

                <Link
                    href={route('tasks.index')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                        isActive('/tasks')
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                    }`}
                >
                    <ListTodo size={20} />
                    <span>Manage Tasks</span>
                </Link>

                <Link
                    href={route('task-logs.index')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                        isActive('/task-logs')
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                    }`}
                >
                    <BarChart3 size={20} />
                    <span>Previous Logs</span>
                </Link>

                <hr className="border-gray-700 my-6" />

                <Link
                    href={route('admin.dashboard')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                        isActive('/admin')
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                    }`}
                >
                    <Users size={20} />
                    <span>Admin Dashboard</span>
                </Link>

                <Link
                    href={route('settings.profile.show')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                        isActive('/settings')
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                    }`}
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>
        </aside>
    );
}
