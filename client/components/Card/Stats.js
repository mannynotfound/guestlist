import React, {PropTypes} from 'react'
import * as helpers from './helpers'

class Stats extends React.Component {
  static displayName = 'Stats'

  static propTypes = {
    user: PropTypes.object,
  }

  static defaultProps = {
    user: null,
  }

  render() {
    const {user} = this.props
    if (!user) return null

    const baseUrl = 'https://twitter.com/'
    const profileUrl = baseUrl + user.screen_name

    const stats = [
      {
        'label': 'TWEETS',
        'prop': 'statuses_count',
        'url': '/',
      },
      {
        'label': 'FLLWNG',
        'prop': 'friends_count',
        'url': '/following',
      },
      {
        'label': 'FLLWRS',
        'prop': 'followers_count',
        'url': '/followers',
      },
      {
        'label': 'LIKES',
        'prop': 'favourites_count',
        'url': '/likes',
      },
    ]

    return (
      <div className="Stats">
        {stats.map((s, i) => (
           <a className="Stat" href={profileUrl + s.url} key={i}>
              <div className="Stat-label">{s.label}</div>
              <div className="Stat-value">{helpers.abbrNum(user[s.prop], 1)}</div>
           </a>
        ))}
      </div>
    )
  }
}

export default Stats
