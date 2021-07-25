import { getModelForClass, prop } from "@typegoose/typegoose";

class Post {
  readonly _id: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @prop({ type: () => String, unique: true, required: true })
  public title: string;

  @prop({ type: () => String, required: true })
  public body: string;
}

export const PostModel = getModelForClass(Post, {
  schemaOptions: { timestamps: true },
});
