import { useContext, useState } from "react";
// eslint-disable-next-line
import React from "react";

import "../styles/formElements.scss";
import { getToken } from "../utils/spotifyHelpers";
import { SpotifyCredentials } from "../utils/SpotifyCredentials";
import { DiscogsCredentials } from "../utils/DiscogsCredentials";
import { ReleaseContext } from "../contexts/ReleaseContext";
import { RCContext } from "../cratestate/RCContext";
// import uuid from "uuid/v4";
import { v4 as uuidv4 } from "uuid";
import {
  IReleaseTrack,
  ISpotifyItem,
  ISpotifyRelease,
} from "../types/interfaces";
import {
  IDiscogsAxiosResponse,
  IDiscogsResult,
  ISpotifyInputObj,
} from "../types/discogsInterfaces";

//API Info
const ROOT_URL = "https://api.discogs.com";
//Discogs API
const discogs = DiscogsCredentials();
const SIG = `key=${discogs.API_KEY}&secret=${discogs.SECRET}`;
const SEARCH = "/database/search?";

const SearchLabelReleases = () => {
  // 'dispatch' here means addRelease (now in the reducer)
  const { dispatch } = useContext(ReleaseContext);
  // const { state } = useContext(RecordCrateContext);
  const { stateRC } = useContext(RCContext);

  // eslint-disable-next-line prefer-const
  let [token, setToken] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const spotify = SpotifyCredentials();
    if (token === "") {
      console.log("token has no value, getting it now");
      token = await getToken(spotify.ClientId, spotify.ClientSecret);
      setToken(token);
    }
    console.log("token value:" + token);

    const spotifyInputArr: ISpotifyInputObj[] = [];
    const axios = require("axios");

    // NOTE: type = master causes issues so I'm omitting it
    // We need & here because key and secret are in the GET
    const searchTerm1 = "&label=";
    // const searchTerm2 = encodeURIComponent("Ilian Tape");
    const searchTerm2 = encodeURIComponent("Toy Tonics");
    const searchTerm3 = "&year=2020-2021";

    const discogsURL =
      ROOT_URL + SEARCH + SIG + searchTerm1 + searchTerm2 + searchTerm3;
    // Pete todo:  Put these in authorization headers in Postman, then try moving that here (as I'd prefer to use headers).  There is also the idea that you should be programmatically creating the token vs through Postman.
    const config = {
      method: "get",
      url: discogsURL,
      headers: {},
    };

    await axios(config)
      .then(async (response: IDiscogsAxiosResponse) => {
        // response.data(

        console.log(
          "SearchLabelReleases, response:" + JSON.stringify(response.data)
        );
        // ******************
        // FIRST STEP:  console out the variables you're interesting in from Discogs(DCLabelDearchYear2020-2021json is the array),
        response.data.results.forEach(async (result: IDiscogsResult) => {
          // Pete TODO: This is an array, if it's a label search, I'm only interested in a match to that label, if it exists, otherwise it's not useful data and should be discarded
          console.log("result.label:" + result.label);
          // Pete TODO: Barcode is an array, you need to pick out the most "barcodey" (12-13 numerics) that exists in the array
          console.log("result.barcode:" + result.barcode);
          console.log("result.title:" + result.title);
          // Clean up that title a bit

          console.log(result.title.split(" - "));
          // then slowly create the array that will feed the Spotify calls...
          const index = result.title.indexOf(" - "); // Gets the first index where a space occurs
          let artist = result.title.substr(0, index);
          let name = result.title.substr(index + 1);

          // clean that string up

          // artist = artist.replace(/[^a-zA-Z0-9]/g, "");  // exludes all Latin alphabet characters
          // Pete TODO: Special cases to deal with "Joel Holmes (3) - Osmosis", "Cody Currie & Joel Holmes (3) - Metropolis"
          artist = artist.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,
            ""
          );
          name = name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, "");
          console.log("Cleansed: artist:" + artist + ", name:" + name);

          // trim leading spaces
          artist = artist.trim();
          name = name.trim();
          console.log("Trimmed: artist:" + artist + ", name:" + name);

          // pick out the realest barcode from that mess
          let barCodeOfOurDreams = "";
          console.log("result.barcode:" + JSON.stringify(result.barcode));
          if (result.barcode && result.barcode.length !== 0) {
            for (let i = 0; i < result.barcode.length; i++) {
              console.log("result.barcode[i]:" + result.barcode[i]);
              if (
                result.barcode[i].length === 12 ||
                result.barcode[i].length === 13
              ) {
                barCodeOfOurDreams = result.barcode[i];
                console.log("barCodeOfOurDreams:" + barCodeOfOurDreams);
              }
            }
          }

          // Need to create an array of all "artist" + "names"  derived from Discogs "titles"
          const spotifyInputObj: ISpotifyInputObj = {
            label: result.label,
            barcode: barCodeOfOurDreams,
            title: result.title,
            artist: artist,
            name: name,
          };
          // check if barcode already exists

          let barCodeMatchFound = false;
          if (spotifyInputObj.barcode !== "") {
            console.log(
              "result.barcode was not blank:" + spotifyInputObj.barcode
            );
            barCodeMatchFound = spotifyInputArr.some((spotArElem) => {
              return spotifyInputObj.barcode === spotArElem.barcode;
            }); // end some
          }

          if (!barCodeMatchFound) {
            console.log("barcode Match was not found, so adding spot Input...");
            spotifyInputArr.push(spotifyInputObj);
          } else
            console.log("barCode Aleady Exists in Array:" + result.barcode);
        });
        console.log("spotifyInputArr:" + JSON.stringify(spotifyInputArr));
      })
      .catch((error: any) => {
        console.log("SearchLabelReleases, error:" + error);
      });

    const releasesTrackLevel: IReleaseTrack[] = [];
    for (let i = 0; i < spotifyInputArr.length; i++) {
      // spotifyInputArr.forEach(async (spotInput) => {
      console.log(
        "SearchLabelReleases, spotifyInputArr[i]:" +
          JSON.stringify(spotifyInputArr[i])
      );
      // Pete TODO:  label match check
      // Pete TODO:  barcode(where available) match check - if there is an element in DC array that barcode matches an element in SP array, we want that, even if the names don't match, because it IS a match regardless (UPCs are unique)

      // Call Spotify for each "album" (release).  the artist query bit is set in spotifyHelpers
      const searchTerms =
        spotifyInputArr[i].artist +
        encodeURIComponent(" ") +
        "album" +
        encodeURIComponent(":") +
        spotifyInputArr[i].name;
      console.log("SearchLabelReleases, searchTerms:" + searchTerms);

      const searchTermAssumption = "%20year%3A2020-2021";
      let searchTermField = searchTerms;

      encodeURIComponent(searchTermField);
      searchTermField += searchTermAssumption;
      console.log(
        "searchTermField:" + searchTermField + ", searchTerms:" + searchTerms
      );
      // get the list of releases
      if (token !== "" && token !== undefined) {
        await searchForTracks(token, searchTerms).then(
          (releaseDetails: ISpotifyRelease[]) => {
            releaseDetails.forEach((releaseDetail: ISpotifyRelease) => {
              console.log("releaseDetail:" + JSON.stringify(releaseDetail));
              releaseDetail.tracks.items.forEach(
                (trackDetail: ISpotifyItem) => {
                  console.log("trackDetail:" + JSON.stringify(trackDetail));

                  const releaseTrack = {
                    artists: trackDetail.artists[0].name,
                    href: trackDetail.href,
                    releaseName: releaseDetail.name,
                    trackName: trackDetail.name,
                    label: releaseDetail.label,
                    durationMiSecs: trackDetail.duration_ms,
                    releaseDate: releaseDetail.release_date,
                    releaseSmallImage: releaseDetail.images[2].url, // 0 is biggest, 2 is smallest
                    releaseMidImage: releaseDetail.images[1].url, // 0 is biggest, 2 is smallest
                    albumType: releaseDetail.album_type,
                    previewUrl: trackDetail.preview_url,
                    openSpotUrl: trackDetail.external_urls.spotify,
                    id: uuidv4(),
                  };

                  // Need to filter out release names that are already in the crate....
                  const found = stateRC.recordCrate.some((crateItem) => {
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
                  }); // end some
                  if (!found) {
                    releasesTrackLevel.push(releaseTrack);
                  } // end if found
                }
              ); //end track detail forEach
            }); //end releaseDetails forEach
          }
        ); //end searchForTracks then
      } // if token
    } //spotifyInputArr.forEach
    ////////////////////////////////
    console.log(
      "dispatch:, releasesTrackLevel" + JSON.stringify(releasesTrackLevel)
    );
    dispatch({ type: "ADD_RELEASES", releases: releasesTrackLevel });
  }; // end of handleSubmit

  const searchForTracks = async (token: string, searchTerms: string) => {
    console.log("start of searchForTracks, searchTerms:" + searchTerms);
    // "label" search (i need album too)
    const queryReleasesUrl =
      "https://api.spotify.com/v1/search?q=artist" +
      //abba%20album%3Agold
      encodeURIComponent(":") +
      searchTerms +
      "%20year%3A2019-2020" +
      //encodeURIComponent('"') +
      "&type=album&market=DE&limit=20&offset=0";

    // get Releases
    const releaseResult = await fetch(queryReleasesUrl, {
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

    const tracks: ISpotifyRelease[] = await Promise.all(
      releaseDataJson.albums.items.map(async (releaseEl: { href: string }) => {
        const queryTracksUrl = `${releaseEl.href}`;
        const trackResult = await fetch(queryTracksUrl, {
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
      <input
        type="submit"
        value="Search Label Releases"
        style={{
          backgroundColor: "rgba(138, 149, 143, 1)",
          color: "rgba(255, 255, 255, 1)",
          width: "100%",
        }}
      />
    </form>
  );
};

export default SearchLabelReleases;
