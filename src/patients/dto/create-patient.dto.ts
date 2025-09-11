export class CreatePatientDto {
  name: string;
  gender: string;
  birthDate: Date;
  weight: number;
  height: number;
  userId?: string;
  email?: string;
  phone?: string;
}
