import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  selector: 'ngx-root',
  template: `
    <ngx-navbar></ngx-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    ngx-root {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
  `],
})
export class AppComponent { }
