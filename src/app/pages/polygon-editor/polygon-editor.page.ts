import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PolygonEditorService } from './services/polygon-editor.service';

@Component({
  selector: 'app-polygon-editor-page',
  standalone: true,
  imports: [TopbarComponent, NgFor, NgIf, MatSelectModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './polygon-editor.page.html',
  styleUrl: './polygon-editor.page.scss',
})
export class PolygonEditorPage {
  cameras = [
    { id: 'CAM_D2', name: 'City Bus Parking', image: 'assets/images/camera-dummy.svg', location: 'City Bus Parking' },
    { id: 'CAM_D3', name: 'Norzin Lam', image: 'assets/images/camera-dummy.svg', location: 'Norzin Lam' }
  ];
  roiTypes: ('Parking Slot' | 'No Parking Zone')[] = ['Parking Slot', 'No Parking Zone'];

  selectedCameraId = 'CAM_D2';
  selectedRoi: 'Parking Slot' | 'No Parking Zone' = 'Parking Slot';
  snapshot = this.cameras[0].image;
  timestamp = new Date().toLocaleString();
  loading = false;

  points: { x: number; y: number }[] = [];
  finished = false;
  activeIndex: number | null = null;
  polygons: { type: 'Parking Slot' | 'No Parking Zone'; points: { x: number; y: number }[] }[] = [];

  polylinePoints() {
    return this.points.map((p) => `${p.x},${p.y}`).join(' ');
  }
  pointsToString(arr: {x:number;y:number}[]) {
    return arr.map(p => `${p.x},${p.y}`).join(' ');
  }
  cameraLocation() {
    const cam = this.cameras.find(c => c.id === this.selectedCameraId);
    return cam ? cam.location : '';
  }
  onImageClick(event: MouseEvent) {
    if (this.finished) return;
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.points.push({ x, y });
  }
  onHandleMouseDown(i: number, e: MouseEvent) {
    e.stopPropagation();
    this.activeIndex = i;
  }
  @HostListener('document:mouseup')
  onMouseUpDoc() {
    this.activeIndex = null;
  }
  onMouseMoveOverlay(e: MouseEvent) {
    if (this.activeIndex === null) return;
    const svg = e.currentTarget as SVGElement;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.points[this.activeIndex] = { x, y };
  }
  undo() {
    this.points.pop();
  }
  clear() {
    this.points = [];
    this.finished = false;
  }
  finish() {
    if (this.points.length >= 3) {
      this.finished = true;
      this.polygons.push({ type: this.selectedRoi, points: this.points.map(p => ({...p})) });
      this.points = [];
      this.finished = false;
    }
  }
  get canSave() {
    return this.polygons.length > 0 && this.polygons.every(p => p.points.length >= 3);
  }
  refreshSnapshot() {
    this.loading = true;
    this.timestamp = new Date().toLocaleString();
    setTimeout(() => { this.loading = false; }, 600);
  }
  onCameraChange(id: string) {
    this.selectedCameraId = id;
    const cam = this.cameras.find(c => c.id === id);
    if (cam) { this.snapshot = cam.image; }
    this.loading = true;
    this.points = [];
    this.polygons = [];
    setTimeout(() => { this.loading = false; }, 600);
  }
  save() {
    if (!this.canSave) return;
    PolygonEditorService.mockSave(this.selectedCameraId, this.polygons);
  }
}
