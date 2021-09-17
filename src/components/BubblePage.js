import React from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axios from "axios";
import axiosWithAuth from "../helpers/axiosWithAuth";

class BubblePage extends React.Component {
  state = {
    colors: [],
    editing: false
  }

  async componentDidMount() {
    const response = await fetchColorService();
    this.setState({
      ...this.state,
      colors: response
    });
  }

  toggleEdit = (value) => {
    this.setState({
      ...this.state,
      editing: value
    })
  };

  saveEdit = (editColor) => {
    axiosWithAuth()
      .put(`colors/${editColor.id}`, editColor)
      .then(resp => {
        this.setState({
          ...this.state,
          colors: this.state.colors.map(color => 
            color.id === editColor.id ? editColor : color
          )
        })
      })
  };

  deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`colors/${colorToDelete.id}`)
      .then(resp => {
        this.setState({
          ...this.state,
          colors: this.state.colors.filter(color => (color.id !== colorToDelete.id))
        })
      })
  };

  render() {
    return (
      <div className="container">
        {this.state.colors && <ColorList colors={this.state.colors} editing={this.state.editing} toggleEdit={this.toggleEdit} saveEdit={this.saveEdit} deleteColor={this.deleteColor} />}
        {this.state.colors && <Bubbles colors={this.state.colors} />}

      </div>
    );
  }
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
