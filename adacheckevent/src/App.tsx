
import { useState } from 'react'
import './App.css'

function App() {
async function fetchApi(){
const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20");
  const data = await response.json();
 }  
fetchApi()

}

export default App
