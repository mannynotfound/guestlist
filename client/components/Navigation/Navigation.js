import React from 'react'
import Logo from '../Logo/Logo'
import {Link} from 'react-router'
import Menu from '../Menu/Menu'
import ActionMenu from '../ActionMenu/ActionMenu'

class Navigation extends React.Component {
  static displayName = 'Navigation'

  render() {
    return (
      <nav className="Navigation">
        <div className="Navigation-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="Navigation-tools">
          <ActionMenu {... this.props} />
          <Menu {...this.props} />
        </div>
      </nav>
    )
  }
}

export default Navigation
