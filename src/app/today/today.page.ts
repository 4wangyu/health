import { Component } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: "app-today",
  templateUrl: "today.page.html",
  styleUrls: ["today.page.scss"]
})
export class TodayPage {
  constructor(private fbSvc: FirebaseService) {}

  update() {
    this.fbSvc.testUpdate();
  }
}
