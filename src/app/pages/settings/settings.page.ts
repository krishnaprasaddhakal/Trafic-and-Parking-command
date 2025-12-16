import { Component } from '@angular/core';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { TitleCasePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [TopbarComponent, TitleCasePipe, FormsModule, NgFor, NgIf],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
})
export class SettingsPage {
  theme: 'light' | 'dark' = 'light';
  profile = { name: 'John Carter', email: 'john.carter@example.com', phone: '', title: '', avatar: '' };
  savingProfile = false;
  saveMessage = '';
  pwd = { current: '', next: '', confirm: '' };
  pwdMessage = '';
  sessions: { id: string; device: string; location: string; lastActive: string }[] = [
    { id: 's1', device: 'Chrome on Windows', location: 'New Delhi, IN', lastActive: 'Just now' },
    { id: 's2', device: 'Safari on iPhone', location: 'Mumbai, IN', lastActive: '2 days ago' }
  ];
  twofa: { enabled: boolean; secret: string; codes: string[]; verified: boolean } = { enabled: false, secret: '', codes: [], verified: false };
  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      this.theme = saved as 'light' | 'dark';
    } else {
      this.theme = 'light';
    }
    this.applyTheme();
    const p = localStorage.getItem('profile');
    if (p) {
      try { this.profile = { ...this.profile, ...JSON.parse(p) }; } catch {}
    }
    const tf = localStorage.getItem('twofa');
    if (tf) {
      try { this.twofa = { ...this.twofa, ...JSON.parse(tf) }; } catch {}
    }
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
  onAvatarChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.profile.avatar = String(reader.result || '');
    };
    reader.readAsDataURL(file);
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
  signOutAll() {
    this.sessions = [];
  }
  enableTwofa() {
    const secret = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const codes = Array.from({ length: 8 }).map(() => Math.random().toString(36).slice(2, 8).toUpperCase());
    this.twofa = { enabled: true, secret, codes, verified: false };
    localStorage.setItem('twofa', JSON.stringify(this.twofa));
  }
  disableTwofa() {
    this.twofa = { enabled: false, secret: '', codes: [], verified: false };
    localStorage.setItem('twofa', JSON.stringify(this.twofa));
  }
  confirmTwofa() {
    if (!this.twofa.enabled) return;
    this.twofa.verified = true;
    localStorage.setItem('twofa', JSON.stringify(this.twofa));
  }
}
