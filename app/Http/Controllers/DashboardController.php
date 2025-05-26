<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        $now = Carbon::now();
        $search = $request->search ?? 'Daily'; // Default to daily if not set

        switch ($search) {
            case 'Daily':
                $data = CartItem::selectRaw('DATE(created_at) as date, SUM(total) as sales, SUM(profit) as profits')
                    ->where('created_at', '>=', $now->copy()->subDays(6)->startOfDay())
                    ->groupBy('date')
                    ->orderBy('date')
                    ->get();
                break;

            case 'Weekly':
                $data = CartItem::selectRaw('YEARWEEK(created_at, 1) as date, SUM(total) as sales, SUM(profit) as profits')
                    ->where('created_at', '>=', $now->copy()->subWeeks(3)->startOfWeek())
                    ->groupBy('date')
                    ->orderBy('date')
                    ->get();
                break;

            case 'Monthly':
                $data = CartItem::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as date, SUM(total) as sales, SUM(profit) as profits')
                    ->where('created_at', '>=', $now->copy()->subMonths(5)->startOfMonth())
                    ->groupBy('date')
                    ->orderBy('date')
                    ->get();
                break;

            case 'Quarterly':
                $data = CartItem::selectRaw('CONCAT(YEAR(created_at), "-Q", QUARTER(created_at)) as date, SUM(total) as sales, SUM(profit) as profits')
                    ->where('created_at', '>=', $now->copy()->subMonths(12))
                    ->groupBy('date')
                    ->orderBy('date')
                    ->get();
                break;

            case 'Annually':
                $data = CartItem::selectRaw('YEAR(created_at) as date, SUM(total) as sales, SUM(profit) as profits')
                    ->where('created_at', '>=', $now->copy()->subYears(4)->startOfYear())
                    ->groupBy('date')
                    ->orderBy('date')
                    ->get();
                break;

            default:
                return response()->json(['error' => 'Invalid search parameter.'], 400);
        }


        

        return response()->json([
            'range' => $search,
            'result' => $data,
        ]);
    }
}
