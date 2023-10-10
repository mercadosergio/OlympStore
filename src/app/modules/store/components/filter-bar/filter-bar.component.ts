import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseFloatsPipe } from '../../../shared/pipes/parse-floats.pipe';

export interface PriceRanges {
  minPrice: number;
  maxPrice: number;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  imports: [CommonModule, ParseFloatsPipe],
})
export class FilterBarComponent {
  pricesRange: PriceRanges[] = [
    {
      minPrice: 10,
      maxPrice: 100,
    },
    {
      minPrice: 100,
      maxPrice: 500,
    },
    {
      minPrice: 500,
      maxPrice: 1000,
    },
    {
      minPrice: 1000,
      maxPrice: 10000,
    },
    {
      minPrice: 10000,
      maxPrice: 100000,
    },
  ];

  selectedMinPrice?: number = 0;
  selectedMaxPrice?: number = 0;

  @Output() sendParams = new EventEmitter<PriceRanges>();

  loadParams(minPrice: number, maxPrice: number) {
    this.sendParams.emit({ minPrice, maxPrice });
    this.selectedMinPrice = minPrice;
    this.selectedMaxPrice = maxPrice;
  }
}
