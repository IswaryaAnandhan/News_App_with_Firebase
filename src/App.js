import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import NewsPage from "./components/NewsPage";
import Login from './components/Login';
import Logout from './components/Logout';
import { useContext } from "react";
import { stateContext } from "./components/contextApi/StateProvider";

function App() {
  const [{user}] = useContext(stateContext);
  console.log(user);
  return (
    <div className="App">
         <div className="container">
        <div className="row">
            <h1>News Reader App</h1>
            {user ? (
              <Logout />
            ) : (
              <Login />
            )}
      <NewsPage/>
</div>
</div>
    </div>
  );
}

export default App;
