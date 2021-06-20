import { getModelForClass, prop } from "@typegoose/typegoose";

class Student {
  readonly _id: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @prop({ type: () => String, unique: true })
  public name: string;

  @prop({ type: () => String })
  public major: string;

  @prop({ type: () => Number })
  public age: number;
}

export const StudentModel = getModelForClass(Student, {
  schemaOptions: { timestamps: true },
});
