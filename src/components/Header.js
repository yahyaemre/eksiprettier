import React, { useState, createRef } from "react";
import { useScreenshot } from 'use-react-screenshot'
import PrettiedEntry from "./PrettiedEntry";
import axios from "axios";

function Header() {
  // results.body ? results.body.replace(/<\/?[^>]+(>|$)/g, "") : 'Boyle bir entry bulunamadi!'
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [tag, setTag] = useState([]);

  const searchQuery = async (e) => {
    if (e.key === "Enter") {
      let newQuery = query.replace("#", "");
      setLoading(true);
      const res = await axios.get(
        `https://eksisozluk-api.herokuapp.com/api/entry/${newQuery}`
      );
      setResults(res.data);
      const tags = await axios.get(
        `https://eksisozluk-api.herokuapp.com/api/baslik/${res.data["title"]}`
      );
      setTag(tags.data);
      setLoading(false);
      setQuery("");
    }
  };

  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(ref.current)

  return (
    
    <div>
      <div className=" bg-[#81c14b] w-full h-[180px] mb-[0px]" >
        <center>
          <h1 id="header">ekşiprettier</h1>
          <h4 className="text-white font-normal">
            ekşi sözlükten entry'i alıp paylaşılabilir hale getiren zımbırtı.
          </h4>
        </center>
        <br />
        <input
          type="text"
          id="search"
          disabled={loading}
          maxLength={18}
          className="flex mx-auto h-8 mt-[-17px] w-[19rem] p-2 rounded focus:outline-0 border-[1.2px] border-emerald-600 disabled:transition-shadow"
          placeholder="Entry No..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyPress={searchQuery}
          value={query}
        />
        <a href="https://github.com/rashtion/eksiprettier" className="block text-center underline md:mt-[-1px]">kaynak kodu</a>
      </div>

      <PrettiedEntry
        results={results}
        setResults={setResults}
        tag={tag}
        setTag={setTag}
        
      />

    </div>
  );
}

export default Header;
