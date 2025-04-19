<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $position)
    {
        if (!$request->user() || !$this->checkRole($request->user()->account_type, $position)) {
            return Inertia::location(route('login.page'));
        }

        return $next($request);
    }

    private function checkRole($userRoleId, $requiredRoleId)
    {
        // Define your logic for checking the role here
        return $userRoleId == $requiredRoleId;
    }
}
