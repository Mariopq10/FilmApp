import { Film } from "./film";

export interface SearchResponse {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}
