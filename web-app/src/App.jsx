import { firebaseStorage } from './firebase';
import './App.css';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { useRef } from 'react';

function App() {
  const fileNameInput = useRef(null)

  function downloadFile() {
    console.log("Download File")
    const fileName = fileNameInput.current.value
    getDownloadURL(ref(firebaseStorage, fileName))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element
        const img = document.getElementById('myimg');
        img.setAttribute('src', url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  function listFiles() {
    const listRef = ref(firebaseStorage, '/');
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log(itemRef.fullPath)
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  return (
    <div className="App">
      <div>FileName
        <input type='text' ref={fileNameInput} defaultValue={'invalid whitespace.png'}></input>
      </div>
      <div>
        <button onClick={() => downloadFile()}>Download</button>
      </div>
      <div>
        <button onClick={() => listFiles()}>List Files - Check console logs</button>
      </div>
      <img id='myimg'></img>
    </div>
  );
}

export default App;
