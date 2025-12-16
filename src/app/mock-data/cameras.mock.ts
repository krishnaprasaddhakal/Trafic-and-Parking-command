export interface Camera {
  id: string;
  name: string;
  location: string;
  code: string;
  status: 'Active' | 'Inactive' | 'Maintenance' | 'Violation';
  count: number;
  image: string;
}

export const CAMERAS: Camera[] = [
  { id: '1', name: 'City Bus Parking', location: 'City Bus Parking, Town', code: 'CAM_D2', status: 'Active', count: 4, image: 'assets/images/camera-dummy.svg' },
  { id: '2', name: 'City Bus Parking', location: 'City Bus Parking, Town', code: 'CAM_D2', status: 'Inactive', count: 3, image: 'assets/images/camera-dummy.svg' },
  { id: '3', name: 'City Bus Parking', location: 'City Bus Parking, Town', code: 'CAM_D2', status: 'Active', count: 4, image: 'assets/images/camera-dummy.svg' },
  { id: '4', name: 'City Bus Parking', location: 'City Bus Parking, Town', code: 'CAM_D2', status: 'Maintenance', count: 2, image: 'assets/images/camera-dummy.svg' },
  { id: '5', name: 'City Bus Parking', location: 'City Bus Parking, Town', code: 'CAM_D2', status: 'Violation', count: 1, image: 'assets/images/camera-dummy.svg' },
  { id: '6', name: 'City Bus Parking', location: 'City Bus Parking, Town', code: 'CAM_D2', status: 'Active', count: 4, image: 'assets/images/camera-dummy.svg' },
  { id: '7', name: 'City Bus Parking', location: 'City Bus Parking, Town', code: 'CAM_D2', status: 'Inactive', count: 5, image: 'assets/images/camera-dummy.svg' },
  { id: '8', name: 'City Bus Parking', location: 'City Bus Parking, Town', code: 'CAM_D2', status: 'Active', count: 4, image: 'assets/images/camera-dummy.svg' },
];

// TODO: Replace mock data with backend API

