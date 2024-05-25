import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/Shared/Header/Header.component';
import { FooterComponent } from './Components/Shared/Footer/Footer.component';
import { Header2Component } from './Components/Shared/Header2/Header2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HeaderComponent ,FooterComponent , Header2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Addicta';
}
