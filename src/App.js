import React from 'react';
import ReactPlayer from 'react-player';
import './App.css'
import 'milligram';


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

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
           <input type="submit" value="Submit" />
         </form>

        </div>
        <div className="column column-75">
          <ReactPlayer url="http://gw.ipfs.video/ipfs/QmU1GSqu4w29Pt7EEM57Lhte8Lce6e7kuhRHo6rSNb2UaC" />
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
    <NameForm />
  </div>
  );
}

export default App;
