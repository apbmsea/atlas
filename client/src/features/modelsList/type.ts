import type { FileInfo } from "@shared/types/file";

export type State = {
  list: FileInfo[];
  loading: boolean;
  error: string | null;
};
