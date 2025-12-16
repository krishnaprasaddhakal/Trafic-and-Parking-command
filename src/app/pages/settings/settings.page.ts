import { Component } from '@angular/core';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { TitleCasePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [TopbarComponent, TitleCasePipe, FormsModule, NgFor],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
})
export class SettingsPage {
  theme: 'light' | 'dark' = 'light';
  profile = { name: 'John Carter', email: 'john.carter@example.com', phone: '', title: '' };
  savingProfile = false;
  saveMessage = '';
  pwd = { current: '', next: '', confirm: '' };
  pwdMessage = '';
  sessions: { id: string; device: string; location: string; lastActive: string }[] = [
    { id: 's1', device: 'Chrome on Windows', location: 'New Delhi, IN', lastActive: 'Just now' },
    { id: 's2', device: 'Safari on iPhone', location: 'Mumbai, IN', lastActive: '2 days ago' }
  ];
  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      this.theme = saved as 'light' | 'dark';
    } else {
      this.theme = 'light';
    }
    this.applyTheme();
  }
  applyTheme() {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(this.theme === 'dark' ? 'theme-dark' : 'theme-light');
    localStorage.setItem('theme', this.theme);
    root.style.background = 'var(--bg)';
  }
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  }
  saveProfile() {
    this.savingProfile = true;
    setTimeout(() => {
      localStorage.setItem('profile', JSON.stringify(this.profile));
      this.savingProfile = false;
      this.saveMessage = 'Profile saved';
      setTimeout(() => this.saveMessage = '', 2000);
    }, 400);
  }
  changePassword() {
    const nextOk = this.pwd.next.length >= 8 && /[0-9]/.test(this.pwd.next) && /[A-Za-z]/.test(this.pwd.next);
    if (!this.pwd.current || !nextOk || this.pwd.next !== this.pwd.confirm) {
      this.pwdMessage = 'Please check inputs';
      setTimeout(() => this.pwdMessage = '', 2000);
      return;
    }
    setTimeout(() => {
      this.pwd = { current: '', next: '', confirm: '' };
      this.pwdMessage = 'Password updated';
      setTimeout(() => this.pwdMessage = '', 2000);
    }, 400);
  }
  revokeSession(id: string) {
    this.sessions = this.sessions.filter(s => s.id !== id);
  }
}
