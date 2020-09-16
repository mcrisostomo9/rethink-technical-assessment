import React, { useEffect, useState } from "react";

function generateDummyList(itemCount) {
  let list = [];
  for (let i = 0; i < itemCount; i++) {
    let item = {
      id: i + 1,
      name: Math.random().toString(36).substr(2, 10),
      country: Math.random().toString(36).substr(2, 10),
    };
    list.push(item);
  }

  return list;
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const filteredList = list.filter((item) => {
      // Check if either name or country includes the search term
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.country.toLowerCase().includes(searchTerm)
      );
    });
    setSearchList(filteredList);
  }, [searchTerm]);

  useEffect(() => {
    // This would be replaced by an api request for the data
    const list = generateDummyList(1000000);
    setList(list);
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderItems = () => {
    // Limiting the number of items to render to the DOM
    const maximumSearchItems =
      searchList.length <= 100 ? searchList.length : 100;
    const maximumListItems = list.length <= 100 ? list.length : 100;
    return (
      <div className="max-w-md mt-4">
        <div className="flex">
          <div className="w-1/6">id</div>
          <div className="w-1/3">name</div>
          <div className="w-1/3">country</div>
        </div>
        <ul className="mt-2">
          {searchList.length === 0 && searchTerm ? (
            <li>
              <p>No item found</p>
            </li>
          ) : searchList.length > 0 ? (
            searchList.slice(0, maximumSearchItems).map((i, index) => (
              <li key={i.id} className="flex">
                <div className="w-1/6">{i.id.toLocaleString()}.</div>
                <div className="w-1/3">{i.name}</div>
                <div className="w-1/3">{i.country}</div>
              </li>
            ))
          ) : (
            list.slice(0, maximumListItems).map((i, index) => (
              <li key={i.id} className="flex">
                <div className="w-1/6">{i.id.toLocaleString()}.</div>
                <div className="w-1/3">{i.name}</div>
                <div className="w-1/3">{i.country}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-6">
      <h3 className="text-3xl">Search Question</h3>
      <p>
        You have over a million rows of data. You need to display this data on a
        web page along with a search field. Update search results with each
        character entered by the user. Make sure to call out any assumptions and
        / or limitations in your solution.
      </p>
      <h4 className="mt-8 text-2xl">Assumptions/Limitations</h4>
      <ul className="list-disc">
        <li>
          Current search algorithm won't scale well when more columns are to be
          included in the search. Would have to refactor to accommodate.
        </li>
        <li>
          Limit of only rendering first 100 in list. Rendering more items has
          performance cost. Pagination or lazy loading of more items would be
          implemented in next iteration
        </li>
        <li>No sorting options by data column in this current iteration</li>
      </ul>
      <div className="mt-8">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="email"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search"
        />
        {renderItems()}
      </div>
    </div>
  );
};

export default SearchPage;
