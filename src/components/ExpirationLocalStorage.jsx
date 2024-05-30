export default function ExpirationLocalStorage () {
  window.customLocalStorage = {
    getItem: function(key) {
      const item = JSON.parse(window.localStorage.getItem(key));
    
      if(item) {
        const currentTime = Date.now();
        const maxAge = 12 * 60 * 60 * 1000; // for 12hours
    
        // If the stored timestamp is more than maxAge older than the current time, remove 'participants' and 'drinks'
        if(item.expireTime - currentTime < maxAge) {
          window.localStorage.removeItem('participants');
          window.localStorage.removeItem('drinks');
          return null;
        } else {
          return item.data;
        }
      }
      return null;
    },

    setItem: function(key, value) {
      let result = {
        data: value,
        expireTime: Date.now()
      }
      window.localStorage.setItem(key, JSON.stringify(result));
    },
    
    removeItem: function(key) {
      window.localStorage.removeItem(key);
    },
    
    clear: function() {
      window.localStorage.clear();
    }
  }
}