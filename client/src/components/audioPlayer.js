import React, { useState } from "react";
import Axios from "axios";

export const AudioPlayer = (props) => {
  const [previewTrack, setPreviewTrack] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");
  const [token, setToken] = useState(props.token);

  const getTrackData = async (id) => {
    let url = `${baseUrl}/v1/tracks/${id}`;
    let trackData = {};
    try {
      trackData = await Axios.get(url, {
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      });
    } catch (error) {
      console.log("Error getting selected track!");
    } finally {
      return trackData;
    }
  };

  useEffect(() => {
    console.log("audioPlayer, useEffect called");

    const fetchTrackData = async () => {
      let trackData = await getTrackData(props.audioTrackId);

      if (Object.keys(trackData).length > 0) {
        setPreviewTrack(trackData.data);
        setPreviewUrl(trackData.data.preview_url);
      }
    };
    fetchTrackData();
  }, []);

  // componentDidUpdate = async newProps => {
  //     let trackData = await this.getTrackData(newProps.audioTrackId);

  //     if(Object.keys(trackData).length > 0) {
  //         this.setState(
  //             {
  //                 previewTrack: trackData.data,
  //                 previewUrl: trackData.data.preview_url
  //             }
  //         );

  //         // hack to re-load audio control
  //         let element = ReactDOM.findDOMNode(this);
  //         let audio = element.querySelector('audio');
  //         if (audio) {
  //             audio.load();
  //             audio.play();
  //         }
  //     }
  // };

  const loadAudioPlayerControl = () => {
    if (previewTrack.length === 0) {
      return <div className="alert alert-warning">Track Loading...</div>;
    } else if (previewTrack && previewUrl === null) {
      return <div className="alert alert-danger">No preview found!</div>;
    } else if (previewTrack && previewUrl) {
      return (
        <div>
          <p className="lead">Playing {previewTrack.name}</p>
          <div className="audio-player-wrap">
            <audio id="audioPlayer" autoPlay controls>
              <source src={previewUrl} type="audio/mpeg" />
              Your browser does not support HTML5 Audio!
            </audio>
          </div>
        </div>
      );
    }
  };

  return loadAudioPlayerControl();
};

export default AudioPlayer;
