import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import homeModel from '../../models/home';
import logo from '../../assets/images/logo.svg';
import './index.css';

class App extends React.Component {
  render() {
    const { history, homeActions, time, loading, requestData } = this.props;
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>React Home</h1>
        </header>
        <div>---Route---</div>
        <div>
          <button onClick={() => history.push('/user')}>Goto User</button>
        </div>
        <div>---Redux OP---</div>
        <div>
          <button onClick={() => homeActions.showTime()}>Show Time</button>
          <button onClick={() => homeActions.showTime(`Custom Msg ${new Date().toString()}`)}>Show Custom Msg</button>
          <button onClick={() => homeActions.hideTime()}>Hide Time</button>
          <button onClick={() => homeActions.clearHome()}>Clear Home</button>
          <button onClick={() => homeActions.clearAll()}>Clear All</button>
          <div className='App-msg'>{time || 'Time is empty'}</div>
        </div>
        <div>---Async Request---</div>
        <div>
          {!loading ? <button onClick={() => homeActions.asyncPull()}>Async Pull</button> : 'Loading...'}
          <div className='App-msg'>{requestData ? `requestData is ${JSON.stringify(requestData)}` : 'requestData is empty'}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.getIn(['home', 'time']),
    loading: state.getIn(['home', 'loading']),
    requestData: state.getIn(['home', 'requestData'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: bindActionCreators(homeModel.actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
