<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Déliration - {{ $class_level->name }} - {{ $semester->name }}</title>
    <link rel="stylesheet" href="{{ $appUrl }}/css/bootstrap.min.css">
    <style>
        td {
            font-size: 12px;
        }

        th {
            font-size: 12px;
            font-weight: bold;
            text-transform: capitalize;
        }

    </style>
</head>
<body class="p-3">
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
        <h5 class="text-center">Résultats de la délibération</h5>
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
                @foreach ($rows as $row)
                <tr>
                    <td class="text-uppercase">{{ $row['student']['first_name'] }} {{ $row['student']['last_name'] }}</td>
                    @foreach ($row['notes'] as $note)
                    <td class="text-center"> {{ $note['average'] }} </td>
                    @endforeach
                    <td class="text-center">{{ $row['final_note']['average'] }}</td>
                    <td class="text-center">{{ $row['final_note']['rang'] }}</td>
                    <td class="text-center">{{ $row['final_note']['mention'] }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </main>
    <footer></footer>
</body>
</html>
