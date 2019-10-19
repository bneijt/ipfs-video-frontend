import React from 'react';
import ReactPlayer from 'react-player';
import './App.css'

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom";

class CustomCidFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      invalid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(event) {
      if(event.target.value.length === "QmcuAfSwwrrMqCvaFXbEZWsWfF7TyPKHocFeNqsSQT5Eie".length) {
        this.props.history.push("/ipfs/" + event.target.value);
        this.setState({invalid: false});
      } else {
        this.setState({invalid: true});
      }
    }

    handleSubmit(event) {
      event.preventDefault();
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
           <label>
             Custom IPFS hash
             <input type="text" onChange={this.handleChange} />
           </label>
           <input className="button" type="submit" value="Submit" />
         </form>
      );
    }
}


class VideoPlayerComponent extends React.Component {
  render() {
    return (
          <ReactPlayer
            url={"http://gw.ipfs.video/ipfs/" + this.props.cid}
            controls
            playing
            muted
          />
    );
  }
}

function VideoPlayerRouteHandler() {
  let { cid } = useParams();

  return (
      <VideoPlayerComponent cid={cid} />
  );
}

function CustomCidFormHandler() {
  let history = useHistory();
  return (
      <CustomCidFormComponent history={history} />
  );
}

function App() {
  return (
  <div className="container">
    <div className="row">
      <div className="column">
        <h1>IPFS video player</h1>
      </div>
    </div>
    <Router>

    <div className="row">
      <div className="column column-25">
      <p>Welcome to the IPFS video player</p>
      <p>
        Below are a few example video's that are nice to start with:
        <ul>
          <li><Link to="/ipfs/QmcuAfSwwrrMqCvaFXbEZWsWfF7TyPKHocFeNqsSQT5Eie">Blender Half full</Link></li>
          <li><Link to="/ipfs/QmU1GSqu4w29Pt7EEM57Lhte8Lce6e7kuhRHo6rSNb2UaC">ipfstube.erindachtler.me</Link></li>
          <li><Link to="/ipfs/QmUG7eDU26xrqxuZ2evEPzAkARMTsufUutxaKBZibxunE6">Monkey</Link></li>
        </ul>
      </p>


      </div>
      <div className="column column-75">
        <Switch>
          <Route path="/ipfs/:cid" children={<VideoPlayerRouteHandler />} />
        </Switch>
      </div>
    </div>
    <div className="row">
      <div className="column">
        <CustomCidFormHandler />
      </div>
    </div>
    </Router>
    <div className="row">
      <div className="column">

<p>There is a also <a href="https://kodi.tv/">Kodi</a> plugin under development
   that will complement this website, available at:
   <a href="https://github.com/bneijt/ipfs-video-kodi">https://github.com/bneijt/ipfs-video-kodi</a>
</p>
<p>There is also a project to help you host your own IPFS pinning gateway easily:
   <a href="https://github.com/bneijt/ipfs-video-gateway">https://github.com/bneijt/ipfs-video-gateway</a>
</p>
<p>To see what may be part of it's future,
  visit <a href="https://ipfstube.erindachtler.me/">https://ipfstube.erindachtler.me/</a>
  who has a great <a href="https://ipfstube.erindachtler.me/v/QmU1GSqu4w29Pt7EEM57Lhte8Lce6e7kuhRHo6rSNb2UaC">demo video</a>.
</p>

</div>
</div>

  </div>
  );
}

export default App;
