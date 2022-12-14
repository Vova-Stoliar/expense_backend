import { BadRequestException } from '@nestjs/common';

export interface ValidateValueExistenceParams<TValue> {
    values: TValue[];
    matchValueCallback: (category: TValue) => boolean;
    error?: Error;
    shouldValueExist?: boolean;
}

export function validateValueExistence<TValue>(params: ValidateValueExistenceParams<TValue>) {
    const { matchValueCallback, values, error = new BadRequestException(), shouldValueExist = true } = params;

    const doesValueExist = values.some(matchValueCallback);

    if (doesValueExist !== shouldValueExist) throw error;
}
