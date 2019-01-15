import React, { Component } from 'react'
import { connect } from 'react-redux'

import {signIn, signOut} from '../actions'

class GoogleAuth extends Component {

  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '257829188351-mh0hegk24uvu4d81fvh2fl2mnnml5164.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange)
      })// end of gapi client init .then
    })// end of gapi load
  }// end of componentDidMount

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    }
    else {
      this.props.signOut()
    }
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null){
      return null
    }
    else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      )
    }
    else {
      return (
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    return(
      <div>{this.renderAuthButton()}</div>
    )
  }
}// end of GoogleAuth Component

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signIn, signOut})(GoogleAuth)
