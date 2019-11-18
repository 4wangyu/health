import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { redirectUnauthorizedTo, canActivate } from "@angular/fire/auth-guard";

const redirectToLogin = redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  { path: "", redirectTo: "tabs/today", pathMatch: "full" },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then(m => m.TabsPageModule),
    ...canActivate(redirectToLogin)
  },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule"
  },
  { path: "**", redirectTo: "tabs/today" }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
