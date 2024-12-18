import { z } from "zod";

//註冊
export const registerSchema = z.object({
  name: z.string().min(1, { message: "欄位不得為空" }),
  email: z
    .string()
    .min(1, { message: "欄位不得為空" })
    .email({ message: "信箱格式錯誤" }),
  // .refine(async (email) => await checkEmail(email), {
  //   message: "此電子郵件已被註冊",
  // }),
  password: z
    .string()
    .min(1, { message: "欄位不得為空" })
    .min(8, { message: "密碼至少為8" })
    .max(15, { message: "密碼最多為15碼" }),
});

//登入
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "欄位不得為空" })
    .email({ message: "電子信箱格式錯誤" }),
  password: z.string().min(1, { message: "欄位不得為空" }),
});

//更新個人資訊
export const updateSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "欄位不得為空" })
    .min(8, { message: "密碼至少為8" }),
  city: z.string().min(1, { message: "欄位不得為空" }),
  streetAddress: z.string().min(1, { message: "欄位不得為空" }),
  postalCode: z.string().min(1, { message: "欄位不得為空" }),
});

//付款資料確認
export const checkSchema = z.object({
  phone: z.string().min(1, "電話號碼為必填項目").min(8, "電話號碼至少為 8 位數"),
  postalCode: z.string().min(1, "郵遞區號為必填項目").min(3, "郵遞區號至少為 3 位數"),
  city: z.string().min(1, "城市為必填項目"),
  streetAddress: z.string().min(1, "地址為必填項目"),
});