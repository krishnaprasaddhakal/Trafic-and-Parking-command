export interface Violation {
  date: string;
  camera: string;
  type: 'Overstayed' | 'Over Speeding' | 'Double Parking';
  plateNumber: string;
  vehicleType: string;
  duration: string;
  evidence: string[];
}

export const VIOLATIONS: Violation[] = [
  { date: 'Jan 30, 2024', camera: 'CAM_D2', type: 'Overstayed', plateNumber: '-', vehicleType: 'Light Vehicle', duration: '1min', evidence: ['assets/images/camera-dummy.svg','assets/images/camera-dummy.svg'] },
  { date: 'Jan 27, 2024', camera: 'CAM_Throm_v3', type: 'Over Speeding', plateNumber: '-', vehicleType: 'Two Wheeler', duration: '70 km/hr in 50 km/hr', evidence: ['assets/images/camera-dummy.svg','assets/images/camera-dummy.svg'] },
  { date: 'Jan 24, 2024', camera: 'CAM_Nhway 12w', type: 'Overstayed', plateNumber: '-', vehicleType: 'Light Vehicle', duration: '1 hr', evidence: ['assets/images/camera-dummy.svg','assets/images/camera-dummy.svg'] },
  { date: 'Jan 21, 2024', camera: 'CAM_1234', type: 'Double Parking', plateNumber: '-', vehicleType: 'Two Wheeler', duration: '-', evidence: ['assets/images/camera-dummy.svg','assets/images/camera-dummy.svg'] },
  { date: 'Jan 18, 2024', camera: 'CA_c__5673', type: 'Overstayed', plateNumber: '-', vehicleType: 'Heavy Vehicle', duration: '2hr 35 min', evidence: ['assets/images/camera-dummy.svg','assets/images/camera-dummy.svg'] },
  { date: 'Jan 15, 2024', camera: 'CAM_Taba HWay', type: 'Double Parking', plateNumber: '-', vehicleType: 'Light Vehicle', duration: '-', evidence: ['assets/images/camera-dummy.svg','assets/images/camera-dummy.svg'] }
];

