
import './App.css';
import {Route , Switch} from 'react-router-dom'
import { Nav } from './Components/Nav';
import Home from './Padges/Home';
import CreatePost from './Padges/CreatePost';
import PostDetails from './Padges/PostDetails';
import LoginPage from './Padges/LoginPage';
import Profile from './Padges/Profile';
import AddFrind from './Padges/AddFrind';
import ForgotPassowrd from './Padges/ForgotPassowrd';
import ResetPass from './Padges/ResetPass';


function App() {
  return (
    <div className="App">
     <Nav/>
     <Switch>
     <Route path= '/' exact>
       <Home/>
       </Route>
       <Route path= '/createpost'>
       <CreatePost/>
       </Route>
       <Route path= '/post/:id'>
       <PostDetails/>
       </Route>
       <Route path= '/login'>
       <LoginPage/>
       </Route>
       <Route path= '/profile/:id'>
        <Profile/>
        </Route>
        <Route path= '/addfriend'>
         <AddFrind/>
        </Route>
        <Route path= '/forgotpassowrd'>
         <ForgotPassowrd/>
        </Route>
        <Route path= '/reset/:code'>
         <ResetPass/>
        </Route>

     </Switch>
       
   
    
    </div>
  );
}

export default App;
