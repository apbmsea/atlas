import type { FileInfo } from "@shared/types/file";

export type State = {
  current: FileInfo | null;
  modelUrl: string | null;
  loading: boolean;
  error: string | null;
};

export type ModelProps = { modelUrl?: string | null; height?: number };