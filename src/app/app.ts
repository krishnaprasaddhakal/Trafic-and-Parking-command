import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNavComponent } from './shared/sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarNavComponent],
  template: `
    <app-sidebar-nav></app-sidebar-nav>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host { display: block; }
    .content { margin-left: 280px; min-height: 100vh; }
    @media (max-width: 960px) {
      .content { margin-left: 0; }
    }
  `]
})
export class App {
  protected readonly title = signal('TrafficAndParkingCommand');
}
