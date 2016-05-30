import React, {PropTypes} from 'react'
import {findDOMNode} from 'react-dom'

class AddList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: '',
      desc: '',
    }
  }
  static displayName = 'AddList'

  static propTypes = {
    actions: PropTypes.object,
    client: PropTypes.object,
  }

  onInputName(e) {
    this.setState({
      list: e.target.value,
    })
  }

  onInputDesc(e) {
    this.setState({
      desc: e.target.value,
    })
  }

  componentDidMount() {
    findDOMNode(this.refs.name).focus()
  }

  render() {
    const {list, desc} = this.state
    const {actions, client} = this.props

    const submitFn = actions.createList.bind(this, client.cookie, {list, desc})

    return (
      <div id="AddList" className="Menu-center">
        <div className="Menu-row">
          <label className="Menu-label">
            {'Name:'}
          </label>
          <input
            ref="name"
            className="Menu-input"
            type="text"
            onChange={this.onInputName.bind(this)}
            value={list}/>
        </div>
        <div className="Menu-row">
          <label className="Menu-label">
            {'Description:'}
          </label>
          <input
            className="Menu-input"
            type="text"
            onChange={this.onInputDesc.bind(this)}
            value={desc}/>
          <span
            className="Menu-submit"
            onClick={submitFn}/>
        </div>
      </div>
    )
  }
}

export default AddList
