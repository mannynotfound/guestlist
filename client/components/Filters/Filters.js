import React, {PropTypes} from 'react'

class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filtered: props.app.filtered,
      filters: [
        'unlisted',
        'selected',
        ...props.app.lists.map((l) => l.slug),
      ],
    }
  }

  static displayName = 'Filters'

  static propTypes = {
    app: PropTypes.object,
    actions: PropTypes.object,
  }

  createFilters(props, state) {
    const {actions, app} = props
    const {filters} = state

    return filters.map((f, i) => (
      <div
        onClick={actions.onFilter.bind(this, f)}
        className="Filters-option"
        key={i}>
        <input
          type="checkbox"
          className="--show-bg"
          checked={(app.filtered && app.filtered.indexOf(f) > - 1) || false} />
        <label>{f}</label>
      </div>
    ))
  }

  render() {
    const filterElements = this.createFilters(this.props, this.state)

    return (
      <ol type="1" className="Filters">
        {filterElements}
      </ol>
    )
  }
}

export default Filters
