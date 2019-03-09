import React from 'react'
import Link from 'next/link'

class IdInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {steamId: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({steamId: event.target.value})
  }

  render() {
    return (
      <div>
        <input value={this.state.steamId} onChange={this.handleChange} />
        <Link href={{ pathname: '/friends', query: { steamid: this.state.steamId } }}>
          <button>Display Friends</button>
        </Link>
      </div>
    )
  }
}

export default IdInput
