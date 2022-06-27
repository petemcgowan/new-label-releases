import { E_ERROR } from "./enum";

// REACT
export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// ERRORS
export interface IMsg {
  msg: string | any;
}

// AUTH
export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  error: IError;
  clearErrors(): void;
}

export interface ILoginModal extends IAuthForm {
  login(): void;
}

export interface IRegisterModal extends IAuthForm {
  register(): void;
}

export interface ILogoutProps {
  logout(): void;
}

export interface IError {
  id: E_ERROR;
  msg: IMsg;
}

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean };
  error: IError;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// NAVBAR
export interface IAppNavbar {
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

// ITEMS
export interface IExistingItem {
  _id: string;
  name: string;
}

export interface IItem {
  _id?: string;
  name: string;
}

export interface IItemModal {
  isAuthenticated: boolean;
  addItem(): void;
}

export interface IItemReduxProps extends IAuthReduxProps {
  item: {
    items: IExistingItem[];
  };
}

// Pete todo: Get rid of any of the commented out stuff eventually and anything that isn't being referenced / used?
// export interface IShoppingList {
//   item: {
//     items: IExistingItem[];
//   };
//   getItems(): void;
//   deleteItem(id: string): void;
//   isAuthenticated: boolean;
// }

// <<<<<<<<<<<>>>>>>>>>>>>
// <<<<<<<< FLUX >>>>>>>>>
// <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
}

export interface IRegData {
  user: string;
  token: string;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IReleaseAction {
  type: string;
  // payload?: IRelease[];
  releases: IReleaseTrack[];
  release: IReleaseTrack;
  trackIndex: number;
  volume: string;
  duration: number;
  songId: string;
  time: number;
}

export interface ISpotifyArtist {
  name: string;
}

export interface ISpotifyExternalUrl {
  spotify: string;
}

export interface ISpotifyImage {
  url: string;
}

export interface ISpotifyItem {
  name: string;
  artists: ISpotifyArtist[];
  href: string;
  duration_ms: string;
  preview_url: string;
  external_urls: ISpotifyExternalUrl;
}

export interface ISpotifyTrack {
  items: ISpotifyItem[];
}

// Spotify object (not actually IRelease yet, this is more JSON)
export interface ISpotifyRelease {
  artists: ISpotifyArtist[];
  name: string;
  label: string;
  release_date: string;
  album_type: string;
  images: ISpotifyImage[];
  tracks: ISpotifyTrack;
}

export interface IRelease {
  id?: string;
  artists: string[];
  href: string;
  releaseName: string;
  trackName: string;
  label: string;
  durationMiSecs: string;
  releaseDate: string;
  albumType: string;
  releases: IRelease[];
}

export interface IReleaseTrack {
  id: string;
  artists: string;
  href: string;
  releaseName: string;
  trackName: string;
  label: string;
  durationMiSecs: string;
  releaseDate: string; // is this not a date?
  releaseSmallImage: string; // this is a URL
  releaseMidImage: string; // this is a URL
  albumType: string;
  previewUrl: string;
}
