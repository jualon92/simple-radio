import { Component, ViewEncapsulation } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [
    QRCodeModule,
    MatCardModule,
  ],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class QrComponent {

}
