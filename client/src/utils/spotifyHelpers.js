import uuid from "uuid/v4";
import axios from "axios";

////////////////////////////////////////////
// Pete Note:  I had this all modularised in a way that looked good but got caught up in that forEach not being thread safe (again!).  So I could revisit the modularisation here, but I gotta move with other things right now. But basically what's in SearchLabelReleases and SearchReleasesForm should really be called from where, but do it in stages!!
///////////////////////////////////////////
export const searchForTracksWhittler = async (token, searchTerms, byArtist) => {
  const searchTermAssumption = "%20year%3A2020-2021";
  var searchTermField = searchTerms;

  encodeURIComponent(searchTermField);
  searchTermField += searchTermAssumption;
  // get the list of releases
  let releasesTrackLevel = [];
  try {
    if (token !== "" && token !== undefined) {
      // const releaseDetails = await searchForTracks(
      //   token,
      //   searchTerms,
      //   byArtist
      // );
      // "searchForTracks function"
      console.log("searchForTracks, searchTerms:" + searchTerms);

      let queryReleasesUrl = null;
      let tracks = [];

      if (byArtist) {
        // artist search
        // e.g. Black Loops
        queryReleasesUrl =
          "https://api.spotify.com/v1/search?q=artist" +
          encodeURIComponent(":") +
          // encodeURIComponent(searchTerms) +
          searchTerms +
          "%20year%3A2019-2020" +
          // '%3Ablack%20loops%20year%3A2019-2020' +
          //encodeURIComponent('"') +
          "&type=album&market=DE&limit=20&offset=0";
      } else {
        // "label" search (i need album too)
        queryReleasesUrl =
          "https://api.spotify.com/v1/search?q=artist" +
          //abba%20album%3Agold
          encodeURIComponent(":") +
          searchTerms +
          "%20year%3A2019-2020" +
          //encodeURIComponent('"') +
          "&type=album&market=DE&limit=20&offset=0";
      }
      console.log("searchForTracks, queryReleasesUrl:" + queryReleasesUrl);

      // get Releases
      let config = {
        method: "get",
        url: queryReleasesUrl,
        headers: { Authorization: "Bearer " + token },
      };
      console.log("Now axios(queryReleasesUrl ...");
      await axios(config).then((releaseDataJson) => {
        console.log(
          "searchForTracks, releaseDataJson:" + JSON.stringify(releaseDataJson)
        );
        console.log("Now calling getTracks ...");
        getTracks(releaseDataJson.data, token).then((tracks) => {
          console.log("RELEASEDETAILS:" + JSON.stringify(tracks));
          tracks.forEach((releaseDetail) => {
            releaseDetail.tracks.items.forEach((trackDetail) => {
              let releaseTrack = {
                artists: trackDetail.artists[0].name,
                href: trackDetail.href,
                releaseName: releaseDetail.name,
                trackName: trackDetail.name,
                label: releaseDetail.label,
                durationMiSecs: trackDetail.duration_ms,
                releaseDate: releaseDetail.release_date,
                albumType: releaseDetail.album_type,
                id: uuid(),
                images: releaseDetail.images,
                preview_url: trackDetail.preview_url,
              };

              releasesTrackLevel.push(releaseTrack);
            }); //end track detail
          }); //end release detail
          console.log(
            "searchForTracksWhittler, releasesTrackLevel:" + releasesTrackLevel
          );
        });
      });
    }
  } catch (error) {
    console.log("searchForTracksWhittler, error:" + error);
  }

  return releasesTrackLevel;
};

////////////////////////////////////////////
// export const searchForTracks = async (token, searchTerms, byArtist) => {
//   return tracks;
// };

////////////////////////////////////////////
export const callSpotForDC = async (spotifyInputArr, token) => {
  let releasesTrackLevel = [];
  await spotifyInputArr.forEach(async (spotInput) => {
    console.log("SearchLabelReleases, spotInput:" + JSON.stringify(spotInput));
    // Pete TODO:  label match check
    // Pete TODO:  barcode(where available) match check - if there is an element in DC array that barcode matches an element in SP array, we want that, even if the names don't match, because it IS a match regardless (UPCs are unique)

    // Call Spotify for each "album" (release).  the artist query bit is set in spotifyHelpers
    let searchTerms =
      spotInput.artist +
      encodeURIComponent(" ") +
      "album" +
      encodeURIComponent(":") +
      spotInput.name;
    console.log("SearchLabelReleases, searchTerms:" + searchTerms);

    releasesTrackLevel.push(
      await searchForTracksWhittler(token, searchTerms, false)
    );
  }); // spotifyInputArr
  return releasesTrackLevel;
};

////////////////////////////////////////////
const getTracks = async (releaseDataJson, token) => {
  // Pete todo: note an axios.all is likely needed here for better performance
  let tracks = /*await Promise.all*/ releaseDataJson.albums.items.map(
    async (releaseEl) => {
      let queryTracksUrl = `${releaseEl.href}`;
      console.log("getTracks, queryTracksUrl:" + queryTracksUrl);
      let trackResult = await axios(queryTracksUrl, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });
      console.log("trackResult:" + JSON.stringify(trackResult));
      console.log("Now calling available markets whittle...");
      delete trackResult.data.available_markets;
      trackResult.data.tracks.items.forEach(async (item) => {
        delete item.available_markets;
      });

      return trackResult.data;
    }
  );
  return tracks;
};

////////////////////////////////////////////
export const getToken = async (clientId, clientSecret) => {
  console.log("in getToken");
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  console.log("getToken: after axios");

  const data = await result.json();
  console.log("getToken: data" + JSON.stringify(data));
  return data.access_token;
};
