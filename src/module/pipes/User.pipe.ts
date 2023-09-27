import { z } from 'zod';
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException({
        message:
          'Validation failed ):  please check the data passed in the body.',
      });
    }
    return value;
  }
}

export const CreateUserSchema = z.object({
  address: z.object({
    cep: z.string().min(8).max(8).nonempty(),
    state: z.string().nonempty(),
    city: z.string().nonempty(),
    neighborhood: z.string().nonempty(),
    street: z.string().nonempty(),
    number: z.string().nonempty(),
    complement: z.string().nonempty(),
  }),
  name: z.string().nonempty(),
  age: z.number().nonnegative(),
  githubUser: z.string().nonempty(),
  userId: z.string().nonempty(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
