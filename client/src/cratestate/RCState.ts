export interface IRecord {
  id: string;
  artists: string;
  releaseName: string;
  trackName: string;
  emailAddress: string;
}

export interface RCState {
  recordCrate: IRecord[];
  error: string;
  loading: boolean;
}

export interface ResponseDataArray {
  success: boolean;
  count: number;
  data: IRecord[];
}

export interface ResponseDataObject {
  success: boolean;
  count: number;
  data: IRecord;
}

export interface AxiosResponseObject {
  data: ResponseDataObject;
  status: number;
  statusText: string;
  headers: string;
  config: string;
  request: string;
}

export interface AxiosResponseArray {
  data: ResponseDataArray;
  status: number;
  statusText: string;
  headers: string;
  config: string;
  request: string;
}

export const initialRCState: RCState = {
  recordCrate: [],
  error: "",
  loading: true,
};
