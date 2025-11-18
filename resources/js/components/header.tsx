import { usePage, Link } from '@inertiajs/react';
import { LogOut, User } from 'lucide-react';
import { route } from 'ziggy-js';

export default function Header() {
    const { auth } = usePage().props;

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex justify-between items-center px-8 py-4">
                <div>
                    <h2 className="text-sm text-gray-500">Welcome back,</h2>
                    <p className="text-lg font-semibold text-gray-900">
                        {auth.user?.name || 'User'}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href={route('settings.profile.show')}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition"
                    >
                        <User size={20} />
                        <span>Profile</span>
                    </Link>

                    <form method="POST" action={route('logout')} className="inline">
                        <input type="hidden" name="_token" value="" />
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 transition"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}
