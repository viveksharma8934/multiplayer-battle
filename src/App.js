import './App.css';
import Carousel from './components/Carousel/Carousel';
import { React, Component } from 'react'
import ResponsiveAppBar from './components/Navbar/Navbar';


export default class App extends Component {
  render() {
    return (
      <div>
        <ResponsiveAppBar />
        <Carousel />
      </div>
    )
  }
};  





