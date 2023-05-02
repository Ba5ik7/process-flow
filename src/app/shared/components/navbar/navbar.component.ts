import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'ngx-navbar',
  template: `
    <nav class="navbar-header mat-elevation-z6">
      <a mat-button routerLink="/">
        <mat-icon class="workshop-logo">insights</mat-icon>
        <span>Ngx-ProcessFlow</span>
      </a>
    </nav>
  `,
  styles: [`
    :host {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 2;
    }
    .navbar-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 8px 16px;
    }
    .workshop-logo {
      height: 26px;
      margin: 0 4px 3px 0;
      vertical-align: middle;
    }
  `],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent { }
