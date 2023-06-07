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
</body>
</html>
