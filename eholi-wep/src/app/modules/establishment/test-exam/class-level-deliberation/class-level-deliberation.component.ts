import { finalize } from "rxjs/operators";
import { Semester } from "./../../models/semester.model";
import {
  ClassLevelSemester,
  Deliberation,
} from "./../../models/test-exam.model";
import { LevelSemesterService } from "./../../services/level_semesterservice";
import { SemesterService } from "./../../services/semester.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DeliberationService } from "../../services/deliberationservice";
import Swal from "sweetalert2";

@Component({
  selector: "app-class-level-deliberation",
  templateUrl: "./class-level-deliberation.component.html",
  styleUrls: ["./class-level-deliberation.component.scss"],
})
export class ClassLevelDeliberationComponent implements OnInit {
  contentHeader: { headerTitle: string; actionButton: boolean };
  deliberations: Deliberation[] = [];
  classLevelSemester: ClassLevelSemester;
  classLevelId: any;
  constructor(
    private _deliberationService: DeliberationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _semesterService: SemesterService
  ) {
    this.contentHeader = {
      headerTitle: "Délibération de la classe",
      actionButton: false,
    };
  }

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.deliberations = data.deliberation;
      this.classLevelSemester = data.semester;
      // add check attr in semester if the semester whas in deliberation
      this.deliberations?.forEach((del) => {
        this.classLevelSemester.semesters.forEach((sem) => {
          if (sem.id === del.semester_id) {
            sem.created = true;
            sem.loading = del.status == "append";
          }
        });
      });
      console.log(data);
    });
    this.classLevelId = this._route.snapshot.queryParams["class_level_id"];
  }

  routerToDetails(semester: Semester, del?: Deliberation) {
    let deliberation = this.deliberations.find(
      (del) => del.semester_id === semester.id
    ) ?? del;
    
    this._router.navigate(["/pages/test-exams/deliberation", deliberation.id], {
      relativeTo: this._route,
      queryParams: {
        semester_id: semester.id,
        class_level_id: this.classLevelId,
      },
    });
  }

  async startDeliberation(semester: Semester) {
    semester.loading = true;
    await new Promise((resolve) => {
      this._checkIfDeliberationIsPossible(semester).subscribe({
        next: (data: any) => {
          this._storeDeliberation(semester);
        },
        error: (errors) => {
          console.log(errors);
          Swal.fire({
            title: "Attention !!!",
            text: errors,
            icon: "warning",
            showCancelButton: false,
          });
        },
      });
    });
  }

  _storeDeliberation(semester: Semester) {
    this._deliberationService
      .create<any>({
        class_level_id: this.classLevelId,
        semester_id: semester.id,
      })
      .pipe(finalize(() => (semester.loading = false)))
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (errors) => {
          console.log(errors);
          Swal.fire({
            title: "Oups !!!",
            text: errors,
            icon: "error",
            showCancelButton: false,
          });
        },
      });
  }

  confirmDeliberation(item: any) {
    Swal.fire({
      title: "Attention !!!",
      text: "Si vous confirmez la déliberation, il vous sera impossible de revenir en arriere. Vous aura plus la possibilité de le supprimer ou de le mofidier.<br> Etes-vous sûr?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Je confirme",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this._deliberationService
          .confirmDeliberation(
            this.deliberations.find((e) => e.semester_id === item.id)
          )
          .subscribe({
            next: (response: any) => {
              console.log(response);
              this._router.navigate([], {
                queryParams: { class_level_id: this.classLevelId },
              });
            },
            error: (errors: any) => {
              console.log(errors);
            },
          });
      }
    });
  }

  _checkIfDeliberationIsPossible(semester: Semester) {
    return this._deliberationService.checkIfDeliberationIsPossible({
      class_level_id: this.classLevelId,
      semester_id: semester.id,
    });
  }
}
