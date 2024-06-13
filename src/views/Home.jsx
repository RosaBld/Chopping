import { useState, useEffect } from 'react';
import { Create, Loading } from "../utils";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [firstOpen, setFirstOpen] = useState(localStorage.getItem('firstOpen') !== 'false');

  useEffect(() => {
    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
      if (firstOpen) {
        setFirstOpen(false);
        localStorage.setItem('firstOpen', 'false');
      }
    }, 1000); // 2 seconds delay
  }, [firstOpen]);

  return (
    <div>
      {isLoading && firstOpen ? 
        <div className="homepage">
          <img src="/Chopping-logo.svg" className="logo" alt="logo-Choppin" />          
          <Loading />
        </div> 
      : 
        <Create />}
    </div>
  )
}