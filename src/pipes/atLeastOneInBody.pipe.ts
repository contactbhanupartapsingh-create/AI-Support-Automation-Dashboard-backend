import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'atLeastOne', async: false })
export class AtLeastOneExists implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    return Object.keys(object).some(key => !!object[key]);
  }

  defaultMessage(args: ValidationArguments) {
    return 'At least one field (title, description, or status) must be provided.';
  }
}

export function AtLeastOne(validationOptions?: ValidationOptions) {
  return function (object: Function) {
    registerDecorator({
      target: object,
      propertyName: '', // Empty because it's class-level
      options: validationOptions,
      constraints: [],
      validator: AtLeastOneExists,
    });
  };
}