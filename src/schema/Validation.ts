import { z } from "zod";

// ユーザー名のバリデーションスキーマ
export const stringSchema = z
  .string({
    required_error: "必須項目です。",
  })
  .min(3, { message: "1文字以上で入力してください。" })
  .max(255, { message: "文字の長さは256文字未満で入力してください。" });

// 電話番号のバリデーションスキーマ
export const telephoneNumberSchema = z.string({
  required_error: "必須項目です。",
});

// メールアドレスのバリデーションスキーマ
export const emailSchema = z
  .string({
    required_error: "必須項目です。",
  })
  .email();
