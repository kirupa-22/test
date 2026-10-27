export interface BookingFormData {
  parentName: string;
  parentEmail: string;
  whatsapp: string;
  studentName: string;
  studentGrade: string;
  program: string;
  demoDate: string;
  timeSlot: string;
  hardwareCheck: boolean;
  appliedReferralCode?: string;
}

export interface BookingSubmissionPayload {
  parentName: string;
  email: string;
  whatsapp: string;
  studentName: string;
  studentGrade: string;
  program: string;
  demoDate: string;
  timeSlot: string;
  studentCount: number;
  hasHardwareReady: boolean;
  appliedReferralCode: string;
  generatedReferralCode: string;
  emailReferralCodeDispatched: boolean;
  timestamp: string;
  brand: string;
}

export interface ProgramTrack {
  id: string;
  title: string;
  subtitle: string;
  monthlyFee: number;
  description: string;
  features: string[];
  badgeColor?: string;
}
