import { z } from 'zod';

export const orderFormSchema = z.object({
  fio: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
  phoneNumber: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
  address: z.string().min(1, { message: 'Поле обязательно для заполнения' })
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
