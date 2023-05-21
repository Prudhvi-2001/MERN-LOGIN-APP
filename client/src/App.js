
import './App.css';
import FormExample from './components/FormExample';
import NormalForm from './components/NormalForm';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import store from './store';
import UseState from './components/UseState';
function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<FormExample/>
    },{
      path:'/login',
      element:<Login/>
    },{
      path:'/profile',
      element:<Profile/>
    },{
      path:'/sample',
      element:<UseState/>
    }
  ])
  return (
    <Provider store={store}>
      <div className="App">
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
    </Provider>
    
  );
}

export default App;
