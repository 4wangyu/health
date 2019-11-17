import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
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
