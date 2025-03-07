import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return <input  className="search-bar" type="text" placeholder="Search activities..." value={query} onChange={e => setQuery(e.target.value)} />;
};

export default SearchBar;
