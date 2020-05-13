# wc3stats

[wc3stats.com](https://wc3stats.com/) is a user-made service that processes
replays and can act as a bridge to allow maps to make network calls. Fixus and
other Sheep Tag maps use the service to track Elo scores and other statistics.
You can view Sheep Tag leaderboards, statistics, and games at
[wc3stats.com/sheep-tag](https://wc3stats.com/sheep-tag).

# Replays
Replays must be uploaded to the service to have any effect. This can be done
manually at [wc3stats.com/upload](https://wc3stats.com/upload) or through use
of the replay uploader program
([download](https://wc3stats.com/auto-uploader)).

# NetworkIO
NetworkIO is a protocol to allow maps to make network requests in-game. This is
used by Fixus to bias the team selection phase against players who play the
same team repeatidly (but only if an outsized of players want to play on that
team). This functionality requires the replay uploader program
([download](https://wc3stats.com/auto-uploader)) and requires you add
`api.w3x.io` to the whitelist. You can do this by:

1. Download [W3CStats.exe](https://wc3stats.com/auto-uploader)
2. Run `WC3Stats.exe`
3. Open the program _Settings_ file:\
![image](https://user-images.githubusercontent.com/4513209/81761198-2d003580-947e-11ea-80fe-5ec050f8871e.png)
4. Add `api.w3x.io` to the `whitelist` array:\
![image](https://user-images.githubusercontent.com/4513209/81761382-a566f680-947e-11ea-8def-21b1537b995d.png)
