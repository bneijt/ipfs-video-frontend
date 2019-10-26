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
      let cid = event.target.value.trim();
      if(cid.length === "QmcuAfSwwrrMqCvaFXbEZWsWfF7TyPKHocFeNqsSQT5Eie".length) {
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
            <input type="text" id="customCidField" onChange={this.handleChange} placeholder="Custom IPFS hash to load" />
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
    <Router>
    <div className="row">
      <div className="column">
        <h1>IPFS video player</h1>
        <CustomCidFormHandler />
      </div>
    </div>

    <div className="row">
      <div className="column">
        <Switch>
          <Route path="/ipfs/:cid" children={<VideoPlayerRouteHandler />} />
        </Switch>
      </div>
    </div>

    <div className="row">
      <div className="column">
      <p>Welcome to the IPFS video player</p>
      <p>
        At the top, you can use the form to put in your custom <a href="https://ipfs.io">IPFS</a> <a href="https://docs.ipfs.io/guides/concepts/cid/">content id</a>.
        If you have not found any good example to view yet, you can try <Link to="/ipfs/QmcuAfSwwrrMqCvaFXbEZWsWfF7TyPKHocFeNqsSQT5Eie">Blender Half full</Link>,
        the <Link to="/ipfs/QmU1GSqu4w29Pt7EEM57Lhte8Lce6e7kuhRHo6rSNb2UaC">demo video</Link> from <a href="https://ipfstube.erindachtler.me/">https://ipfstube.erindachtler.me/</a>,
        or simply a <Link to="/ipfs/QmUG7eDU26xrqxuZ2evEPzAkARMTsufUutxaKBZibxunE6">monkey video</Link> downloaded from Pexels.
      </p>
      <p>
        Finaly <a href="https://www.reddit.com/r/IPFS_Hashes">reddit IPFS_Hashes</a> might have some IPFS video hashes as well.
      </p>
      </div>
    </div>
    </Router>
    <div className="row">
      <div className="column">
      <h2>Other works under the same project</h2>
      <p>
        A <a href="https://kodi.tv/">Kodi</a> plugin under development
        that will complement this website, available at:
        <a href="https://github.com/bneijt/ipfs-video-kodi">https://github.com/bneijt/ipfs-video-kodi</a>
      </p>
      <p>A project to help you host your own IPFS pinning gateway easily:
         <a href="https://github.com/bneijt/ipfs-video-gateway">https://github.com/bneijt/ipfs-video-gateway</a>
      </p>
</div>
</div>

  </div>
  );
}

export default App;
