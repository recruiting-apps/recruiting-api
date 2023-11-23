import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsStringOrNumber implements ValidatorConstraintInterface {
  validate (text: any, args: ValidationArguments): boolean {
    return typeof text === 'number' || typeof text === 'string'
  }

  defaultMessage (args: ValidationArguments): string {
    return '($value) must be number or string'
  }
}
