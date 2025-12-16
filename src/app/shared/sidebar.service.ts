import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  collapsed = signal(false);
  toggle() {
    this.collapsed.update((v) => !v);
  }
  close() {
    this.collapsed.set(true);
  }
  open() {
    this.collapsed.set(false);
  }
}

