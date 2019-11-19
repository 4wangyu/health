import { Component, OnInit } from "@angular/core";
import { Act } from "../models/health.model";
import { FirebaseService } from "../services/firebase.service";
import { NavService } from "../services/nav.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.page.html",
  styleUrls: ["./history.page.scss"]
})
export class HistoryPage implements OnInit {
  constructor(private fbSvc: FirebaseService, private navSvc: NavService) {}

  acts: Act[];

  ngOnInit() {
    this.acts = this.fbSvc.getActs(this.navSvc.get("cat"));
  }
}
