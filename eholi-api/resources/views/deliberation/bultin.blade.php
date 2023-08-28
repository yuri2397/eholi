<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Déliration - {{ $class_level->name }} - {{ $semester->name }}</title>
    <link rel="stylesheet" href="{{ $appUrl }}/css/bootstrap.min.css">
    <style>
        * {
            font-family: "Helvetica", sans-serif;
        }

        td {
            font-size: 12px;
        }

        th {
            font-size: 12px;
            font-weight: bold;
            text-transform: capitalize;
        }

        .bold {
            font-weight: bold;
        }

        .line {
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            height: 4px;
            width: 100%;
            display: block;
        }

        .bg-s{
            background-color: #eeeeeed7;
        }

        .lead {
            font-size: 14px;
        }

    </style>
</head>
<body>
    <header class="d-flex align-items-center justify-content-between ">
        <div>
            <span class="lead d-block">IA DIOURBEL</span>
            <span class="lead d-block">IEF DE MBACKE</span>
            <span class="lead d-block">C-P Hawdoul-Mawroud</span>
        </div>
        <div>
            <span class="lead d-block">Année Scolaire: {{ $school_year->start_end }}</span>
            <span class="lead d-block">Semestre: {{ $semester->number }}</span>
            <span class="lead d-block">Classe: {{ $class_level->name }}</span>
        </div>
    </header>
    <main>
        <br>

        <div class="text-center">
            <span class="h5 d-block bold bg-s">BULLETIN DE NOTES</span>
        </div>
        <br>
        <div class="d-flex align-items-start justify-content-between">
            <div>
                <span class="lead d-inline-block">Matricule: <span class="bold text-uppercase">{{ $student->reference }}</span> </span>
                <span class="lead d-block">Prénom(s): <span class="bold">{{ $student->first_name }}</span> </span>
                <span class="lead d-block">Nom: <span class="bold">{{ $student->last_name }}</span> </span>
                <span class="lead d-block">Né(e) le: <span class="bold">{{ date('d-m-Y', strtotime($student->birth_at)) }} </span>à <span class="bold">{{ $student->birth_in }} </span>
                <span class="lead d-block">Sexe: <span class="bold text-uppercase">@if ($student->sexe == "m")
                    Masculin
                @else
                    Féminin
                @endif</span> </span>

            </div>
            <div>
                <span class="lead d-block">Tel: <span class="bold text-capitalize">{{ $school->phone }}</span> </span>
                <span class="lead d-block">Email: <span class="bold">{{ $school->email }}</span> </span>
                <span class="lead d-block">Classe: <span class="bold">{{ $class_level->name }}</span> </span>
                <span class="lead d-block">Nb. apprenants: <span class="bold">{{ $nb_students }}</span> </span>
            </div>
        </div>
        <br>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    @foreach ($headers as $head)
                    <th> {{ $head }} </th>
                    @endforeach
                </tr>
            </thead>
            <tbody>
                @foreach ($results as $res)
                <tr>
                    <td class="text-start">{{ $res->name }}</td>
                    <td class="text-center">{{ $res->duty_average }}</td>
                    <td class="text-center">{{ $res->exam_average }}</td>
                    <td class="text-center">{{ $res->average }}</td>
                    <td class="text-center">{{ $res->coef }}</td>
                    <td class="text-center">{{ $res->coef * $res->average }}</td>
                    <td class="text-center">{{ $res->rang }}</td>
                    <td class="text-center">{{ $res->mention }}</td>
                </tr>
                @endforeach
                <tr>
                    <td colspan="4" class="text-right bold text-uppercase">Total</td>
                    <td class="bold text-center">{{ $total_coef }}</td>
                    <td class="bold text-center">{{ $total_average_coef }}</td>
                    <td>ABSENCES</td>
                    <td class="bold text-center">0</td>
                </tr>
                <tr class="align-items-center">
                    <td class="text-right bold text-uppercase">Moy. Générale</td>
                    <td class="bold ">
                        <h5 class="d-inline-block">{{ $deliberation_item->average }}</h5>
                        <small>/ {{ $base_note }}</small>
                    </td>
                    <td>RANG</td>
                    <td class="bold">
                        <h5 class="d-inline-block me-1">{{ $deliberation_item->rang }}</h5><small>e</small>
                    </td>
                    <td>Retards</td>
                    <td>0</td>
                    <td>Abs. Total</td>
                    <td>0</td>
                </tr>
            </tbody>
            <br>

        </table>
        @if ($is_last_semester)
        <div class="row">
            <div class="col">
                {{-- Admin, Rebouble, Exclu avec des case à coche  --}}
                <div class="col d-inline-block w-100">
                    <span class="lead bold">Appréciation du conseils de classe:</span>

                    <table class="table table-bordered">
                        <tr>
                            <td>Admis(e) en classe superieur</td>
                            <td>@if ($deliberation_item->decision != 'redoubler')
                                <span class="lead bold h2">X</span>
                                @endif</td>
                        </tr>
                        <br>
                        <tr>
                            <td>Autorisé(e) à redoublé(e)</td>
                            <td>@if ($deliberation_item->decision == 'redoubler')
                                <span class="lead bold h2">X</span>
                                @endif</td>
                        </tr>
                        <br>
                        <tr>
                            <td>Exclusion</td>
                            <td>.</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col d-inline-block w-100">
                <span class="lead bold">Chef de l'établissement</span> <br>
                <br>
                <div class="border border-1 d-inline-block w-100" style="height: 100px"></div>
            </div>
        </div>
        @else
        <div class="row">
            <div class="col">
                {{-- Admin, Rebouble, Exclu avec des case à coche  --}}
                <div class="col d-inline-block w-100">
                    <span class="lead bold">Appréciation du conseils de classe:</span>
                    <table class="table table-bordered">
                        <tr>
                            <td>Travail excellent</td>
                            <td>
                                @if ($deliberation_item->mention == 'excellent')
                                <span class="lead bold h2 text-center">X</span>
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td>Satisfaissant doit continuer</td>
                            <td>
                                @if ($deliberation_item->mention == 'very_good' || $deliberation_item->mention == "good")
                                <span class="lead bold h2 text-center">X</span>
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td>Peut mieux faire</td>
                            <td>
                                @if ($deliberation_item->mention == 'passable')
                                <span class="lead bold h2 text-center">X</span>
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td>Insuffisant</td>
                            <td>
                                @if ($deliberation_item->mention == 'mediocre')
                                <span class="lead bold h2 text-center">X</span>
                                @endif
                            </td>
                        </tr>
                        <br>
                        <tr>
                            <td>Risque de redoubler</td>
                            <td>
                                @if ($deliberation_item->mention == 'weak')
                                <span class="lead bold h2 text-center">X</span>
                                @endif
                            </td>
                        </tr>
                        <br>
                        <tr>
                            <td>Risque l'exclusion</td>
                            <td>
                                @if ($deliberation_item->mention == 'very_weak')
                                <span class="lead bold h2 text-center">X</span>
                                @endif
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
            <div class="col d-inline-block w-100">
                <span class="lead bold">Le directeur</span> <br>
                <br>
                <div class="border border-1 d-inline-block w-100" style="height: 100px"></div>
            </div>
        </div>
        @endif

    </main>
</body>
</html>
