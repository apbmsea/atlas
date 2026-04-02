export type RenderProps = {
    modelId: string;
    wsUrl?: string;          // если нужен прямой URL; иначе строим из API_BASE_URL
    height?: number;
  };