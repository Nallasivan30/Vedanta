// declarations.d.ts

declare module 'expo-document-picker' {
    export type DocumentPickerResult = {
      type: 'success' | 'cancel';
      uri?: string;
      name?: string;
      size?: number;
    };
  
    export function getDocumentAsync(options?: {
      type?: string;
      copyToCacheDirectory?: boolean;
    }): Promise<DocumentPickerResult>;
  }
  