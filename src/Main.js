import React from 'react';
import axios from 'axios';
import Item from './item'

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        items: []
    }
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  async componentDidMount(){
    const items = (await axios.get('/api/items')).data
    this.setState({
        items
    })
  }

  //you should wrap this in a try catch
  async addItem() {
    //you should update this route to send the new item that is being created
    //capture the new item as the return value to the axios call
    //const newItem = await (axios.post('/')).data
    //and add the new item to the state
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
              <ul>
                {this.state.items.map(item => {
                    return (
                      <Item key={item.id} id={item.id} name={item.name} deleteItem={this.deleteItem}/>
                    )})
                }
              </ul>
          </div>
      </div>
    );
  }
}
