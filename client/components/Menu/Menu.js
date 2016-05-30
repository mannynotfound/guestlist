import React, {createElement, PropTypes} from 'react'
import Filters from './Filters'
import Move from './Move'
import Get from './Get'
import Actions from './Actions'
import AddList from './AddList'

class Menu extends React.Component {
  static displayName = 'Menu'

  static propTypes = {
    menu: PropTypes.object,
    actions: PropTypes.object,
  }

  render() {
    const {menu, actions} = this.props

    if (!menu.open) {
      return null
    }

    const cptMap = {
      Filters,
      Actions,
      AddList,
      Move,
      Get,
    }

    const MenuCpt = createElement(cptMap[menu.context], this.props)

    return (
      <div className="Menu">
        <div
          className="Menu-close"
          onClick={actions.toggleMenu.bind(this, menu.context)} />
        <div className="Menu-inner">
          {MenuCpt}
        </div>
      </div>
    )
  }
}

export default Menu
