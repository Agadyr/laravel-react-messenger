<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\MessageController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [\App\Http\Controllers\HomeController::class, 'home'])->name('dashboard');

    Route::get('/user/{user}', [MessageController::class, 'byUser'])->name('chat.user');
    Route::get('/group/{group}', [MessageController::class, 'byGroup'])->name('chat.group');

    Route::post('/message', [MessageController::class, 'store'])->name('messages.store');
    Route::delete('/message/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
    Route::get('/message/older/{message}', [MessageController::class, 'loadOlder'])->name('messages.loadOlder');
    //    Route::get('/user/{user}', function () {
//    })->name('chat.user');
//    Route::get('/group/{group}', function () {
//
//    })->name('chat.group');
    Route::get('/', [\App\Http\Controllers\HomeController::class, 'home'])->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
