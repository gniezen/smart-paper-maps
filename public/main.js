const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', event => {
  const scanButton = document.getElementById('scan')
  const reader = new NDEFReader();
  
  scanButton.addEventListener('click', async () => {
    try {
      console.log('Scanning..');
      await reader.scan();
    } catch(e) {
      console.error("Error: ", e);
    }
  });
  
  reader.onreading = async event => {
    console.log('Event:', event);
    
    const query = await db.collection('rooms').where('tag', '==', event.serialNumber).get();    
    query.forEach(room => {
      const data = room.data();
      console.log(room.id, '=>', data);
      
      document.getElementById("p1").innerHTML = `You are in the ${data.name}.`;
      
      if (data.occupied) {
        document.getElementById("p2").innerHTML = `You found them!`;
      } else {
        document.getElementById("p2").innerHTML = `It is empty.`;
      }
    });
  };
});
