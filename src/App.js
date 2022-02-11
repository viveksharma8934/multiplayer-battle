import './App.css';
import Carousel from './components/Carousel/Carousel';
import { React, Component } from 'react'
import ResponsiveAppBar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameCard from './components/GameCard/GameCard';
import BasicTable from './components/LeaderBoard/LeaderBoard';


export default class App extends Component {
  render() {
    return (
    //   <div style={{ 
    //     backgroundImage: `url("https://res.cloudinary.com/practicaldev/image/fetch/s--k9QWkgUr--/c_imagga_scale,f_auto,fl_progressive,h_720,q_auto,w_1280/https://dev-to-uploads.s3.amazonaws.com/i/arasur0jjdbqabgl69xr.png
    //   ")`
    // }}>
    <div>
        {/* <ResponsiveAppBar />
        <GameCard/> */}
        <Router>
        <ResponsiveAppBar/>
        <Routes>
          <Route exact path="/" element={<GameCard/>}/> 
          <Route path="/leaderboard" element ={<div style={{display:'flex',justifyContent:'center',alignItem:'center',marginTop:'100px'}}><BasicTable/></div>} />
          </Routes>
        </Router>
      </div>
    )
  }
};  





