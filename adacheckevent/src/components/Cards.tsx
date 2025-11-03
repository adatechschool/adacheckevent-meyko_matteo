import { useEffect, useState } from "react";
import type { Print } from "./interface";

export default function Cards() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [prints, setPrints] = useState<Print[]>([]);
  const [query, setQuery] = useState<string>("");

  const loadMore = () => {
    setEnd((prev) => prev + 3);
  };

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
      );
      const data = await res.json();

      const nouveauxElements: Print[] = data.results.map((result: any) => {
        
        return {
          title: result.title || "",
          lead_text: result.lead_text || "",
          cover_url: result.cover_url || "",
          adresse_street: result.adresse_street || "Non renseigné.",
          adress_zipcode: result.adress_zipcode ?? "",
          adress_city: result.adress_city || "",
          audience: result.audience || "",
          price_type: result.price_type || "N/A.",
        };
      });

      setPrints(nouveauxElements);
    };

    loadData();
  }, []);

  if (prints.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredPrints = prints.filter((p) =>
    !query.trim() || (p.title ?? "").toLowerCase().includes(query.trim().toLowerCase()) || (p.lead_text ?? "").toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par mot clé"
          />
          {/* <button type="submit">Search</button> */}
        </form>
        <h1>Événements à Paris</h1>
        <ul>
          {filteredPrints.slice(start, end).map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <p>{item.lead_text}</p>
              <img className="w-full" src={item.cover_url} alt={item.title || "cover"} />
              <p>
                Adresse : {item.adresse_street} <br />
                {item.adress_zipcode} {item.adress_city}
              </p>
              <p>Audience : {item.audience}</p>
              <p>Accès : {item.price_type}</p>
            </li>
          ))}
        </ul>
        <button onClick={loadMore}>Load</button>
      </div>
    </>
  );
}
