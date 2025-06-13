import { z } from "zod";

const IMAGE_TYPES = ["image/jpg", "image/png"];
const MAX_IMAGE_SIZE = 5; // 5MB

// バイト単位のサイズをメガバイト単位に変換する
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const UserProfileSchema = z.object({
  accountName: z.string(),
  address: z.string(),
  selfIntroduction: z.string(),
  webSite: z.string(),
  dateOfBirth: z.string(),
  image: z
    .custom<FileList>() // z.inferでSchemaを定義したときに型がつくようにするため
    .optional()
    // ファイルサイズを制限したい場合
    .refine((file) => {
      if (!file) return true; // fileがなければチェックは行わない
      return (
        sizeInMB(file[0]?.size) <= MAX_IMAGE_SIZE,
        {
          message: "ファイルサイズは最大5MBです",
        }
      );
    })
    // 画像形式を制限したい場合
    .refine((file) => {
      if (!file) return true; // fileがなければチェックは行わない
      return (
        IMAGE_TYPES.includes(file[0]?.type),
        {
          message: ".jpgもしくは.pngのみ可能です",
        }
      );
    }),
  backgroundImage: z
    .custom<FileList>() // z.inferでSchemaを定義したときに型がつくようにするため
    .optional()
    // ファイルサイズを制限したい場合
    .refine((file) => {
      if (!file) return true; // fileがなければチェックは行わない
      return (
        sizeInMB(file[0]?.size) <= MAX_IMAGE_SIZE,
        {
          message: "ファイルサイズは最大5MBです",
        }
      );
    })
    // 画像形式を制限したい場合
    .refine((file) => {
      if (!file) return true; // fileがなければチェックは行わない
      return (
        IMAGE_TYPES.includes(file[0]?.type),
        {
          message: ".jpgもしくは.pngのみ可能です",
        }
      );
    }),
});

export type UserProfileForm = z.infer<typeof UserProfileSchema>;
