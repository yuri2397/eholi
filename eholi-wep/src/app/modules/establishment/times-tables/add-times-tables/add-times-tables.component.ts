import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import {
  CalendarOptions,
  EventAddArg,
  EventChangeArg,
  EventClickArg,
  EventRemoveArg,
} from "@fullcalendar/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { TimesTable, TimesTableRows } from "../../models/times_table.model";
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TimesTablesService } from "../../services/times_table.service";

@Component({
  selector: "app-add-times-tables",
  templateUrl: "./add-times-tables.component.html",
  styleUrls: ["./add-times-tables.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddTimesTablesComponent implements OnInit, AfterViewInit {
  timesTable: TimesTable;
  @Input("id") id: string;

  public events: any[] = [];
  calendarOptions: CalendarOptions;

  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal,
    private _timesTablesService: TimesTablesService
  ) {}

  handleEventRemove(arg: EventRemoveArg) {
    console.log("handleEventRemove", arg.event);
  }

  handleEventAdd(arg: EventAddArg) {
    console.log("handleEventAdd", arg.event);
  }

  handleEventChange(arg: EventChangeArg) {
    console.log("handleEventChange", arg.event);
  }

  handleUpdateEventClick(eventRef: EventClickArg) {
    console.log(eventRef.event._def);
  }

  toggleSidebar(name): void {
    console.log("toggleSidebar", name);
  }

  handleDateSelect(eventRef) {
    console.log(eventRef);
  }

  eventClass(s) {
    const calendarsColor = {
      Business: "primary",
      Holiday: "success",
      Personal: "danger",
      Family: "warning",
      ETC: "info",
    };

    const colorName = calendarsColor[s.event._def.extendedProps.calendar];
    return `bg-light-${colorName}`;
  }

  ngAfterViewInit(): void {
    console.log(this.id)
    const now = new Date();
    if (this.id) {
      this._timesTablesService.show(this.id).subscribe((data) => {
        this.timesTable = data;
        this.events = [
          ...this.timesTable?.rows?.map((item: TimesTableRows) => {
            return {
              id: item?.id,
              title: item?.class_level_has_course?.course?.name,
              start: new Date(item?.start),
              end: item?.end,
              allDay: false,
              color: "rgba(29,97,122,0.72)",
              extendedProps: {
                calendar: item?.class_level_has_course?.course?.name,
              },
            };
          }),
        ];

        this.calendarOptions = {
          headerToolbar: {
            start: "sidebarToggle, prev,next, title",
            center: "",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          },
          weekends: true,
          events: this.events,
          editable: true,
          weekNumbers: true,
          weekNumberCalculation: "ISO",
          eventResizableFromStart: true,
          selectable: true,
          views: {
            timeGridWeek: {
              dayHeaderFormat: {
                weekday: "short",
                omitCommas: true,
              },
            },
          },
          slotMinTime: "08:00:00",
          slotMaxTime: "20:00:00",
          slotDuration: "00:30:00",
          selectMirror: true,
          dayMaxEvents: 4,
          navLinks: false,
          weekText: "S",
          locale: "fr",
          locales: [{ code: "fr" }],
          eventAdd: this.handleEventAdd.bind(this),
          eventChange: this.handleEventChange.bind(this),
          eventRemove: this.handleEventRemove.bind(this),
          eventClick: this.handleUpdateEventClick.bind(this),
          eventClassNames: this.eventClass.bind(this),
          select: this.handleDateSelect.bind(this),
        };
      });
    } else {
      this._route.data.subscribe((data) => {
        this.timesTable = data.data;
        this.events = [
          ...this.timesTable?.rows?.map((item: TimesTableRows) => {
            return {
              id: item?.id,
              title: item?.class_level_has_course?.course?.name,
              start: new Date(item?.start),
              end: item?.end,
              allDay: false,
              color: "rgba(29,97,122,0.72)",
              extendedProps: {
                calendar: item?.class_level_has_course?.course?.name,
              },
            };
          }),
        ];

        this.calendarOptions = {
          headerToolbar: {
            start: "sidebarToggle, prev,next, title",
            center: "",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          },
          weekends: true,
          events: this.events,
          editable: true,
          weekNumbers: true,
          weekNumberCalculation: "ISO",
          eventResizableFromStart: true,
          selectable: true,
          views: {
            timeGridWeek: {
              dayHeaderFormat: {
                weekday: "short",
                omitCommas: true,
              },
            },
          },
          slotMinTime: "08:00:00",
          slotMaxTime: "20:00:00",
          slotDuration: "00:30:00",
          selectMirror: true,
          dayMaxEvents: 4,
          navLinks: false,
          weekText: "S",
          locale: "fr",
          locales: [{ code: "fr" }],
          eventAdd: this.handleEventAdd.bind(this),
          eventChange: this.handleEventChange.bind(this),
          eventRemove: this.handleEventRemove.bind(this),
          eventClick: this.handleUpdateEventClick.bind(this),
          eventClassNames: this.eventClass.bind(this),
          select: this.handleDateSelect.bind(this),
        };
      });
    }
  }

  ngOnInit(): void {
    
  }

  openCreateModal(createModal: any) {
    this._modalService
      .open(createModal, {
        centered: true,
        size: "lg",
      })
      .result.then((result) => {
        if (result) {
          console.log(result);
          this._router.navigate([], { relativeTo: this._route });
        }
      })
      .catch((_) => {});
  }
}
