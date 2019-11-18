import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { UserCredential } from "../models/health.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = "";

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 6 characters long."
      }
    ]
  };

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage
  ) {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      )
    });
  }

  async ngOnInit() {
    await this.storage.get("email").then(val => (this.email = val));
    await this.storage.get("password").then(val => (this.password = val));

    if (this.email && this.password) {
      this.tryLogin({
        email: this.email,
        password: this.password
      });
    }
  }

  tryLogin(value: UserCredential) {
    this.authService.doLogin(value).then(
      res => {
        this.router.navigate(["/tabs/today"]);
        this.storage.set("email", value.email);
        this.storage.set("password", value.password);
      },
      err => {
        this.errorMessage = err.message;
        console.log(err);
      }
    );
  }

  goRegisterPage() {
    this.router.navigate(["/register"]);
  }
}
