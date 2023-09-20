import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { RecitationsService } from "../services/recitations.service";
import { SurahService } from "../services/surah.service";
import { Ayah, Surah } from "../progression";
import { finalize } from "rxjs/operators";

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
    console.log(this.data);
    console.log(this.modal);
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
          this.sliderScalePipesValue = [1, parseInt((response.ayahs.length / 2) + "")];
          this.configSliderScalePipes =  {
            behaviour: "tap",
            connect: true,
            margin: 0,
            limit: response.ayahs.length,
            range: {
              min: 0,
              max: response.ayahs.length
            },
            pips: {
              mode: 'steps',
              density: 5
            }
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

  onChange(data: any){
    this.ayahs = this.fullAyahs.filter((e) =>  (data[0] <= e.number_inSurah && e.number_inSurah <= data[1])  );
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

  save() {}
}
