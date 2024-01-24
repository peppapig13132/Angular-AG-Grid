import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './component/user/user-create/user-create.component';
import { UserListComponent } from './component/user/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'user/create',
    component: UserCreateComponent
  },
  {
    path: 'user/list',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
