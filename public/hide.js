const roomId = 'kitchen';
const selector = document.getElementById('hide-select');
const db = firebase.firestore();

async function init() {
  if (roomId) {
    const roomRef = db.collection('rooms').doc(roomId);
    const roomSnapshot = await roomRef.get();
    console.log('Got room:', roomSnapshot);
    
    if (roomSnapshot.exists) {
      
      // await roomRef.update();
    }
  }
}

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


init();
