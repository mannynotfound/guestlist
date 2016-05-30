import React, {PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import Dropzone from 'react-dropzone'

class Get extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      friend: ''
    }
  }
  static displayName = 'Get'

  static propTypes = {
    actions: PropTypes.object,
  }

  onInput(e) {
    this.setState({
      friend: e.target.value.substring(0, 15),
    })
  }

  componentDidMount() {
    findDOMNode(this.refs.friends).focus()
  }

  render() {
    const {actions} = this.props
    const {friend} = this.state

    const friendsFn = actions.getUsers.bind(this, {
      type: 'friends',
      target: friend,
    })

    const dropFn = actions.uploadJSON.bind(this)

    return (
      <div id="Get" className="Menu-center">
        <div className="Get-inner">
          <div className="Get-opt">
            <label className="Menu-label">Get Friends</label>
            <input
              ref="friends"
              className="Menu-input"
              onChange={this.onInput.bind(this)}
              type="text"
              value={friend}/>
            <span
              className="Menu-submit"
              onClick={friendsFn}/>
          </div>
          <div className="Get-opt">
            <label className="Menu-label">Load JSON</label>
            <Dropzone
              name="jsonfile"
              className="Dropzone"
              multiple={false}
              accept="application/json"
              onDrop={dropFn}>
              Upload JSON File
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

export default Get
