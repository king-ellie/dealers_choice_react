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


  // HERE: working on grabbing input value and posting it/adding it to the db
  async addItem(event) {
    console.log('event.target:', event.target)
    console.log(await axios.post('/api/items/1'))
  }

  render() {
    return (
      <div>
          <h1>Pantry List</h1>
          <form method='POST' id='entry'>
              <input name='item'></input>
              <button onClick={() => this.addItem(event)}>New Item</button>
          </form>
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
