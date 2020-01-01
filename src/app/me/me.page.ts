import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { User } from "../models/health.model";
import { DocumentSnapshot, Action } from "@angular/fire/firestore";
import { Subscription } from "rxjs";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-me",
  templateUrl: "me.page.html",
  styleUrls: ["me.page.scss"]
})
export class MePage implements OnInit {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fbSvc: FirebaseService,
    private storage: Storage
  ) {}

  errorMessage: string;

  points: number;

  sub = new Subscription();

  ngOnInit(): void {
    const userRef = this.fbSvc.getUserRef();
    const s = userRef.snapshotChanges().subscribe(
      (res: Action<DocumentSnapshot<User>>) =>
        (this.points = res.payload.data().points),
      err => console.log(err)
    );
    this.sub.add(s);
  }

  logout() {
    this.authSvc.doLogout().then(
      res => {
        this.sub.unsubscribe();
        this.storage.clear();
        this.router.navigate(["/login"]);
      },
      err => {
        this.errorMessage = err;
        console.log(err);
      }
    );
  }
}
