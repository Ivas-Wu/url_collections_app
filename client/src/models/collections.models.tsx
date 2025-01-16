import { Url } from "./url.models";

export interface Collection {
  collectionUrl: string;
  shortUrlList: string[];
  collectionName: string;
  urls: Url[]
  viewCount: number;
  upCount: number;
  downCount: number;
  createdAt: string;
  updatedAt: string;
}