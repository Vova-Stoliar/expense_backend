import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { MESSAGES } from '~/shared/constants';

export function IsEqualTo<TObject extends Record<keyof TObject, unknown>>(
    property: keyof TObject,
    validationOptions?: ValidationOptions
) {
    return function (object: TObject, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: unknown, validationArguments: ValidationArguments): boolean {
                    const relatedValue = (validationArguments.object as TObject)[property];

                    return value === relatedValue;
                },
                defaultMessage(): string {
                    return MESSAGES.notMatch({ propertyToMatch: propertyName, property: String(property) });
                },
            },
        });
    };
}
