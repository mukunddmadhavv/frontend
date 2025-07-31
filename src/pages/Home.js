import React from 'react';
import Navbar from '../components/Navbar';
import ShortcutTiles from '../components/ShortcutTiles';
import Wallet from '../components/Wallet';
import Banner from '../components/Banner';
import BusinessName from '../components/BusinessName';
import ExpiredMembers from '../components/ExpiredMembers'; 









const Home = () => {
  return (
    <div>
      <Navbar />
<Banner/>
<BusinessName />
      <ShortcutTiles />
<Wallet/>
<ExpiredMembers/>
      {/* More sections here */}
    </div>
  );
};

export default Home;
