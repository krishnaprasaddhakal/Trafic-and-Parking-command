import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { CamerasPage } from './pages/cameras/cameras.page';
import { ViolationPage } from './pages/violation/violation.page';
import { AnalyticsPage } from './pages/analytics/analytics.page';
import { PolygonEditorPage } from './pages/polygon-editor/polygon-editor.page';
import { SettingsPage } from './pages/settings/settings.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPage, title: 'Dashboard' },
  { path: 'cameras', component: CamerasPage, title: 'Cameras' },
  { path: 'violation', component: ViolationPage, title: 'Violation' },
  { path: 'analytics', component: AnalyticsPage, title: 'Analytics' },
  { path: 'polygon', component: PolygonEditorPage, title: 'Polygon Editor' },
  { path: 'settings', component: SettingsPage, title: 'Settings' },
  { path: '**', redirectTo: 'dashboard' }
];
