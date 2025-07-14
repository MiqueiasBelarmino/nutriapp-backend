import { PrismaService } from '../prisma/prisma.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
export declare class MealPlansService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateMealPlanDto): import(".prisma/client").Prisma.Prisma__MealPlanClient<{
        id: string;
        patientId: string;
        date: Date;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        patientId: string;
        date: Date;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findByPatient(patientId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        patientId: string;
        date: Date;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MealPlanClient<{
        id: string;
        patientId: string;
        date: Date;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdateMealPlanDto): import(".prisma/client").Prisma.Prisma__MealPlanClient<{
        id: string;
        patientId: string;
        date: Date;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MealPlanClient<{
        id: string;
        patientId: string;
        date: Date;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
