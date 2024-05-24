import { useState, useEffect } from 'react';
import { BackButton, ListParticipants, Loading } from "../utils";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2 seconds delay
  }, []);

  return (
    <div>
      <BackButton />
      {isLoading ? 
        <div className="charging">
          <Loading />
        </div> 
      : 
        <ListParticipants />}
    </div>
  )
}