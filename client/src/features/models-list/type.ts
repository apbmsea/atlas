import type { FileInfo } from "@shared/types/file";

export type ModelListState = {
  list: FileInfo[];
  loading: boolean;
  error: string | null;
};
