import { finalize } from "rxjs/operators";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Ayah, Progression, ProgressionDetails, Surah } from "../progression";
import { RecitationsService } from "../services/recitations.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { ProgressionItemDetailsComponent } from "../progression-item-details/progression-item-details.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SurahService } from "../services/surah.service";
import Swal from "sweetalert2";
import { ToastrService, GlobalConfig } from 'ngx-toastr';

@Component({
  selector: "app-recitation-details",
  templateUrl: "./recitation-details.component.html",
  styleUrls: ["./recitation-details.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RecitationDetailsComponent implements OnInit {
  details: ProgressionDetails;
  loadDetails = false;
  currentProgressionDetails: { data: Ayah[]; config: any };
  selectedData: any;
  surahs: Surah[] = [];
  selectedSurah: Surah;
  selectedProg: any;
  constructor(
    private _route: ActivatedRoute,
    private _progressionService: RecitationsService,
    private _modalService: NgbModal,
    private _surahService: SurahService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._route.data.subscribe((data) => {
      this.details = data.progression as ProgressionDetails;
    });
    this._surahService.index<any>().subscribe({
      next: (response: any) => {
        this.surahs = response;
      },
    });
  }

  onPanelChange(data: any, panel: any) {
    let id: number = data.panelId.substring(2);
    let progression = this.details.progressions.filter((e) => {
      if (e.surah.number == id) {
        return e;
      }
    })[0];

    console.log(progression);
    this.loadDetails = true;
    this._progressionService
      .studentProgressionDetails(progression.id)
      .pipe(
        finalize(() => {
          this.loadDetails = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.currentProgressionDetails = response.ayahs;
        },
        error: (errors) => {
          console.log(errors);
        },
      });
  }

  showDetailsItem(modal: any, data: Progression) {
    this.selectedData = data;
    this.selectedSurah = this.surahs.find((e) => e.id == data.surah_id);
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: "modal modal-primary",
        size: "xl",
        keyboard: false,
      })
      .result.then((result) => {
      })
      .catch((_) => {});
  }

  attachSurah(surah: Surah) {
    Swal.fire({
      title: "Information",
      text: "Voulez-vous ajoute ce sourate dans la liste?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, j'ajoute",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this._addSurahToStudent(surah);
      }
    });
  }

  private _addSurahToStudent(surah: Surah) {
    this._progressionService
      .create({
        surah_id: surah.id,
        student_id: this.details.id,
      })
      .pipe()
      .subscribe({
        next: (response: any) => {
            this._toastr.success('Sourate ajouté avec succès..', 'Success!', {
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            this._router.navigate([], { relativeTo: this._route })
        },
        error: (errors) => {
          Swal.fire({
            title: "Oups !!!",
            text: errors,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Fermer",
          })
        },
      });
  }

  itemStart(data: any) {
   let firstAyat = data.data[0];
   return " ۝" + this.convertirEnChiffresArabes( data.config.start_ayah_number - ( firstAyat.number  - 1))
  }

  itemEnd(data: { config: any, data: Ayah[]}) {
    let firstAyat = data.data[0];
    return " ۝" + this.convertirEnChiffresArabes(data.config.end_ayah_number - ( firstAyat.number  - 1))
   }

   convertirEnChiffresArabes(nombre: number): string {
    const chiffresArabes = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    const nombreEnChiffres = nombre.toString().split('').map(digit => chiffresArabes[parseInt(digit)]);

    return nombreEnChiffres.join('');
}


  addNewSourah(modal: any, progressions: any) {
    this.selectedProg = progressions;
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: "modal modal-primary",
        size: "xl",
        keyboard: false,
      })
      .result.then((result: Progression) => {
        console.log(result, "result");
        let index = this.details.progressions.indexOf(this.details.progressions.find(e => e.id === result.id));
        this.details.progressions.fill(result, index, index + 1);
        this.details.progressions = [...this.details.progressions];
        this._router.navigate([], { queryParams: { refresh: Math.random() * 100 ,} , queryParamsHandling: 'merge',  })
      })
      .catch((_) => {});
  }
}
