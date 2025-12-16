import { Injectable } from '@angular/core';

export type Point = { x: number; y: number };
export type ROIType = 'Parking Slot' | 'No Parking Zone';
export type Polygon = { id: string; type: ROIType; points: Point[]; label?: string; visible?: boolean };

@Injectable({ providedIn: 'root' })
export class PolygonEditorService {
  loadCameraSnapshot(cameraId: string): Promise<string> {
    return Promise.resolve('assets/images/camera-dummy.svg');
  }
  loadPolygons(cameraId: string): Promise<Polygon[]> {
    return Promise.resolve([]);
  }
  savePolygons(cameraId: string, polygons: Polygon[]): Promise<void> {
    console.log('Saving polygons', cameraId, polygons);
    return Promise.resolve();
  }
  static mockSave(cameraId: string, polygons: { type: ROIType; points: Point[] }[]) {
    console.log('[Mock] Saved', cameraId, polygons);
  }
}
