import React from "react";
import blobTop from "../../public/blobTop.svg";
import blobBottom from "../../public/blobBottom.svg";

export default function Header(props){  
  return (
    <>
      <main>
            <img src={blobTop} className="blob-top" alt="yellow-blob"/>
            <div className="quizzical">
                <h1>quizzical</h1>
                <span>Created By HR</span>
                <button className="start" onClick={event => props.handleStart(event, true, false)}>Start Quiz</button>

                <select className="category" onChange={event => props.handleStart(event, false, false)}>
                    <option value="select">--Select category--</option>
                    <option value="general knowledge">General Knowledge</option>
                    <option value="mythology">Mythology</option>
                    <option value="sports">Sports</option>
                    <option value="politics">Politics</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                    <option value="art">Art</option>
                    <option value="celebrities">Celebrities</option>
                    <option value="animals">Animals</option>
                </select>
            </div>

            <img src={blobBottom} className="blob-bottom" alt="blob-bottom" />

      </main>
    
    </>
  )
}
