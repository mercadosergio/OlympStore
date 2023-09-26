import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
    exports: [ReversePipe, TimeAgoPipe, HighlightDirective, SpinnerComponent],
    imports: [CommonModule, RouterModule, MaterialModule, ReversePipe,
        TimeAgoPipe,
        HighlightDirective,
        SpinnerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
