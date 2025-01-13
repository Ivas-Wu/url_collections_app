export interface Collection {
  collectionUrl: Collection;
  shortUrlList: string[];
  collectionName: string;
  createdAt: string;
  urls: CollectionItem[]
}

export interface CollectionItem {
    altName: string;
    shortUrl: string;
    originalUrl: string;
    createdAt: string;
  }