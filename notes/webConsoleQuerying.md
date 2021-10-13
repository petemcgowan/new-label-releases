Spotify Web Console
https://developer.spotify.com/console/

Search endpoint (request a token first, they expire):
https://developer.spotify.com/console/get-search-item/

/_ This works on Web Console:
https://api.spotify.com/v1/search?q=artist%3Ablack%20loops%20year%3A2019-2020&type=album&market=DE&limit=3&offset=0
_/

/_ What you're using:
https://api.spotify.com/v1/search?query=artist%3A%22black%2520loops%2520year%253A2019-2020%22+year%3A2020&type=album&market=DE&offset=0&limit=3
_/
