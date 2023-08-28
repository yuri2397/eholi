<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Carte Etudiants</title>
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

        .text-primary {
            color: #7367f0 !important
        }

        .bg-primary {
            background-color: #7367f0 !important;
        }

        .rotate {

            transform: rotate(-90deg);

            /* Legacy vendor prefixes that you probably don't need... */

            /* Safari */
            -webkit-transform: rotate(-90deg);

            /* Firefox */
            -moz-transform: rotate(-90deg);

            /* IE */
            -ms-transform: rotate(-90deg);

            /* Opera */
            -o-transform: rotate(-90deg);

            /* Internet Explorer */
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);

        }

        .rot-text {
            position: relative;
            bottom: 8px;
            left: 5px;
        }

        .cart-h {
            width: 100%;
            height: 90px;
            background: linear-gradient(to bottom right, #3333cc 0%, #9933ff 68%);
            color: white;
        }

        .cart-img {
            padding: 8px;
            border-radius: 8px;
            position: relative;
            top: -40px;
            background-color: white;
            object-fit: contain;
        }

        .cart-name {
            position: relative;
            top: -40px;
        }

    </style>
</head>
<body>
    @php
    $generator = new Picqer\Barcode\BarcodeGeneratorHTML();
    @endphp
    <div class="py-5">
        <div>
            <div class="row hidden-md-up">
                @foreach ($students as $st)
                <div class="col-md-4 my-2 p-3 border">
                    <div class="cart-h">
                        <div class="d-flex h5 bold p-2 justify-content-between">
                            <div>
                                {{ $school->name }}
                            </div>
                            <div>
                                {{ $school_year->start_end }}
                            </div>
                        </div>
                    </div>
                    <div class="d-flex px-3 align-items-end ">
                        <img class="cart-img border border-1" src="@if ($st->media != null && count($st->media))
                {{ $st->media[0]->original_url }}
            @else
            {{ $appUrl }}/images/logo.png
            @endif" width="110" height="110">
                        <div class="cart-name mx-2  text-start">
                            <h5 class="bold text-capitalize">
                                {{ $st->first_name }} {{ $st->last_name }}
                            </h5>
                            <span class="lead">N° dossier: <span class="bold text-uppercase">{{ $st->reference }}</span></span>
                        </div>
                    </div>
                    <div class="d-flex mx-3 align-item-center justify-content-between">
                        <div>
                            <p class="card-text p-y-1 h6">Né(e): <span class="bold">{{ $st->birth_at }}</span></p>
                            <p class="card-text p-y-1 h6">Adresse: <span class="bold">{{ $st->adress }}</span></p>
                            <p class="card-text p-y-1 h6">Classe: <span class="bold">{{ $class_level->name }}</span></p>
                        </div>
                        <div class="text-center">
                            <span class="lead">Le directeur</span>
                            <br><br>
                            {!! $generator->getBarcode($st->reference, $generator::TYPE_CODE_128) !!}
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
</body>
