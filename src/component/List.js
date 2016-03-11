import React from 'react';
import Item from './Item';

class List extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => <Item key={item.id} item={item} />)}
      </div>
    );
  }
}

export default List;
