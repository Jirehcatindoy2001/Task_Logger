<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // <-- REQUIRED
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Employee Dashboard
     */
    public function employee(): Response
    {
        $userId = Auth::id(); 

        $todayLogs = TaskLog::with('task')
            ->where('user_id', $userId)
            ->whereDate('date', today())
            ->get();

        $activeTasks = Task::where('user_id', $userId)
            ->whereIn('status', ['pending', 'in_progress'])
            ->get();

        $stats = [
            'total_tasks' => Task::where('user_id', $userId)->count(),
            'completed_tasks' => Task::where('user_id', $userId)
                ->where('status', 'completed')
                ->count(),
            'hours_today' => TaskLog::where('user_id', $userId)
                ->whereDate('date', today())
                ->sum('hours'),
        ];

        return Inertia::render('Employee/Dashboard', [
            'todayLogs'     => $todayLogs,
            'activeTasks'   => $activeTasks,
            'stats'         => $stats,
        ]);
    }

    /**
     * Admin Dashboard
     */
    public function admin(): Response
    {
        $employees = User::with(['tasks', 'taskLogs'])
            ->withCount('tasks')
            ->get()
            ->map(function ($employee) {
                return [
                    'id'              => $employee->id,
                    'name'            => $employee->name,
                    'email'           => $employee->email,
                    'total_tasks'     => $employee->tasks_count,
                    'total_hours'     => $employee->taskLogs->sum('hours'),
                    'recent_activity' => $employee->taskLogs()->latest()->first()?->date,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'employees' => $employees,
        ]);
    }

    /**
     * Admin - Employee Details
     */
    public function employeeDetails(User $user): Response
    {
        $tasks = Task::with('taskLogs')
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($task) {
                return [
                    'id'          => $task->id,
                    'title'       => $task->title,
                    'status'      => $task->status,
                    'total_hours' => $task->totalHours(),
                    'logs'        => $task->taskLogs,
                ];
            });

        return Inertia::render('Admin/EmployeeDetails', [
            'employee' => $user,
            'tasks'    => $tasks,
        ]);
    }
}
