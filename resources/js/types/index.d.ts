import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties
}

export interface Task {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
    user?: User;
    task_logs?: TaskLog[];
    total_hours?: number;
}

export interface TaskLog {
    id: number;
    task_id: number;
    user_id: number;
    date: string;
    hours: number;
    description: string | null;
    created_at: string;
    updated_at: string;
    task?: Task;
    user?: User;
}

export interface DashboardStats {
    total_tasks: number;
    completed_tasks: number;
    hours_today: number;
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    total_tasks: number;
    total_hours: number;
    recent_activity: string | null;
}
