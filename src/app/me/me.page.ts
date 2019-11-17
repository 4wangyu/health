import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-me",
  templateUrl: "me.page.html",
  styleUrls: ["me.page.scss"]
})
export class MePage {
  constructor(private authSvc: AuthService, private router: Router) {}

  errorMessage: string;

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
