<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskLogController extends Controller
{
    public function create(): Response
    {
        $tasks = Task::where('user_id', Auth::id())
            ->whereIn('status', ['pending', 'in_progress'])
            ->get();

        return Inertia::render('Employees/DailyTaskLogger', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
           'task_id' => 'required|exists:tasks,id',
           'date' => 'required|date',
           'hours' => 'required|numeric|min:0|max:24',
           'description' => 'nullable|string',
        ]);

        $task = Task::findOrFail($validated['task_id']);
        if ($task->user_id !== Auth::id()) {
            abort(403);
        }
        
        TaskLog::updateOrCreate(
            [
                'task_id' => $validated['task_id'],
                'user_id' => Auth::id(),
                'date' => $validated['date'],
            ],
            [
                'hours' => $validated['hours'],
                'description' => $validated['description'] ?? null,
            ]
        );

        return redirect()->back()->with('success', 'Task log saved successfully');

    }
    
    public function index(): Response
    {
        $taskLogs = TaskLog::with(['task', 'user'])
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Employees/PreviousLogs', [
            'taskLogs' => $taskLogs,
        ]);
    }

    public function destroy(TaskLog $taskLog)
    {
        if ($taskLog->user_id !== Auth::id()) {
            abort(403);
        }

        $taskLog->delete();

        return redirect()->back()->with('success', 'Task log deleted successfully');
    }

}
   