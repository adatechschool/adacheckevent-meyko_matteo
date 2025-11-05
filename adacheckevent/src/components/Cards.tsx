import { useEffect, useState } from "react";
import type { Print } from "./interface";
import { Heart } from "lucide-react";

interface FavoriteIconProps {
  isFavorite: boolean;
  onToggle: () => void;
}
function FavoriteIcon({ isFavorite, onToggle }: FavoriteIconProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-gray-100 transition"
      aria-label="Ajouter aux favoris"
    >
      <Heart
        size={24}
        className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
      />
    </button>
  );
}

export default function Cards() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [prints, setPrints] = useState<Print[]>([]);
  const [query, setQuery] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (title: string) => {
    setPrints(prev =>
      prev.map(p =>
        p.title === title ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };


  // Charger plus d'événements
  const loadMore = () => setEnd((prev) => prev + 3);

  // Récupération des données depuis l'API
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
      );
      const data = await res.json();

      const nouveauxElements: Print[] = data.results.map((result: any) => ({
        title: result.title || "",
        lead_text: result.lead_text || "",
        cover_url: result.cover_url || "",
        address_street: result.address_street || "Non renseigné.",
        address_zipcode: result.address_zipcode ?? "",
        address_city: result.address_city || "",
        audience: result.audience || "",
        price_type: result.price_type || "N/A.",
        isFavorite: false,
      }));

      setPrints(nouveauxElements);
    };

    loadData();
  }, []);

  // Si les données ne sont pas encore chargées
  if (prints.length === 0) {
    return <div>Chargement...</div>;
  }

  // Filtrage selon la recherche utilisateur
  const filteredPrints = prints.filter(
    (p) =>
            (!showFavorites || p.isFavorite) &&
      (!query.trim() ||
        p.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        p.lead_text.toLowerCase().includes(query.trim().toLowerCase()))
  );


  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Barre de recherche */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-4 flex justify-center"
      >
        <input
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un événement..."
       className="border border-gray-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 w-full sm:w-2/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowFavorites(prev => !prev)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          {showFavorites ? "Voir tous les événements" : "Voir les favoris ❤️"}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">
        Événements à Paris
      </h1>

      {/* Liste des événements */}
      <ul className="space-y-6">
        {filteredPrints.slice(start, end).map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <li
              key={item.title || index}
              className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
             <h1 className="flex justify-between items-center">
  {item.title}
  <FavoriteIcon
    isFavorite={item.isFavorite}
    onToggle={() => toggleFavorite(item.title)}
  />
</h1>
              <p className="mb-3 text-gray-700 leading-relaxed">
                {isExpanded
                  ? item.lead_text
                  : `${item.lead_text.slice(0, 120)}...`}
                <button
                  className="ml-2 text-blue-600 font-medium hover:underline"
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : index)
                  }
                >
                  {isExpanded ? "Voir moins" : "Voir plus"}
                </button>
              </p>

              {item.cover_url && (
                <img
                  className="w-full rounded-md mb-3"
                  src={item.cover_url}
                  alt={item.title || "cover"}
                />
              )}

              <p className="text-sm text-gray-600">
                <strong>Adresse : </strong> {item.address_street} <br />
                {item.address_zipcode} {item.address_city}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Audience :</strong> {item.audience}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Accès :</strong> {item.price_type}
k              </p>
            </li>
          );
        })}
      </ul>

      {/* Bouton "Charger plus" */}
      <div className="text-center mt-8">
        <button
          onClick={loadMore}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Charger plus
        </button>
      </div>
    </div>
  );
}