import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      show: {}
    }
  }
  
  componentDidMount() {
    axios.get("http://localhost:8000/tvshow")
      .then(res => {
        console.log(res);
        this.setState({shows: res.data.data, show: {}});
      })
      .catch(err => console.log(err));
  }

  changeTitle = e => {
    this.setState({show: {...this.state.show, title: e.target.value}});
  }

  changeNetwork = e => {
    this.setState({show: {...this.state.show, network: e.target.value}});
  }

  changeGenre = e => {
    this.setState({show: {...this.state.show, genre: e.target.value}});
  }

  addShow = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/tvshow", this.state.show)
      .then(res => {
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  render() {
    return (
      <div>
        <h1>Tv Shows</h1>
        <table border="1">
          <tbody>
          <tr>
            <th>Title</th>
            <th>Network</th>
            <th>Genre</th>
          </tr>
          {
            this.state.shows.map( s => 
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.network}</td>
                <td>{s.genre}</td>
              </tr>  
            )
          }
          </tbody>
        </table>
        <form onSubmit={this.addShow}>
          <input
            type="text"
            placeholder="Title"
            onChange={this.changeTitle}
            value={this.state.show.title}
          />
          <input
            type="text"
            placeholder="Network"
            onChange={this.changeNetwork}
            value={this.state.show.network}
          />
          <input
            type="text"
            placeholder="Genre"
            onChange={this.changeGenre}
            value={this.state.show.genre}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
