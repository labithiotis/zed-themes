// AJV is not allowed in Edge Runtime
// https://github.com/ajv-validator/ajv/issues/2318
// So we build a standalone validator that does work on edge

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import standaloneCode from "ajv/dist/standalone";
import themeFamilySchema from "./themeFamily.json";

const __dirname = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url));

const ajv = new Ajv({ code: { source: true, esm: true } });
const validate = ajv.compile(themeFamilySchema);
const moduleCode = standaloneCode(ajv, validate);

fs.writeFileSync(path.resolve(__dirname, "../app/utils/themeValidatorAjv.mjs"), moduleCode);
