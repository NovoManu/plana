<?php

function createDatesArray($begin, $end, $limit): array
{
    $period = new DatePeriod(
        new DateTime($begin),
        new DateInterval('P1D'),
        new DateTime($end)
    );
    $dates = [];
    foreach ($period as $date) {
        array_push($dates, $date->format(DATE_FORMAT));
    }
    if ($limit) {
        $dates = array_slice($dates, 0, $limit);
    }
    return $dates;
}

