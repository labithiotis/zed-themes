import { generateUploadButton } from '@uploadthing/react';
import type { UploadRouter } from '~/routes/api.upload-image';

export const UploadButton = generateUploadButton<UploadRouter>({ url: '/api/upload-image' });
