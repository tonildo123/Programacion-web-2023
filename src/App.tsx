import { Provider } from 'react-redux';
import { store } from "./state/store";
import RouterApp from './routes';
import Layout from './components/LayoutComponent';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <RouterApp />
      </Layout>
    </Provider>
  );
}

export default App;
