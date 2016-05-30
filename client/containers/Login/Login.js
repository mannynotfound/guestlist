import React from 'react'

class Login extends React.Component {
  static displayName = 'Login'

  render() {
    return (
      <div className="Login">
        <a href="/api/login-twitter" className="Login-btn">
          {'Login with Twitter. '}&rarr;
        </a>
      </div>
    )
  }
}

export default Login

