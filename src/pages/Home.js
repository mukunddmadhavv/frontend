import React from 'react';
import Navbar from '../components/Navbar';
import ShortcutTiles from '../components/ShortcutTiles';
import Wallet from '../components/Wallet';






const Home = () => {
  return (
    <div>
      <Navbar />
      <ShortcutTiles />
<Wallet/>
      {/* More sections here */}
    </div>
  );
};

export default Home;
