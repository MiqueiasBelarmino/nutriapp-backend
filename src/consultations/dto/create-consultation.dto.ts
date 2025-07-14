
export class CreateConsultationDto {
  patientId: string;
  date: string;
  weight: number;
  triceps: number;
  subscapular: number;
  suprailiac: number;
  abdominal: number;
  waistCirc: number;
  abdomenCirc: number;
  fatFormula: string; // faulkner, pollock, jackson
  fatPercent: number;
  leanMass: number;
  fatMass: number;
}
