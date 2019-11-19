import { Component, OnInit } from "@angular/core";
import { Config } from "../configs/health.config";
import { Category, User } from "../models/health.model";
import { FirebaseService } from "../services/firebase.service";
import { Action, DocumentSnapshot } from "@angular/fire/firestore";

@Component({
  selector: "app-data",
  templateUrl: "data.page.html",
  styleUrls: ["data.page.scss"]
})
export class DataPage implements OnInit {
  constructor(private fbSvc: FirebaseService) {}

  colors = Config.colors;
  cats = [];
  categories = [];
  showForm = false;
  input: string;

  ngOnInit(): void {
    const userRef = this.fbSvc.getUserRef();
    userRef
      .snapshotChanges()
      .subscribe((res: Action<DocumentSnapshot<User>>) => {
        this.cats = res.payload.data().categories;
        this.categories = [];
        res.payload.data().categories.forEach((cat, i) => {
          this.categories.push({
            title: cat,
            color: this.colors[i % 4]
          });
        });
      });
  }

  delete(cat: string) {
    this.cats = this.cats.filter(x => x != cat);
    this.fbSvc.updateCategories(this.cats);
  }

  updateInput(input: any) {
    this.input = input.detail.value;
  }

  add() {
    const string = this.input.toLowerCase();
    this.cats.push(string.charAt(0).toUpperCase() + string.slice(1));
    this.fbSvc.updateCategories(this.cats);
    this.showForm = false;
  }

  getCategoryData(cat: string) {}
}
