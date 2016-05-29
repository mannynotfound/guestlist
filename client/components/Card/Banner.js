import React, {PropTypes} from 'react'

class Banner extends React.Component {
  static displayName = 'Banner'

  static propTypes = {
    user: PropTypes.object,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  }

  static contextTypes = {
    actions: PropTypes.object,
  }

  render() {
    const {user, onMouseEnter, onMouseLeave} = this.props
    const {actions} = this.context

    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="Banner"
        onClick={actions.toggleCheck.bind(this, user)}
        style={{backgroundImage: `url(${user.profile_banner_url})`}} />
    )
  }
}

export default Banner
