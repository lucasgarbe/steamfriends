import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import IdInput from '../components/idInput'
import Friend from '../components/friend'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Friends = ({ friends, ids , profiles}) => {
  return (
    <div>
      <h1>Steamfriends</h1>
      <IdInput />
      {profiles.map(friend => <Friend key={friend.steamid} profile={friend}/>)}
    </div>
  )
}

Friends.getInitialProps = async ({ req, query }) => { 
  const steamkey = serverRuntimeConfig.steamkey
  const res = await fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${steamkey}&steamid=${query.steamid}&relationship=friend`)
  const json = await res.json()
  const friends = await json.friendslist.friends
  const ids = await friends.map(friend => friend.steamid)
  const idsString = await ids.slice(0, 100).join(',')
  const idsRes = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamkey}&steamids=${idsString}`)
  const profilesJson = await idsRes.json()
  const profiles = profilesJson.response.players
  return { friends: friends, ids: idsString, profiles}
}

export default Friends

