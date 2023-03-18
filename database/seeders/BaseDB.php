<?php

namespace Database\Seeders;

use App\Models\Cycle;
use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BaseDB extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cycles = ["Préscolaire: EM – PS – MS – GS" => 1, "Élémentaire, CI – CP – CE1 – CE2 – CM1 – CM2" => 2, "Moyen, 6e – 5e – 4e – 3e" => 3,  "Secondaire, 2snd - 1er - Terminal" => 4];

        foreach ($cycles as $key => $value) {
            $cycle = new Cycle();
            $cycle->name = $key;
            $cycle->number = $value;
            $cycle->save();
        }

        $levels = [
            "1" => [
                [
                    "name" => "Maternel",
                    "number" => 1
                ],
                [
                    "name" => "Premiere section",
                    "number" => 2
                ],
                [
                    "name" => "Moyenne section",
                    "number" => 3
                ],
                [
                    "name" => "Grande section",
                    "number" => 4
                ],
            ],
            "2" => [
                [
                    "name" => "CI",
                    "number" => 1
                ],
                [
                    "name" => "CP",
                    "number" => 2
                ],
                [
                    "name" => "CE1",
                    "number" => 3
                ],
                [
                    "name" => "CE2",
                    "number" => 4
                ],
                [
                    "name" => "CM1",
                    "number" => 5
                ],
                [
                    "name" => "CM2",
                    "number" => 6
                ],
            ],
            "3" => [
                [
                    "name" => "6e",
                    "number" => 1
                ],
                [
                    "name" => "5e",
                    "number" => 2
                ],
                [
                    "name" => "4e",
                    "number" => 3
                ],
                [
                    "name" => "3e",
                    "number" => 4
                ],
            ],
            "4" => [
                [
                    "name" => "2nd",
                    "number" => 1
                ],
                [
                    "name" => "1er",
                    "number" => 2
                ],
                [
                    "name" => "Terminal",
                    "number" => 3
                ],
            ],
        ];

        foreach ($levels as $lk => $level) {
            foreach ($level as $lll) {
                $nl = new Level();
                $nl->name = $lll['name'];
                $nl->number = $lll['number'];
                $nl->cycle_id = Cycle::whereNumber($lk)->first()->id;
                $nl->save();
            }
        }
    }
}
