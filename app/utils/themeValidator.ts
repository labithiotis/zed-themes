import type { ValidateFunction } from "ajv/dist/types";
import type { ThemeFamilyContent } from "../themeFamily";
import validator from "./themeValidatorAjv.mjs";

export const themeValidator = validator as ValidateFunction<ThemeFamilyContent>;
