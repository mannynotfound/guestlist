import React from 'react'
import Page from '../../components/Page/Page'
import filterUsers from '.././../utils/filterUsers'

class Home extends React.Component {
  static displayName = 'Home'

  static propTypes = {
    app: React.PropTypes.object,
  }

  render() {
    const filteredUsers = filterUsers(this.props.app)

    return (
      <div className="Home">
        <Page users={filteredUsers} />
      </div>
    )
  }
}

export default Home
