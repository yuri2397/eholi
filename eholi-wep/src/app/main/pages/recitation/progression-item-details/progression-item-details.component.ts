import { Component, OnInit, Input } from "@angular/core";
import { NzModalRef } from "ng-zorro-antd/modal";

@Component({
  selector: "app-progression-item-details",
  templateUrl: "./progression-item-details.component.html",
  styleUrls: ["./progression-item-details.component.scss"],
})
export class ProgressionItemDetailsComponent implements OnInit {
  @Input("data") data: any;
  @Input("modal") modal: any;
  constructor() {}

  ngOnInit(): void {}

  get fullText() {
    let fullText = "";
    this.data.data.forEach((e) => {
      fullText += e.text + " ۝" + this.toIndiaDiits(e.number_inSurah + '')  + " ";
    });

    return fullText;
  }

  toIndiaDiits = function (val: string) {
    var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return val.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };
}
