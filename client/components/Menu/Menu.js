import React, {createElement, PropTypes} from 'react'
import Filters from '../Filters/Filters'
import Move from '../Move/Move'

class Menu extends React.Component {
  static displayName = 'Menu'

  static propTypes = {
    menu: PropTypes.object,
  }


  render() {
    const {menu} = this.props

    if (!menu.open) {
      return null
    }

    // TODO: make these real
    const Actions = Filters
    const AddList = Filters

    const cptMap = {
      Filters,
      Actions,
      AddList,
      Move,
    }

    const MenuCpt = createElement(cptMap[menu.context], this.props)

    return (
      <div className="Menu">
        <div className="Menu-inner">
          {MenuCpt}
        </div>
      </div>
    )
  }
}

export default Menu
