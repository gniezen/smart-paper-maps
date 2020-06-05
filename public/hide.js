const selector = document.getElementById('hide-select');
const db = firebase.firestore();

window.addEventListener('load', async event => {
  const svgObject = document.getElementById('svgObject');
  const svgDoc = svgObject.contentDocument;
  console.log(svgDoc);
  
  selector.addEventListener('click', async () => {
    const roomId = selector.value;
    
    if (roomId) {
      console.log('Leaving', roomId);
      const roomRef = db.collection('rooms').doc(roomId);
      const fields = {
        occupied: false
      };
      
      await roomRef.update(fields);
      
      const svgItem = svgDoc.getElementById(roomId);
      console.log(svgItem);
      svgItem.setAttribute('style', 'fill:none;stroke:#000000;stroke-width:1.5;stroke-opacity:1');
    }
  });

  selector.addEventListener('change', async () => {
    const roomId = selector.value;

    console.log('Entering', roomId);
    const roomRef = db.collection('rooms').doc(roomId);
    
    const fields = {
      occupied: true
    };
    
    await roomRef.update(fields);
    
    const svgItem = svgDoc.getElementById(roomId);
    console.log(svgItem);
    svgItem.setAttribute('style', 'fill:lime;stroke:#000000;stroke-width:1.5;stroke-opacity:1');
  });
});



