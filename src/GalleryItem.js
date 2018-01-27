import React from "react";

export default class GalleryItem extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectionCb(this.props.index);
  }

  render() {
    const { selected, name, index } = this.props;
    const className = "gallery-item" + (selected ? " selected" : "");

    return (
        <div class={className} onClick={this.handleClick}>
          {name}
        </div>
    );
  }
}
