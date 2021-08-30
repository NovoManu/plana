<?php

function average_emission_factory($dates, $product): array
{
    $average = [];
    foreach ($dates as $date) {
        $products = [
            'methane' => rand(1700, 1900),
            'carbonmonoxide' => rand(3000, 3500) * 1E-6,
            'ozone' => rand(1500, 2000) * 1E-6,
            'nitrogendioxide' => rand(5E6, 6E6) * 1E-10,
        ];
        array_push($average, [
            'average' => $products[$product],
            'start' => $date,
            'end' => (new DateTime($date))
                ->modify('+1 day')
                ->format(DATE_FORMAT),
        ]);
    }
    return $average;
}
