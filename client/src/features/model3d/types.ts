import type { FileInfo } from "@shared/types/file";

export type Model3DState = {
  list: FileInfo[];
  current?: FileInfo | null;
  modelUrl?: string | null;
  loadingList: boolean;
  loadingModel: boolean;
  uploading: boolean;
  deleting: boolean;
  error?: string | null;
};

export type ModelProps = { modelUrl?: string | null; height?: number };