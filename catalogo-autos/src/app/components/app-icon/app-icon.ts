import { Component, input } from '@angular/core';

export type IconName =
  | 'car'
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'tag'
  | 'sliders'
  | 'x'
  | 'search'
  | 'circle-x';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './app-icon.html',
  styleUrl: './app-icon.css',
})
export class AppIcon {
  name = input.required<IconName>();
  size = input(20);
}
