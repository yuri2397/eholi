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
      console.log(this.details);
    });
    this._surahService.index<any>().subscribe({
      next: (response: any) => {
        this.surahs = response;
        console.log(this.surahs);
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
          console.log(response);
          this.currentProgressionDetails = response.ayahs;
          console.log(this.currentProgressionDetails);
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
        console.log(result, "result");
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
        console.log(surah)
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
          console.log(errors);
        },
      });
  }

  addNewSourah(modal: any, progressions: any) {
    this.selectedProg = progressions;
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: "modal modal-primary",
        size: "lg",
        keyboard: false,
      })
      .result.then((result) => {
        console.log(result, "result");
      })
      .catch((_) => {});
  }
}
