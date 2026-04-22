export enum AppState {
  SPLASH = 'SPLASH',
  PERMISSIONS = 'PERMISSIONS',
  USER_SETUP = 'USER_SETUP',
  MONITORING_INACTIVE = 'MONITORING_INACTIVE',
  MONITORING_ACTIVE = 'MONITORING_ACTIVE',
  PRE_DANGER_VALIDATION = 'PRE_DANGER_VALIDATION',
  DANGER_DETECTED = 'DANGER_DETECTED',
  EMERGENCY_ACTIVATED = 'EMERGENCY_ACTIVATED',
  POST_EMERGENCY = 'POST_EMERGENCY'
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  emergencyContact: string;
}

export interface SafetyPermissions {
  microphone: boolean;
  location: boolean;
  motion: boolean;
}
