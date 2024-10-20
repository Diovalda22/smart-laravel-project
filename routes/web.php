<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MemberCategoryController;
use App\Http\Controllers\Admin\MemberController;
use Illuminate\Support\Facades\Route;

const BY_ID = "/{id}";
const ENDPOINT_DETAIL_BY_ID = '/detail' . BY_ID;
const ENDPOINT_EDIT_BY_ID = '/update' . BY_ID;
const ENDPOINT_DO_UPDATE_BY_ID = '/update' . BY_ID;
const ENDPOINT_DELETE_BY_ID = '/delete' . BY_ID;

Route::get("/", function() {
    return redirect("admin/auth/login");
});

Route::get('/admin/auth/login', [AuthController::class, 'login'])->name('login');
Route::post('/admin/auth/login', [AuthController::class, 'doLogin'])->name('do-login');
Route::get('/admin/auth/logout', [AuthController::class, 'doLogout'])->name('do-logout');

Route::prefix('admin')->middleware("auth")->group(function () {
    Route::get('/', [DashboardController::class, 'index']);

    Route::prefix('member')->group(function () {
        Route::get('/', [MemberController::class, 'index']);
        Route::get('/api/search', [MemberController::class, 'searchAPI']);
        Route::get('/add', [MemberController::class, 'add']);
        Route::post('/add', [MemberController::class, 'doCreate']);
        Route::get('/detail/{id}', [MemberController::class, 'detail']);
        Route::get(ENDPOINT_EDIT_BY_ID, [MemberController::class, 'update']);
        Route::post(ENDPOINT_DO_UPDATE_BY_ID, [MemberController::class, 'doUpdate']);
        Route::get(ENDPOINT_DELETE_BY_ID, [MemberController::class, 'doDelete']);
    });
    
    Route::prefix('member-category')->group(function () {
        Route::get('/', [MemberCategoryController::class, 'index']);
        Route::get('/add', [MemberCategoryController::class, 'add']);
        Route::post('/add', [MemberCategoryController::class, 'doCreate']);
        Route::get(ENDPOINT_EDIT_BY_ID, [MemberCategoryController::class, 'update']);
        Route::post(ENDPOINT_DO_UPDATE_BY_ID, [MemberCategoryController::class, 'doUpdate']);
        Route::get(ENDPOINT_DELETE_BY_ID, [MemberCategoryController::class, 'doDelete']);
    });
});