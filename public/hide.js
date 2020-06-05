const selector = document.getElementById('hide-select');
const db = firebase.firestore();

window.addEventListener('load', async event => {
  const hideButton = document.getElementById('hide');

  
  hideButton.addEventListener('click', async () => {
    
  
    const query = await db.collection('rooms').get();    
    query.forEach(room => {
      const data = room.data();
      console.log(room.id, '=>', data);
      
      const svgObject = document.getElementById('svgObject');
      const svgDoc = svgObject.contentDocument;
      console.log(svgDoc);
      
      const svgItem = svgDoc.getElementById(room.id);
      console.log(svgItem);
      
      if (svgItem != null) {
        console.log('Adding event listener for', room.id, svgItem);
        svgItem.addEventListener('click', function (event) {
	        console.log('YES!', event, event.path[1].id);
        }, false);
      }
    });
  });
  
  selector.addEventListener('click', async () => {
    const roomId = selector.value;
    
    if (roomId) {
      console.log('Leaving', roomId);
      const roomRef = db.collection('rooms').doc(roomId);
      const fields = {
        occupied: false
      };
      
      await roomRef.update(fields);
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
  });
});



