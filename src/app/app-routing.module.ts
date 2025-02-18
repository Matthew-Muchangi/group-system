import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './component/grouplist/grouplist.component';
import { GroupCreateComponent } from './component/groupcreate/groupcreate.component';
import { MembersComponent } from './component/members/members.component';


const routes: Routes = [
  { path: '', component: GroupListComponent },
  { path: 'groupcreate', component: GroupCreateComponent },
  { path: 'members', component: MembersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
