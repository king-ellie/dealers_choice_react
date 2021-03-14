import React from 'react';
import axios from 'axios';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        items: []
    }
    this.addItem = this.addItem.bind(this)
    // this.deleteItem = this.deleteItem.bind(this)
  }

  async componentDidMount(){
    const items = (await axios.get('/api/items')).data
    this.setState({
        items
    })
  }

  async addItem() {
    await axios.post('/')
  }

  async deleteItem(itemId){
    try{
      await axios.delete(`/${itemId}`)
      const items = (await axios.get('/api/items')).data
      this.setState({
        items
      })
    }
    catch(error){
      console.log('DELETE REQUEST ERROR:', error)
    }
  }

  render() {
    return (
      <div>
          <h1>Pantry List</h1>
          <form method='POST' id='entry'>
              <input name='item'></input>
              <button onClick={() => this.addItem()}>New Item</button>
          </form>
          <div id='item-list'>
              {this.state.items.map(item => {
                  return (
                      <div key={item.id} >
                        <li>{item.name}</li>
                        <button onClick={()=> this.deleteItem(item.id)}>Delete</button>
                      </div>
                  )})
              }
          </div>
      </div>
    );
  }
}
