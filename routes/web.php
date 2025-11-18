<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskLogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Employee Dashboard (REPLACE the existing dashboard route)
    Route::get('dashboard', [DashboardController::class, 'employee'])
        ->name('dashboard');

    // Task Management (CRUD)
    Route::prefix('tasks')->name('tasks.')->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name('index');
        Route::post('/', [TaskController::class, 'store'])->name('store');
        Route::put('/{task}', [TaskController::class, 'update'])->name('update');
        Route::delete('/{task}', [TaskController::class, 'destroy'])->name('destroy');
    });

    // Task Logging (Daily Time Entry)
    Route::prefix('task-logs')->name('task-logs.')->group(function () {
        Route::get('/create', [TaskLogController::class, 'create'])->name('create');
        Route::post('/', [TaskLogController::class, 'store'])->name('store');
        Route::get('/', [TaskLogController::class, 'index'])->name('index');
        Route::delete('/{taskLog}', [TaskLogController::class, 'destroy'])->name('destroy');
    });

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');
        Route::get('/employees/{user}', [DashboardController::class, 'employeeDetails'])->name('employee.details');
    });
});

require __DIR__.'/settings.php';