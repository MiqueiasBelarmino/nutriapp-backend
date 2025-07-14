import { PatientsService } from './patients.service';
import { Prisma } from '@prisma/client';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(data: CreatePatientDto): Prisma.Prisma__PatientClient<{
        id: string;
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Prisma.Prisma__PatientClient<{
        id: string;
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: UpdatePatientDto): Prisma.Prisma__PatientClient<{
        id: string;
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__PatientClient<{
        id: string;
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
