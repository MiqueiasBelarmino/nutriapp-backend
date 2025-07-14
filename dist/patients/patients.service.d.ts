import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreatePatientDto): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdatePatientDto): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        gender: string;
        birthDate: Date;
        weight: number;
        height: number;
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
