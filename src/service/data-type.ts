export enum MissionType {
  BUTTON = "BUTTON",
  DIARY = "DIARY",
  GPS = "GPS",
  RECEIPT = "RECEIPT",
  VOICE = "VOICE",
}

export interface MissionData {
  completions: unknown[];
  createdAt: Date;
  description: string;
  id: number;
  minDistance: 800;
  minDuration: 15;

  title: string;
  type: MissionType;
  verificationData?: { minDistance?: number; minDuration?: number };
}

export const MISSION_POINTS = {
  [MissionType.BUTTON]: 10,
  [MissionType.DIARY]: 20,
  [MissionType.GPS]: 50,
  [MissionType.RECEIPT]: 40,
  [MissionType.VOICE]: 30,
} as const;
