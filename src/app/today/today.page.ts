import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";
import * as moment from "moment";
import { Action, DocumentSnapshot } from "@angular/fire/firestore";
import { User, Activity, Data } from "../models/health.model";

@Component({
  selector: "app-today",
  templateUrl: "today.page.html",
  styleUrls: ["today.page.scss"]
})
export class TodayPage implements OnInit {
  constructor(private fbSvc: FirebaseService) {}

  today = moment().format("YYYY-MM-DD");
  date = this.today;
  categories: string[];
  todayActivities: Activity[];
  historicalActivities: Activity[];
  input: string;
  activityType: string;

  ngOnInit() {
    const userRef = this.fbSvc.getUserRef();
    userRef
      .snapshotChanges()
      .subscribe(
        (res: Action<DocumentSnapshot<User>>) =>
          (this.categories = res.payload.data().categories)
      );

    const dataRef = this.fbSvc.getDataRef();
    dataRef
      .doc(this.today)
      .valueChanges()
      .subscribe((res: Data) => {
        if (res) {
          this.todayActivities = res.activities;
        }
      });
  }

  delete(act: Activity, isToday: boolean) {
    if (isToday) {
      this.todayActivities = this.todayActivities.filter(
        x => x.category != act.category
      );
      this.fbSvc.updateActivities(this.today, this.todayActivities);
    } else {
      this.historicalActivities = this.historicalActivities.filter(
        x => x.category != act.category
      );
      this.fbSvc.updateActivities(this.date, this.historicalActivities);
    }
  }

  updateDate(date: any) {
    this.date = date.detail.value.slice(0, 10);

    const dataRef = this.fbSvc.getDataRef();
    dataRef
      .doc(this.date)
      .valueChanges()
      .subscribe((res: Data) => {
        if (res) {
          this.historicalActivities = res.activities;
        }
      });
  }

  updateSelection(type: any) {
    this.activityType = type.detail.value;
  }

  updateInput(input: any) {
    this.input = input.detail.value;
  }

  submit() {
    let toUpdateActivities = this.todayActivities.filter(
      x => x.category != this.activityType
    );
    toUpdateActivities.push({
      category: this.activityType,
      content: this.input
    });
    const dataRef = this.fbSvc.getDataRef();
    dataRef.doc(this.today).update({
      activities: toUpdateActivities,
      point: 1
    });

    this.resetForm();
    this.fbSvc.addOnePoint();
  }

  private resetForm() {
    this.input = "";
    this.activityType = "";
  }
}
