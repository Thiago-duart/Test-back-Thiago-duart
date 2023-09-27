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
        error: error,
      });
    }
    return value;
  }
}

export const CreateUserSchema = z.object({
  data: z.object({
    address: z.object({
      cep: z.string().min(8).max(8).nonempty({ message: 'cep' }),
      state: z.string().nonempty({ message: 'state' }),
      city: z.string().nonempty({ message: 'city' }),
      neighborhood: z.string().nonempty({ message: 'neighborhood' }),
      street: z.string().nonempty({ message: 'street' }),
      number: z.string().nonempty({ message: 'number' }),
    }),
    name: z.string().nonempty({ message: 'name' }),
    age: z.string().nonempty({ message: ' age' }),
    githubUser: z.string().nonempty({ message: 'githubUser' }),
    userId: z.string().nonempty({ message: 'userId' }),
  }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
