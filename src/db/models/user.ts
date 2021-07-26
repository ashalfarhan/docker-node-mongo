import { getModelForClass, prop } from "@typegoose/typegoose";

class User {
  readonly _id: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @prop({ type: () => String, unique: true, required: true })
  public username: string;

  @prop({ type: () => String, required: true })
  password: string;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
