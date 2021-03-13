import React from 'react';
import axios from 'axios';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        items: []
    }
    this.addItem = this.addItem.bind(this)
  }

  async componentDidMount(){
    const items = (await axios.get('/api/items')).data
    this.setState({
        items
    })
  }

  async addItem(event) {
    console.log('event.target:', event.target)
    // await axios.post('/api/items/1')
  }

  render() {
    return (
      <div>
          <h1>Pantry List</h1>
          <div id='entry'>
              <input></input>
              <button onClick={() => this.addItem(event)}>New Item</button>
          </div>
          <div id='item-list'>
              {this.state.items.map(item => {
                  return (
                      <li key={item.id}>{item.name}</li>
                  )})
              }
          </div>
      </div>
    );
  }
}
