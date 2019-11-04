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
  constructor(props) {
    super(props);
    this.state = {
      gateway: "https://ipfs.io/ipfs/"
    }
    this.handleDuration = this.handleDuration.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  handleError(event) {
    this.setState({gateway: "http://gw.ipfs.video/ipfs/"});
  }
  handleDuration(a,b,c) {
    fetch("http://gw.ipfs.video/tags/" + this.props.cid);
  }

  render() {
    return (
          <ReactPlayer
            url={this.state.gateway + this.props.cid}
            controls
            playing
            muted
            onDuration={this.handleDuration}
            onError={this.handleError}
            width=""
            height=""
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
      <h2>Welcome to the IPFS video player</h2>
      <p>
        At the top, you can use the form to put in your custom <a href="https://ipfs.io">IPFS</a> <a href="https://docs.ipfs.io/guides/concepts/cid/">content id</a>.
        If you have not found any good example to view yet, you can try <Link to="/ipfs/QmaNhV3gWt9TuDpWakUsBDSZw3CuNjur1YXqHV7zxzZrAZ">Blender Half full</Link>,
        the <Link to="/ipfs/QmU1GSqu4w29Pt7EEM57Lhte8Lce6e7kuhRHo6rSNb2UaC">demo video</Link> from <a href="https://ipfstube.erindachtler.me/">https://ipfstube.erindachtler.me/</a>,
        a <Link to="/ipfs/QmawxGDUERBSJpyosS4KqiDCHSBwPihoGuDLw8bYrE2u6f">talk by Alan Kay</Link>,
        the free movie <Link to="/ipfs/Qmey31a4QZrBtSUApGexRLdvN8zQXCajqxjDCBrKj4LBk5">Sita sings the blues</Link>,
        <Link to="/ipfs/QmScwZZKbYN67U9QqjCP6pQVpjNwfBmQwXwMkyWuQ4YcNP">Big Buck Bunny</Link>,
        <a href="http://www.caminandes.com/">Caminandes</a>  <Link to="/ipfs/QmQn4Wih8PYHBzrkq55y4gnrhe2z9SYtYnsLrJHGenNTXC">1</Link>,
        <Link to="/ipfs/QmWherR5qe1eyTpLrVQTLm67RR8jx7QhD4JbFY4CDBvzsh">2</Link>,
        <Link to="/ipfs/Qmf9AjaGDrAStj55mU2bkpa7jHMyD6tbDp5CZZfLsa6GgV">3</Link>
        or simply a <Link to="/ipfs/QmTYqoPYf7DiVebTnvwwFdTgsYXg2RnuPrt8uddjfW2kHS">monkey video</Link> downloaded from Pexels.
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
