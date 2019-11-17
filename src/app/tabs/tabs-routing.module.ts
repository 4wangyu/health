import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "today",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../today/today.module").then(m => m.TodayPageModule)
          }
        ]
      },
      {
        path: "data",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../data/data.module").then(m => m.DataPageModule)
          }
        ]
      },
      {
        path: "me",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../me/me.module").then(m => m.MePageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/today",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/today",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
