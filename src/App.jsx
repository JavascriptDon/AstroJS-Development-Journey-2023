import React from 'react'
import Header from './components/Header.jsx';
import QAPage from "./components/Q&A.jsx"



function App() {
  const [appState, setAppState] = React.useState({"isGameOn": false, "category": "select"})

	function handleStart(event, shouldStart, shouldReset) {
		const category = event.target.value
		setAppState(prevAppState => {
			return {
				"isGameOn": shouldReset ? false : (appState.category !== "select"? shouldStart: false),
				"category": shouldReset ? "select" : (event.type === "click" ? appState.category : category)
			}
		})
	}
	
	return (
		<div>
			{!appState.isGameOn && <Header handleStart={handleStart}/>},
			{appState.isGameOn && <QAPage category = {appState.category} handleStart={(event) => handleStart(event, false, true)}/>}
		</div>
	)
}

export default App
