import React from 'react';
import Navbar from '../components/Navbar';
import ShortcutTiles from '../components/ShortcutTiles';
import Wallet from '../components/Wallet';
import Banner from '../components/Banner';







const Home = () => {
  return (
    <div>
      <Navbar />
<Banner/>
      <ShortcutTiles />
<Wallet/>
      {/* More sections here */}
    </div>
  );
};

export default Home;
