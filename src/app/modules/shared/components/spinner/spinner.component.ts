import { Component, inject } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-spinner',
    template: `
    <div class="overlay z-40" *ngIf="isLoading$ | async">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
    styleUrls: ['./spinner.component.scss'],
    standalone: true,
    imports: [NgIf, AsyncPipe]
})
export class SpinnerComponent {
  private spinnerservice = inject(SpinnerService);
  isLoading$ = this.spinnerservice.isLoading$;
}
