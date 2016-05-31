import React, {PropTypes} from 'react'
import cn from 'classnames'
import Stats from './Stats'
import Banner from './Banner'
import Tools from './Tools'
import Memberships from './Memberships'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static displayName = 'Card'

  static propTypes = {
    user: PropTypes.object,
  }

  static defaultProps = {
    user: null,
  }

  onHoverIn() {
    if (!this.state.hovering) {
      this.setState({
        hovering: true
      })
    }
  }

  onHoverOut() {
    if (this.state.hovering) {
      this.setState({
        hovering: false
      })
    }
  }

  render() {
    const {hovering} = this.state
    const {user} = this.props
    if (!user) return null

    const baseUrl = 'https://twitter.com/'
    const profileUrl = baseUrl + user.screen_name

    const cardClass = cn('Card', {
      '--highlight': hovering || user.$checked,
    })

    const nameClass = cn('Card-profile-name-link', {
      '--badge': user.verified,
    })

    return (
      <div className={cardClass}>
        <div className="Card-inner">
          <Banner
            onMouseEnter={this.onHoverIn.bind(this)}
            onMouseLeave={this.onHoverOut.bind(this)}
            {... this.props} />
          <div className="Card-content">
            <span className="Card-profile-link">
              <img className="Card-profile-img" src={user.profile_image_url} />
            </span>
            <Stats {... this.props} />
            <div className="Card-user-fields">
              <div className="Card-profile-name">
                <div className="Card-profile-name-inner">
                  <a
                    className={nameClass}
                    href={profileUrl}>
                    {user.name}
                    {user.verified ?
                      <div className="Card-profile-badge">
                        <div className="Card-profile-badge-icn" />
                      </div> : null}
                  </a>
                </div>
              </div>
              <div className="Card-profile-screenname">
                <a className="Card-profile-screenname-link" href={profileUrl}>
                  {`@${user.screen_name}`}
                </a>
              </div>
              <div className="Card-profile-bio">
                {user.description}
              </div>
            </div>
          </div>
          <Memberships {...this.props} />
          <Tools {...this.props} />
        </div>
      </div>
    )
  }
}

export default Card
