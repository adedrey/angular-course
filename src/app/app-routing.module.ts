import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';

const appRoutes : Routes = [
    { path : '', redirectTo : '/recipes', pathMatch : 'full'},
    { path: 'auth', component: AuthComponent }
    // { path: 'error', component: Error404Component },
    // { path: '**', redirectTo: '/error'}
]

@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],
    exports : [RouterModule]
})
export class AppRoutingModule {

}
