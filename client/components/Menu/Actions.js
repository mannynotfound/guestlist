import React, {PropTypes} from 'react'

class Actions extends React.Component {
  static displayName = 'Actions'

  static propTypes = {
    app: PropTypes.object,
    actions: PropTypes.object,
  }

  copyUsers() {
    const fakeDiv = document.createElement('textarea')
    fakeDiv.innerText += JSON.stringify(this.props.app.newUsers)
    fakeDiv.id = 'copy-users'

    document.getElementsByTagName('body')[0].appendChild(fakeDiv)
    console.log(document.getElementById('copy-users'))

    setTimeout(() => {
      document.getElementById('copy-users').select()
      try {
        const successful = document.execCommand('copy')
        const msg = successful ? 'successful' : 'unsuccessful'
        console.log(`Copying text command was ${msg}`)
      } catch (err) {
        console.log('Oops, unable to copy')
      }
    }, 10000)
  }

  render() {
    const {actions} = this.props

    return (
      <div className="Actions">
        <div
          className="Menu-btn"
          onClick={actions.toggleMenu.bind(this, 'AddList')}>
          {'NEW LIST'}
        </div>
        <div
          className="Menu-btn"
          onClick={actions.toggleMenu.bind(this, 'Get')}>
          {'GET USERS'}
        </div>
        {/* app.newUsers && app.newUsers.length ?
          <div
            className="Menu-btn"
            onClick={this.copyUsers.bind(this)}>
            {'LOG USERS'}
          </div> : null */}
      </div>
    )
  }
}

export default Actions
