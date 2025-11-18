import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { User } from '@/types';
import { Task, TaskLog, DashboardStats } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { useEffect, useState } from 'react';


interface Props {
    todayLogs: TaskLog[];
    activeTasks: Task[];
    stats: DashboardStats;
}

export default function Dashboard({ todayLogs, activeTasks, stats }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Employee Dashboard" />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{stats.total_tasks}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{stats.completed_tasks}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Hours Today</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{stats.hours_today}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-4 mb-8">
                    <Link href={route('task-logs.create')}>
                        <Button>Log Time</Button>
                    </Link>
                    <Link href={route('task-logs.index')}>
                        <Button variant="outline">View Previous Logs</Button>
                    </Link>
                    <Link href={route('tasks.index')}>
                        <Button variant="outline">Manage Tasks</Button>
                    </Link>
                </div>

                {/* Today's Logs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Logged Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {todayLogs.length === 0 ? (
                            <p className="text-gray-500">No time logged today</p>
                        ) : (
                            <div className="space-y-4">
                                {todayLogs.map((log) => (
                                    <div key={log.id} className="flex justify-between items-center border-b pb-2">
                                        <div>
                                            <p className="font-semibold">{log.task?.title}</p>
                                            <p className="text-sm text-gray-600">{log.description}</p>
                                        </div>
                                        <p className="font-bold">{log.hours} hours</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}