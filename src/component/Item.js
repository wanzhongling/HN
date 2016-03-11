import React from 'react';

class Item extends React.Component {
  render() {
    const {rank, url, title, by, kids} = this.props.item;
    const commentCount = kids ? kids.length : 0;
    return (
      <div className="item">
        <div className="title"><em className="num">{rank}</em>{title}</div>
        <div className="info-box">
          <span className="info">{by}</span>
          <span className="info">{commentCount}</span>
          <span className="info"><a href={url} target="_blank" className="more">more</a></span>
        </div>
      </div>
    );
  }
}

export default Item;
