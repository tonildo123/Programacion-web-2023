import { Provider } from 'react-redux';
import { store } from "./state/store";
import RouterApp from './routes';

function App() {
  return (
    <Provider store={store}>      
      <RouterApp />      
    </Provider>
  );
}

export default App;
