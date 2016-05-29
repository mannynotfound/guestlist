import React from 'react'
import Page from '../../components/Page/Page'
import filterUsers from '.././../utils/filterUsers'

class Home extends React.Component {
  static displayName = 'Home'

  static propTypes = {
    app: React.PropTypes.object,
    actions: React.PropTypes.object,
  }

  render() {
    const {actions} = this.props
    const filteredUsers = filterUsers(this.props.app)

    return (
      <div className="Home">
        {filteredUsers.length ?
          <Page users={filteredUsers} /> :
          <div
            className="Home-get-cta"
            onClick={actions.toggleMenu.bind(this, 'Get')}>
            {'No users loaded! Click to fetch more.'}
          </div>}
      </div>
    )
  }
}

export default Home
