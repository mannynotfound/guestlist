import React, {PropTypes} from 'react'

class Tools extends React.Component {
  static displayName = 'Tools'

  static propTypes = {
    user: PropTypes.object,
  }

  static contextTypes = {
    actions: PropTypes.object,
  }

  render() {
    const {user} = this.props
    const {actions} = this.context

    return (
      <div className="Tools">
        <div className="Tool-check">
          <input
            type="checkbox"
            readOnly
            checked={user.$checked || false} />
          <label>
            <span style={{display: 'none'}}>Checked</span>
          </label>
        </div>
        <div
          onClick={actions.trashUser.bind(this, user)}
          className="Tools-trash" />
      </div>
    )
  }
}

export default Tools
