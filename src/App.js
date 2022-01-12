import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Posts from './components/posts';
import Bottom from './components/bottom'
import LogIn from './components/logIn';
import PostView from './components/postView';
import Manager from './components/manager';
import EditPost from './components/editPost';
import AddPosts from './components/addPost';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comments from './components/comments';
import EditTeacher from './components/editTeacher';
import AddTeacher from './components/addTeacher';
import ContactUs from './components/contactUs';



if(window.location.pathname === '/'){
  window.location.pathname = '/home';
}

function App() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home" exact><Posts /></Route>
            <Route path="/home/:id"><PostView /></Route>
            <Route path="/login"><LogIn /></Route>
            <Route path="/manager" exact><Manager /></Route>
            <Route path="/manager/edit-post/:id"><EditPost /></Route>
            <Route path="/manager/add-post"><AddPosts /></Route>
            <Route path="/comments/:id"><Comments /></Route>
            <Route path="/manager/edit-teacher/:id"><EditTeacher /></Route>
            <Route path="/manager/add-teacher"><AddTeacher /></Route>
            <Route path="/contact-us"><ContactUs /></Route>
          </Switch>
        </Router>
      </div>
      <Bottom />
    </div>
  );
}

export default App;
