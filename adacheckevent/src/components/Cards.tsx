import { useEffect, useState } from "react";

export default function Cards() {
  const [titles, setTitles] = useState<string[]>([]);
  const [description, setDescription] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
    
        const res = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20');
        const data = await res.json();
         const tabTitle : string[] = [];
        for (let i = 0; i< data.results.length; i ++)
        {
            tabTitle.push(data.results[i].title)
        }
        setTitles(tabTitle); // IMPORTANT : Mettre à jour le state
        
        const tabDesc : string[] = [];
        for (let i = 0; i< data.results.length; i ++)
        {
            tabDesc.push(data.results[i].description)
        }
        setDescription(tabDesc);
    };
    loadData();
    
  },[] );

  if(titles === undefined) {
    return <div> Loading...</div>;
  }

  return (
    <>
    <div>
        <h1>
            {titles.map((title,index) =>{
             return  <li key={index}>{title}</li>
            })}
        </h1>
    </div>
    <div>
        <h2>
            {description.map((description,index) => {
                return <p key={index}>{description}</p>
            })}
        </h2>
    </div>
</>
)};