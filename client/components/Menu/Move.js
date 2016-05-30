import React, {PropTypes} from 'react'

class Move extends React.Component {
  static displayName = 'Move'

  static propTypes = {
    app: PropTypes.object,
    actions: PropTypes.object,
    client: PropTypes.object,
  }

  createMenu(props) {
    const {app, client, actions} = props

    return app.lists.map((list, i) => (
      <div
        key={i}
        className="Menu-btn"
        onClick={actions.moveAll.bind(this, client.cookie, app, list.slug)}>
        {list.slug}
      </div>
    )).concat([
      <div
        key="trash"
        className="Menu-btn --trash"
        onClick={actions.moveAll.bind(this, client.cookie, app, 'trash')}>
        {'TRASH'}
      </div>
    ])
  }

  render() {
    return (
      <div className="Move">
        {this.createMenu(this.props)}
      </div>
    )
  }
}

export default Move
