import { generateUploadButton, generateUploadDropzone } from '@uploadthing/react';
import type { UploadRouter } from '~/routes/api.uploadthing';

export const UploadButton = generateUploadButton<UploadRouter>();
export const UploadDropzone = generateUploadDropzone<UploadRouter>();
