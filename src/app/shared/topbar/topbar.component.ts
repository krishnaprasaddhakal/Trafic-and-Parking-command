import { Component, Input } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Input() title = '';
  theme: 'light' | 'dark' = 'light';
  constructor(private sidebar: SidebarService) {
    const saved = localStorage.getItem('theme');
    this.theme = saved === 'dark' ? 'dark' : 'light';
    this.applyTheme();
  }
  toggleMenu() {
    this.sidebar.toggle();
  }
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  }
  private applyTheme() {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(this.theme === 'dark' ? 'theme-dark' : 'theme-light');
    localStorage.setItem('theme', this.theme);
    root.style.background = 'var(--bg)';
  }
}
