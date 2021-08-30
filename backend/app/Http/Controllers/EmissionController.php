<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmissionController extends Controller
{
    public function getProducts(): JsonResponse
    {
        $products = [
            [
                'name' => 'methane',
                'product_variable' => 'methane_mixing_ratio_bias_corrected'
            ],
            [
                'name' => 'carbonmonoxide',
                'product_variable' => 'carbonmonoxide_total_column'
            ],
            [
                'name' => 'ozone',
                'product_variable' => 'ozone_total_vertical_column'
            ],
            [
                'name' => 'nitrogendioxide',
                'product_variable' => 'nitrogendioxide_tropospheric_column'
            ]
        ];
        return response()->json($products);
    }

    public function getProductAverage(Request $request, $product): JsonResponse
    {
        $request->validate([
            'limit' => ['numeric'],
            'begin' => ['date'],
            'end' => ['date'],
        ]);
        $limit = $request->query('limit');
        $begin = $request->query('begin')  or '2019-01-01';
        $end= $request->query('end');

        $dates = createDatesArray($begin, $end, $limit);

        $average = average_emission_factory($dates, $product);
        return response()->json($average);
    }
}
