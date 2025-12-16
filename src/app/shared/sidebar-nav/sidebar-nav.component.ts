import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss',
})
export class SidebarNavComponent {
  query = '';
  constructor(private router: Router, protected sidebar: SidebarService) {}
  submitSearch() {
    this.sidebar.close();
    this.router.navigate(['/cameras'], { queryParams: { q: this.query } });
  }
}
