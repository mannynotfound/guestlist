import Actions from '../../actions'
import React, {Component, PropTypes, cloneElement} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import cn from 'classnames'
import {isEqual} from 'lodash'
import Navigation from '../../components/Navigation/Navigation'

export class App extends Component {
  static propTypes = {
    'params': PropTypes.object.isRequired,
    'actions': PropTypes.object.isRequired,
    'app': PropTypes.object.isRequired,
    'client': PropTypes.object.isRequired,
    'children': PropTypes.object.isRequired,
  }

  static childContextTypes = {
    'client': PropTypes.object,
    'actions': PropTypes.object,
  }

  getChildContext() {
    return {
      'client': this.props.client,
      'actions': this.props.actions,
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      window.scrollTo(0, 0)
    }
  }

  componentDidMount() {
    this.props.actions.checkUsers()
  }

  render() {
    const {children, client} = this.props

    // make children without themselves as props
    const childProps = {...this.props}
    delete childProps.children

    const appClasses = cn('App', `--${client.agent}`)

    return (
      <div className={appClasses}>
        <Navigation {... this.props} />
        <div className="App-content">
          {cloneElement(children, childProps)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    'app': state.app,
    'client': state.client,
    'menu': state.menu,
    'errors': state.errors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    'actions': bindActionCreators(Actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
