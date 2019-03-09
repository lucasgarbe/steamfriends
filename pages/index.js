import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import Friend from '../components/friend'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Home = ({ friends, ids , profiles}) => {
  return (
    <div>
      {console.log(profiles)}
      <h1>Steamfriends</h1>
      {profiles.map(friend => <Friend key={friend.steamid} profile={friend}/>)}
    </div>
  )
}

Home.getInitialProps = async ({ req }) => { 
  const steamkey = serverRuntimeConfig.steamkey
  const res = await fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${steamkey}&steamid= 76561197960435530relationship=friend`)
  const json = await res.json()
  const friends = await json.friendslist.friends
  const ids = await friends.map(friend => friend.steamid)
  const idsString = await ids.slice(0, 100).join(',')
  const idsRes = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamkey}&steamids=${idsString}`)
  const profilesJson = await idsRes.json()
  const profiles = profilesJson.response.players
  return { friends: friends, ids: idsString, profiles}
}

export default Home

