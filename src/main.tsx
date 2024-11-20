import { AppRegistry } from 'react-native';
import App from '../App';

AppRegistry.registerComponent('invoice-app', () => App);

AppRegistry.runApplication('invoice-app', {
  rootTag: document.getElementById('root')
});