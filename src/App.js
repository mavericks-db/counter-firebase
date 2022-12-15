import React, { useEffect, useState } from 'react';
import './App.css';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import db from './components/Firebase';

function App() {
  const [val, setVal] = useState();
  const [id, setID] = useState();

  function apiCall(value) {
    const docRef = doc(db, 'counters', id);
    updateDoc(docRef, { count: value });
  }

  useEffect(() => {
    const q = query(
      collection(db, 'counters'),
      where('name', '==', 'MyCounter'),
    );
    onSnapshot(q, (snapshot) => {
      let arr = [];
      arr = snapshot.docs.map((el) => ({ ...el.data(), id: el.id }));
      setID(arr[0].id);
      setVal(arr[0].count);
    });
  }, []);

  const resHandler = () => {
    setVal(0);
    apiCall(0);
  };

  const clickHandler = (num) => {
    setVal(val + num);
    apiCall(val + num);
  };

  return (
    <div className="container">
      <h2>Counter</h2>
      <div className="wrapper">
        <button type="button" className="decBtn" onClick={() => clickHandler(-1)}>
          - Decrement
        </button>
        {val ? <h1>{val}</h1> : <h1>0</h1>}
        <button type="button" className="incBtn" onClick={() => clickHandler(1)}>
          + Increment
        </button>
      </div>
      <div className="wrapper">
        <button type="button" onClick={() => resHandler()}>
          RESET
        </button>
        <button type="button" onClick={() => window.location.reload()}>
          RELOAD
        </button>
      </div>
    </div>
  );
}

export default App;
