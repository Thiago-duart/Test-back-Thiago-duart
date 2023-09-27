import { z } from 'zod';
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodObject } from 'zod';
import { string } from 'joi';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      const allErros: string[] = error.errors.map((err) => err.message);
      throw new BadRequestException({
        message:
          'Validation failed ): please check the data passed in the body.',
        error: allErros,
      });
    }
    return value;
  }
}

export const RegisterSchema = z.object({
  name: z.string().nonempty({ message: 'name is required' }),
  email: z
    .string()
    .email()
    .nonempty({ message: 'email is required' })
    .regex(RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/), {
      message: 'E-mail is invalid',
    }),
  password: z
    .string()
    .nonempty({ message: 'password is required' })
    .regex(
      RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
      {
        message:
          'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      },
    ),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;

export const singInSchema = z.object({
  content: z.object({
    email: z.string().email().nonempty({ message: 'email is required' }),
    password: z.string().nonempty({ message: 'password is required' }),
  }),
});

export type singInDto = z.infer<typeof singInSchema>;
