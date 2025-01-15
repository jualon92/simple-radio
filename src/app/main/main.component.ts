import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
