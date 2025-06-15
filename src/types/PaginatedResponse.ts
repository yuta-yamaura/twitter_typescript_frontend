import type { Comment } from "./Comment";
import type { Tweet } from "./Tweet";

export type PaginatedResponse<T extends Tweet | Comment> = {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
};
