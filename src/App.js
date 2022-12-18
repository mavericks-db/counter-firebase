import React, { useEffect, useState } from 'react';
import './App.scss';
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
  const [decr, setDecr] = useState(1);
  const [incr, setIncr] = useState(1);

  async function apiCall(value) {
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

  const changeDecrHandler = (e) => {
    setDecr(e.target.value);
  };

  const changeIncrHandler = (e) => {
    setIncr(e.target.value);
  };

  const reloadHandler = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="container">
      <h2>Counter</h2>
      <div className="wrapper">
        <div className="f-col">
          <button
            type="button"
            className="decBtn"
            onClick={() => clickHandler(-decr)}
          >
            - Decrement
          </button>
          <span>By:</span>
          <input
            type="number"
            value={decr}
            onChange={(e) => changeDecrHandler(e)}
          />
        </div>
        {val ? <h1>{val}</h1> : <h1>0</h1>}
        <div className="f-col">
          <button
            type="button"
            className="incBtn"
            onClick={() => clickHandler(+incr)}
          >
            + Increment
          </button>
          <span>By:</span>
          <input
            type="number"
            value={incr}
            onChange={(e) => changeIncrHandler(e)}
          />
        </div>
      </div>
      <div className="wrapper">
        <button type="button" onClick={() => resHandler()}>
          RESET
        </button>
        <button type="button" onClick={() => reloadHandler()}>
          RELOAD
        </button>
      </div>
    </div>
  );
}

export default App;
