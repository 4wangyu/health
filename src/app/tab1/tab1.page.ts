import { Component } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(private fbSvc: FirebaseService) {}

  update() {
    this.fbSvc.testUpdate();
  }
}
