const db = firebase.firestore();

window.addEventListener('load', event => {
  const reader = new NDEFReader();
  const scanButton = document.getElementById('scan');
  const svgObject = document.getElementById('svgObject');
  const svgDoc = svgObject.contentDocument;
  console.log(svgDoc);
  
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
      
      const svgItem = svgDoc.getElementById(room.id);
      console.log(svgItem);
      
      document.getElementById("p1").innerHTML = `You are in the ${data.name}.`;
      
      if (data.occupied) {
        document.getElementById("p2").innerHTML = `You found them!`;
        svgItem.setAttribute('style', 'fill:lime;stroke:#000000;stroke-width:1.5;stroke-opacity:1');
      } else {
        document.getElementById("p2").innerHTML = `It is empty.`;
        svgItem.setAttribute('style', 'fill:red;stroke:#000000;stroke-width:1.5;stroke-opacity:1');
      }
    });
  };
}, false);
