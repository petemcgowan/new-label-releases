import React, { useContext, useState } from "react";
import { ReleaseContext } from "../contexts/ReleaseContext";
import { RecordCrateContext } from "../contexts/RecordCrateState";
import "../styles/formElements.scss";
import { /*searchForTracksWhittler,*/ getToken } from "../utils/spotifyHelpers";
import { SpotifyCredentials } from "../utils/SpotifyCredentials";
import uuid from "uuid/v4";

const SearchReleaseForm = () => {
  // 'dispatch' here means addRelease (now in the reducer)
  const { dispatch } = useContext(ReleaseContext);
  const { recordCrate } = useContext(RecordCrateContext);
  const [searchTerms, setSearchTerms] = useState("");
  var [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spotify = SpotifyCredentials();
    if (token === "") {
      console.log("token has no value, getting it now");
      token = await getToken(spotify.ClientId, spotify.ClientSecret);
      setToken(token);
    }
    console.log("token value (post):" + token);

    // good testing:
    // const testingSearchTerms = 'black%20loops%20year%3A2019-2020';
    const searchTermAssumption = "%20year%3A2019-2020";
    // const testingSearchTerms = 'black%20loops%20year%3A2019-2020';
    var searchTermField = searchTerms;
    // e.g. black%20loops
    //const searchTermField = UICtrl.inputField().searchTerms;

    encodeURIComponent(searchTermField);
    searchTermField += searchTermAssumption;
    // get the list of releases
    var releasesTrackLevel = [];
    if (token !== "" && token !== undefined) {
      await searchForTracks(token, searchTerms).then((releaseDetails) => {
        releaseDetails.forEach((releaseDetail) => {
          console.log("releaseDetail:" + JSON.stringify(releaseDetail));
          releaseDetail.tracks.items.forEach((trackDetail) => {
            console.log("trackDetail:" + JSON.stringify(trackDetail));

            var releaseTrack = {
              artists: trackDetail.artists[0].name,
              href: trackDetail.href,
              releaseName: releaseDetail.name,
              trackName: trackDetail.name,
              label: releaseDetail.label,
              durationMiSecs: trackDetail.duration_ms,
              releaseDate: releaseDetail.release_date,
              releaseImage: releaseDetail.images[2].url,
              albumType: releaseDetail.album_type,
              previewUrl: trackDetail.preview_url,
              id: uuid(),
            };

            // Need to filter out release names that are already in the crate....
            var found = recordCrate.some((crateItem) => {
              console.log(
                "crateItem.releaseName:" +
                  crateItem.releaseName +
                  "releaseTrack.releaseName, " +
                  releaseTrack.releaseName +
                  "crateItem.trackName:" +
                  crateItem.trackName +
                  "releaseTrack.trackName, " +
                  releaseTrack.trackName + //this is track name
                  "crateItem.artists, " +
                  crateItem.artists +
                  "releaseTrack.artists, " +
                  releaseTrack.artists
              );

              return (
                crateItem.releaseName === releaseTrack.releaseName &&
                crateItem.trackName === releaseTrack.trackName &&
                crateItem.artists === releaseTrack.artists
              );
            });
            if (!found) {
              releasesTrackLevel.push(releaseTrack);
            } // end if found
          }); //end track detail
        }); //end release detail
        console.log(
          "submitReleases, releasesTrackLevel:" +
            JSON.stringify(releasesTrackLevel)
        );

        // UICtrl.createTrackTable(releasesTrackLevel);
      });
    }
    ////////////////////////////////

    dispatch({ type: "ADD_RELEASES", releases: releasesTrackLevel });
    setSearchTerms("");
  };

  const searchForTracks = async (token, searchTerms) => {
    console.log("start of searchForTracks, searchTerms:" + searchTerms);
    const queryReleases =
      "https://api.spotify.com/v1/search?q=artist" +
      encodeURIComponent(":") +
      // encodeURIComponent(searchTerms) +
      searchTerms +
      "%20year%3A2019-2020" +
      // '%3Ablack%20loops%20year%3A2019-2020' +
      //encodeURIComponent('"') +
      "&type=album&market=DE&limit=3&offset=0";

    // get Releases
    const releaseResult = await fetch(queryReleases, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    console.log(
      "searchForTracks, releaseResult:" + JSON.stringify(releaseResult)
    );
    const releaseDataJson = await releaseResult.json();
    console.log(
      "searchForTracks, releaseDataJson:" + JSON.stringify(releaseDataJson)
    );

    let tracks = await Promise.all(
      releaseDataJson.albums.items.map(async (releaseEl) => {
        let queryTracksUrl = `${releaseEl.href}`;
        let trackResult = await fetch(queryTracksUrl, {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        });
        return trackResult.json();
      })
    );
    console.log("searchForTracks, tracks:" + tracks);
    console.log("searchForTracks, tracks(JSON):" + JSON.stringify(tracks));

    return tracks;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Artist to search for:
        <input
          type="text"
          placeholder="search Terms"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
          required
        />
      </label>
      <input type="submit" value="Search Releases" />
    </form>
  );
};

export default SearchReleaseForm;