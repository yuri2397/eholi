import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { RecitationsService } from "../services/recitations.service";
import { SurahService } from "../services/surah.service";
import { Ayah, Surah } from "../progression";
import { finalize } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: "app-attach-sourah-to-student",
  templateUrl: "./attach-sourah-to-student.component.html",
  styleUrls: ["./attach-sourah-to-student.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AttachSourahToStudentComponent implements OnInit {
  @Input("modal") modal: any;
  @Input("data") data: any;
  ayahs: Ayah[] = [];
  loading = false;
  selectedSurah: Surah;
  public sliderScalePipesValue: number[] = [0, 0];
  public configSliderScalePipes: any;
  fullAyahs: Ayah[];
  fullText: any;
  constructor(
    private _progressionService: RecitationsService,
    private _surahService: SurahService
  ) {}

  ngOnInit(): void {
    this.getSurahDétails();
  }
  getSurahDétails() {
    this.loading = true;
    this._surahService
      .show<Surah>(this.data.surah_id, { "with[]": ["ayahs"] })
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.sliderScalePipesValue = [
            this.min(response.ayahs),
            parseInt(this.max(response.ayahs)/2 + ""),
          ];
          this.configSliderScalePipes = {
            behaviour: "tap",
            connect: true,
            margin: 0,
            limit: response.ayahs.length,
            range: {
              min: this.min(response.ayahs),
              max: this.max(response.ayahs),
            },
            pips: {
              mode: "steps",
              density: 5,
            },
          };
          this.ayahs = response.ayahs;
          this.fullAyahs = this.ayahs;
          this.fullText = this._fullText;
        },
        error: (errors) => {
          console.log(errors);
        },
      });
  }

  max(tableau: Ayah[]) {
    if (tableau.length === 0) {
      return 0;
    }

    let max = tableau[0];

    for (const objet of tableau) {
      if (objet.number_inSurah > max.number_inSurah) {
        max = objet;
      }
    }

    return max.number_inSurah;
  }

  min(tableau: Ayah[]) {
    if (tableau.length === 0) {
      return 0;
    }

    let min = tableau[0];

    for (const objet of tableau) {
      if (objet.number_inSurah < min.number_inSurah) {
        min = objet;
      }
    }

    return min.number_inSurah;
  }

  onChange(data: any) {
    this.ayahs = this.fullAyahs.filter(
      (e) => data[0] <= e.number_inSurah && e.number_inSurah <= data[1]
    );
    this.fullText = this._fullText;
  }

  get _fullText() {
    let fullText = "";
    this.ayahs
      .sort((a, b) => a.number - b.number)
      .forEach((e) => {
        fullText +=
          e.text + " ۝" + this.toIndiaDiits(e.number_inSurah + "") + " ";
      });

    return fullText;
  }

  toIndiaDiits = function (val: string) {
    var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return val.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  save() {
    let data = {
      start: this.sliderScalePipesValue[0],
      end: this.sliderScalePipesValue[1],
      progression_id: this.data.id,
    };

    Swal.fire({
      title: "Attention !!!",
      text: "Voulez-vous ajoute ces ayats dans la liste?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, j'ajoute",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this._save(data);
      }
    });
  }
  private _save(data: { start: number; end: number; progression_id: any }) {
    this._progressionService
      .attachAyatsForStudent(data)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (response) => {
          this.modal.close(response);
        },
        error: (error) => {
          Swal.fire({
            title: "Oups !!!",
            text: error,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Fermer",
          });
        },
      });
  }
}
