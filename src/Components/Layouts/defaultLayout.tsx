// Layout.tsx
import React, { ReactNode } from 'react';
// import Sidebar from './Sidebar';
import Header from '../DemoSubComponents/DemoHeader';
import Footer from '../DemoSubComponents/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header FoodItems={[]} />

        {/* Main content */}
        <main className="flex-grow p-1 bg-gray-100">
          {children}
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;
