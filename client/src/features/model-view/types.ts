import type { FileInfo } from "@shared/types/file";

export type Model3DState = {
  current: FileInfo | null;
  modelUrl: string | null;
  loading: boolean;
  error: string | null;
};

export type ModelProps = { modelUrl?: string | null; height?: number };