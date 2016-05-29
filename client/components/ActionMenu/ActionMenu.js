import React, {PropTypes} from 'react'
import cn from 'classnames'

class ActionMenu extends React.Component {
  static displayName = 'ActionMenu'

  static propTypes = {
    actions: PropTypes.object,
  }

  getChecked(props) {
    return props.app.newUsers.filter((u) => u.$checked).length
  }

  createMenu(props) {
    const checked = this.getChecked(props)

    const menuConfig = [
      {
        label: 'actions',
        action: 'Actions',
      },
      {
        label: 'filters',
        action: 'Filters',
      },
      {
        label: `MOVE (${checked})`,
        action: 'Move',
      },
    ]

    return menuConfig.map((menu, i) => {
      const classes = cn('ActionMenu-btn', {
        '--active': props.menu.open && props.menu.context === menu.action,
        '--disabled': menu.action === 'Move' && !checked,
      })

      return (
        <div
          key={i}
          onClick={props.actions.toggleMenu.bind(this, menu.action)}
          className={classes}>
          {menu.label}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="ActionMenu">
        {this.createMenu(this.props)}
      </div>
    )
  }
}

export default ActionMenu
