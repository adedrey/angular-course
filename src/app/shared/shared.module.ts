import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { NavDirDirective } from './nav-dir.directive';

@NgModule({
    declarations : [
        AlertModalComponent,
        LoadingSpinnerComponent,
        NavDirDirective
    ],
    imports : [
        CommonModule
    ],
    exports : [
        AlertModalComponent,
        LoadingSpinnerComponent,
        NavDirDirective,
        CommonModule
    ]
})
export class SharedModule {}