export interface IDiscogsAxiosResponse {
  data: IDiscogsResponseData;
  status: number;
  statusText: string;
  headers: string;
  config: string;
  request: string;
}
export interface IDiscogsResponseData {
  results: IDiscogsResult[];
}
// export interface IDiscogsResponse {
//   results: IDiscogsResult[]
// }
export interface IDiscogsResult {
  label: string;
  barcode: string;
  title: string;
  artist: string;
  name: string;
}

export interface ISpotifyInputObj {
  label: string;
  barcode: string;
  title: string;
  artist: string;
  name: string;
}
