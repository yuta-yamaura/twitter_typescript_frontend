import type { Bookmark } from "./Bookmark";
import type { Comment } from "./Comment";
import type { Tweet } from "./Tweet";

export type PaginatedResponse<T extends Tweet | Comment | Bookmark> = {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
};
