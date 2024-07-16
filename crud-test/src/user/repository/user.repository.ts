import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { PrismaService } from "src/prisma.service";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository{
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const { email, password, school } = createUserDto;
        
        return await this.prisma.user.create({
            data: {
                email,
                password,
                school,
            },
        });
    }

    async findEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findOne(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async update(updateUserDto: UpdateUserDto) {
        const { id, email } = updateUserDto;
        
        return await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                email,
            },
        });
    }
}
