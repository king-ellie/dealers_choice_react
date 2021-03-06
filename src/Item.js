import React from 'react';

const Item = (props) => {
    const { id, name, deleteItem } = props
    return (
        <div className='item'>
            <li>{name}</li>
            <button onClick={()=> deleteItem(id)}>Delete</button>
        </div>
    )
}

export default Item