import React from 'react';
import ReactPlayer from 'react-player';
import 'milligram';
import './App.css'


class PlayerRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'QmcuAfSwwrrMqCvaFXbEZWsWfF7TyPKHocFeNqsSQT5Eie'
      //QmcuAfSwwrrMqCvaFXbEZWsWfF7TyPKHocFeNqsSQT5Eie
      //QmU1GSqu4w29Pt7EEM57Lhte8Lce6e7kuhRHo6rSNb2UaC
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="column column-25">
        <p>Welcome to the IPFS video player</p>
        <form onSubmit={this.handleSubmit}>
           <label>
             IPFS content hash:
             <input type="text" value={this.state.value} onChange={this.handleChange} />
           </label>
           <input className="button" type="submit" value="Submit" />
         </form>

        </div>
        <div className="column column-75">
          <ReactPlayer
            url={"http://gw.ipfs.video/ipfs/" + this.state.value}
            controls
            playing
            muted
          />
        </div>
      </div>
    );
  }
}



function App() {
  return (
  <div className="container">
    <div className="row">
      <div className="column">
      <h1>IPFS video player</h1>
      </div>
    </div>
    <PlayerRow />
  </div>
  );
}

export default App;
