import React, {PropTypes} from 'react'
import Logo from '../Logo/Logo'
import {Link} from 'react-router'
import Menu from '../Menu/Menu'
import ActionMenu from '../ActionMenu/ActionMenu'

class Navigation extends React.Component {
  static displayName = 'Navigation'

  static propTypes = {
    app: PropTypes.object,
  }

  render() {
    const {app} = this.props

    return (
      <nav className="Navigation">
        <div className="Navigation-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {app.newUsers ?
          <div className="Navigation-tools">
            <ActionMenu {... this.props} />
            <Menu {...this.props} />
          </div> : null}
      </nav>
    )
  }
}

export default Navigation
