import uuid from "uuid/v4";

const DEFAULT_VOLUME = 0.65;

export const initialState = {
  currentSongId: "",
  currentTime: 0,
  duration: 0,
  playing: false,
  volume: DEFAULT_VOLUME,
  releases: [],
};

export const ReleaseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DUMMY_RELEASE":
      return [
        ...state,
        {
          artists: action.release.artists,
          href: "",
          releaseName: action.release.releaseName,
          trackName: "",
          label: "",
          durationMiSecs: "",
          releaseDate: "",
          albumType: "",
          id: uuid(),
        },
      ];
    case "ADD_RELEASES": {
      // this is just to print out the release name:
      action.releases.map((release) => {
        console.log("release.releaseName:" + release.releaseName);
        return release.releaseName;
      });
      return { ...state, releases: action.releases };
    }
    case "REMOVE_RELEASE": {
      const releasesCopy = Array.from(state.releases);
      console.log("releasesCopy:" + JSON.stringify(releasesCopy));

      state.releases = state.releases.filter((release) => {
        console.log("ReleaseReducer, release:" + JSON.stringify(release));
        console.log("ReleaseReducer, action:" + JSON.stringify(action));
        console.log(
          "ReleaseReducer, release.trackName !== action.release.trackName:" +
            (release.trackName !== action.release.trackName)
        );
        console.log("ReleaseReducer, release.trackName" + release.trackName);
        console.log(
          "ReleaseReducer, action.release.trackName:" + action.release.trackName
        );

        return release.trackName !== action.release.trackName;
      });
      return { ...state, releases: state.releases };
      // return state.releases;
    }
    case "SET_VOLUME":
      return { ...state, volume: parseFloat(action.volume) };
    case "SET_DURATION":
      return { ...state, duration: action.duration };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.time };
    case "PLAY": {
      console.log("dispatch: Play");
      return {
        ...state,
        playing: true,
        currentSongId: action.songId || state.currentSongId,
      };
    }
    case "PAUSE": {
      console.log("dispatch: Pause");
      return { ...state, playing: false };
    }
    default:
      return state;
  }
};
