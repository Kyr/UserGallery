import React from "react";
import GalleryItem from "./GalleryItem";

export default class UserGallery extends React.Component {
  constructor() {
    super();

    this.state = { selectedItemIndex: null };
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  handleSelectionChange(newIndex) {
    if (newIndex !== this.state.selectedItemIndex) {
      this.setState({ selectedItemIndex: newIndex });
    }
  }

  getImagesList(userImages) {
    console.log(userImages);
    return userImages.map((imageName, i) => {
      var state = i === this.state.selectedItemIndex;

      return (
        <GalleryItem
          selectionCb={this.handleSelectionChange}
          selected={state}
          index={i}
          name={imageName.name}
          id={imageName.id}
        />
      );
    });
  }

  componentDidUpdate(){
    console.log(this.props);
  }

  render() {
    return <div className="gallery">{this.getImagesList(this.props.data)}</div>;
  }
}
