import { DeliberationService } from "./../../services/deliberationservice";
import { Deliberation } from "./../../models/test-exam.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import Swal from "sweetalert2";
import { Location } from "@angular/common";
import { Utils } from "app/auth/helpers/utils";

@Component({
  selector: "app-class-level-deliberation-resultats",
  templateUrl: "./class-level-deliberation-resultats.component.html",
  styleUrls: ["./class-level-deliberation-resultats.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ClassLevelDeliberationResultatsComponent implements OnInit {
  contentHeader = {
    headerTitle: "Résultats de la délibération",
  };
  deliberation: Deliberation;
  results: any[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _deliService: DeliberationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.deliberation = data.deliberation?.deliberation;
      this.results = data.deliberation?.results;
    });
    // this.downloadResult();
  }

  printResults() {
    Utils.printContentHtml(this.results);
  }

  confirmDeliberation(item: any) {
    Swal.fire({
      title: "Attention !!!",
      text: "Si vous confirmez la déliberation, il vous sera impossible de revenir en arriere. Vous aura plus la possibilité de le supprimer ou de le mofidier. Etes-vous sûr?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Je confirme",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this._deliService.confirmDeliberation(this.deliberation).subscribe({
          next: (response: any) => {
            this.deliberation = response;
            Swal.fire({
              title: "Félicitation.",
              text: "Déliberation finalisée avec succès.",
              icon: "success",
              showCancelButton: false,
            })
          },
          error: (errors: any) => {
            console.log(errors);
            Swal.fire({
              title: "Erreur !!!",
              text: errors,
              icon: "error",
              showCancelButton: false,
            })
          },
        });
      }
    });
  }

  downloadResult() {
    this._deliService.downloadResults(this.deliberation).subscribe({
      next: (response: any) => {
        this.results = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  
  reloadDeliberation() {
    Swal.fire({
      title: "Attention !!!",
      text: "Si vous relancez la déliberation, tous les résultats seront perdu. Voulez-vous vraiment continuer?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Je relance",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this._reCreateDeliberation();
      }
    });
  }

  _reCreateDeliberation() {
    this._deliService
      .reCreateDeliberation(
        {
          semester_id: this.deliberation.semester_id,
          class_level_id: this.deliberation.class_level_id,
        },
        this.deliberation
      )
      .subscribe({
        next: (response: Deliberation) => {
          this._router.navigate(
            ["/pages/test-exams/deliberation/", response.id],
            { replaceUrl: true }
          );
        },
        error: (error: any) => {
          Swal.fire({
            title: "Error !!!",
            text: error,
            icon: "error",
            showCancelButton: false,
          });
        },
      });
  }
}
