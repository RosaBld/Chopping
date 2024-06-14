export default function ExpirationLocalStorage () {
  window.customLocalStorage = {
    getItem: function() {
      console.log("Running getItem function");
      const participants = JSON.parse(window.localStorage.getItem('participants'));
    
      if(participants) {
        const currentTime = Date.now();
        // const maxAge = 5 * 60 * 1000; //for 5 minutes
        const maxAge = 20 * 60 * 60 * 1000; // for 20 hours
        // If the current time is more than maxAge later than the stored timestamp, remove 'participants', 'drinks', and 'orders'
        if(currentTime - participants.expireTime > maxAge) {
          window.localStorage.removeItem('participants');
          window.localStorage.removeItem('drinks');
          window.localStorage.removeItem('orders');
          window.location.href = '/';
          return null;
        } else {
          return participants;
        }
      }
      return null;
    }
  }

  // Run the function immediately when the app is opened
  window.customLocalStorage.getItem();
}



// export default function ExpirationLocalStorage () { 
//   window.customLocalStorage = {
//     clear: function() {
//       window.localStorage.removeItem('participants');
//       window.localStorage.removeItem('drinks');
//       window.localStorage.removeItem('orders');
//       window.location.href = '/';
//     }
//   }

//   setTimeout(window.customLocalStorage.clear, 60000); 
// }