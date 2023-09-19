import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { RecitationsService } from "../services/recitations.service";
import { SurahService } from "../services/surah.service";
import { Surah } from "../progression";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-attach-sourah-to-student",
  templateUrl: "./attach-sourah-to-student.component.html",
  styleUrls: ["./attach-sourah-to-student.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AttachSourahToStudentComponent implements OnInit {
  @Input("modal") modal: any;
  @Input("surah") surah: any;
  searchLoad = false;
  surahs: Surah[] = [];
  selectedSurah: Surah;
  constructor(
    private _progressionService: RecitationsService,
    private _surahService: SurahService
  ) {}

  ngOnInit(): void {}

  searchSurah(data: string) {
    console.log(data);
    this._surahService
      .index<Surah>({ per_page: 10, page: 1, search: data })
      .pipe(
        finalize(() => {
          this.searchLoad = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.surahs = [...response.data];
        },
        error: (errors) => {
          console.log(errors);
        },
      });
  }

  selectEvent(data: any){
    console.log(data);
  }

  save() {}
}
