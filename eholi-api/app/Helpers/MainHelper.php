<?php

if (!function_exists('active_shool_year')) {


    function active_shool_year()
    {
        if (($user = auth()->user())) {
        }

        return throw new Exception('Unauthenticate 401', 401);
    }
}
