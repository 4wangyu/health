import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { User } from "../models/user.model";
import { DocumentSnapshot, Action } from "@angular/fire/firestore";

@Component({
  selector: "app-me",
  templateUrl: "me.page.html",
  styleUrls: ["me.page.scss"]
})
export class MePage implements OnInit {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fbSvc: FirebaseService
  ) {}

  errorMessage: string;

  points: number;

  ngOnInit(): void {
    var userRef = this.fbSvc.getUserRef();
    userRef
      .snapshotChanges()
      .subscribe(
        (res: Action<DocumentSnapshot<User>>) =>
          (this.points = res.payload.data().points)
      );
  }

  logout() {
    this.authSvc.doLogout().then(
      res => {
        this.router.navigate(["/login"]);
      },
      err => {
        this.errorMessage = err;
        console.log(err);
      }
    );
  }
}
