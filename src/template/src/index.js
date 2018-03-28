import ReactDOM from 'react-dom';
import './index.css';
import App from './routes';
import { init, collectResource } from './utils/localeUtils';

init(collectResource(require.context('./locale', false, /\.js$/)));

require('./mock');

ReactDOM.render(App, document.getElementById('root'));
