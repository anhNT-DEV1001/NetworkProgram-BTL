import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRole, UserStatus } from "src/common/enums";

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ enum: UserRole, default: UserRole.USER })
    role: string;

    @Prop({ default: false })
    isActive: boolean

    @Prop({ enum: UserStatus, default: UserStatus.INACTIVE })
    status: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);