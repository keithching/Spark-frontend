interface User {
  displayName: string;
  photoURL: string;
}

export type CurrentUser = User | undefined | null;

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectFit: string;
}
