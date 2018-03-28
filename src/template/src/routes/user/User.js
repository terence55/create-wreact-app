import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import userModel from '../../models/user';
import Info from './components/Info';
import localeText, { setLocaleToCookie, localeTextFromRes } from '../../utils/localeUtils';
import './index.css';

const localRes = {
  'en-US': {
    info: 'Locale Text {0}'
  },
  'zh-CN': {
    info: '局部文字 {0}'
  }
};

class App extends React.Component {
  switchLocale(locale) {
    setLocaleToCookie(locale);
    window.location.reload();
  }

  render() {
    const { history, userActions, userList, user } = this.props;
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>{localeText('user.title')}</h1>
        </header>
        <div>---Route---</div>
        <div>
          <button onClick={() => history.push('/')}>Back to Home</button>
        </div>
        <div>---i18n---</div>
        <div className='App-intro'>
          <div>{localeText('user.date', new Date().toDateString())}</div>
          <div>{localeText('user.time', { time: new Date().toTimeString() })}</div>
          <div>{localeText('user.welcome', { name: 'Jason', count: 25 })}</div>
          <div>{localeTextFromRes('info', localRes, new Date().toDateString())}</div>
          <button onClick={() => this.switchLocale('zh-CN')}>Set locale to CH</button>
          <button onClick={() => this.switchLocale('en-US')}>Set locale to EN</button>
        </div>
        <div>---Mock---</div>
        <div>
          <button onClick={() => userActions.getUserList()}>Get User List</button>
          <button onClick={() => userActions.getUser()}>Get User</button>
          <Info>UserList: {userList && JSON.stringify(userList)}</Info>
          <Info>User: {user && JSON.stringify(user)}</Info>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userList: state.getIn(['user', 'userList']),
    loading: state.getIn(['user', 'loading']),
    user: state.getIn(['user', 'user'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userModel.actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
