import { ThemeFamilyContent } from '../themeFamily';
import validator from './themeValidatorAjv.mjs';
import type { ValidateFunction } from 'ajv/dist/types';

export const themeValidator = validator as ValidateFunction<ThemeFamilyContent>;
