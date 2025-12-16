export interface Camera {
  id: string;
  location: string;
  status: string;
  image: string;
  timestamp: string;
  type?: string;
}

export const CAMERA_FEEDS: Camera[] = [
  {
    id: 'CAM_D2',
    location: 'City Bus Parking',
    status: 'Recording',
    image: 'assets/images/camera-dummy.svg',
    timestamp: '00:33:26:01',
    type: 'Light Vehicle'
  },
  {
    id: 'CAM_D3',
    location: 'Norzin Lam',
    status: 'Rec',
    image: 'assets/images/camera-dummy.svg',
    timestamp: '00:33:26:01',
    type: 'Two Wheeler'
  },
  {
    id: 'Citybus_D1',
    location: 'City Bus Parking',
    status: 'Recording',
    image: 'assets/images/camera-dummy.svg',
    timestamp: '00:33:26:01',
    type: 'Light Vehicle'
  }
];

export const OTHER_CAMERAS: Camera[] = [
  { id: 'Cam 1', location: 'Norzin Lam SE', status: 'Active', image: 'assets/images/camera-dummy.svg', timestamp: '00:33:26:01', type: 'SE 1234.90' },
  { id: 'Cam 2', location: 'Norzin Lam SE', status: 'Active', image: 'assets/images/camera-dummy.svg', timestamp: '00:33:26:01', type: 'SE 1234.90' },
  { id: 'Cam 3', location: 'Norzin Lam SE', status: 'Active', image: 'assets/images/camera-dummy.svg', timestamp: '00:33:26:01', type: 'SE 1234.90' }
];

export const STATS = [
  { icon: '★', title: 'Total Active Camera', value: '1,479', change: '+28.4%' },
  { icon: '★', title: 'Current day violation', value: '187', change: '-12.0%' },
  { icon: '★', title: 'Total Vehicle Registered', value: '458,809', change: '+3.2%' },
  { icon: '★', title: 'Total Violation', value: '56,990', change: '+13.5%' }
];

// TODO: Replace mock data with API response

