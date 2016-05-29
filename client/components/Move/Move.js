import React, {PropTypes} from 'react'

class Move extends React.Component {
  static displayName = 'Move'

  static propTypes = {
    app: PropTypes.object,
    actions: PropTypes.object,
  }

  createMenu(props) {
    return props.app.lists.map((list, i) => (
      <div
        key={i}
        className="Move-option"
        onClick={props.actions.moveAll.bind(this, props.app, list.slug)}>
        {list.slug}
      </div>
    )).concat([
      <div
        key="trash"
        className="Move-option --trash"
        onClick={props.actions.moveAll.bind(this, props.app, 'trash')}>
        {'TRASH'}
      </div>
    ])
  }

  render() {
    console.log(this.props)

    return (
      <div className="Move">
        {this.createMenu(this.props)}
      </div>
    )
  }
}

export default Move
