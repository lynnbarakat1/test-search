import { useState } from 'react';
import './App.css';

function App() {

  const [search, setSearch] = useState('');

  const [searchFields] = useState([
    {
      title: 'Title 1',
      text: 'text 1'
    },
    {
      title: 'Title 2',
      text: 'text 2'
    },
    {
      title: 'Title 3',
      text: 'text 3'
    },
    {
      title: 'Title 4',
      text: 'text 4'
    },
  ])

  // Function to highlight the search term in the given text
  function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) {
      return text;
    }
    const regex = new RegExp(searchTerm, 'gi');
    // Replace all occurrences of the search term in the text with a highlighted version.
    const highlightedText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
    // Return the highlighted text using dangerouslySetInnerHTML to allow rendering the HTML.
    return <p dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  }

  return (
    <div className="container py-5">
      <div className='bg-color'>
        <form className=" p-5">
          <div className='row'>
            <div className="col-md-8">
              {/* Input field for the search term */}
              <input className="search-form w-100" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
            </div>
            <div className='col-md-12 pt-5'>
              {/* Filtering the 'searchFields' array based on the search term to display matching results. */}
              {
                searchFields.filter(field =>
                  !search ||
                  (
                    (field.title && field.title.toLowerCase().indexOf(search.toLowerCase()) > -1) ||
                    (field.text && field.text.toLowerCase().indexOf(search.toLowerCase()) > -1)
                  )
                ).map((field, index) =>

                  <div className='results' key={index}>
                    <div className='all-results'>
                      <div><h4>{highlightSearchTerm(field.title, search)}</h4></div>
                      <p>{highlightSearchTerm(field.text, search)}</p>
                    </div>
                    <hr className='seperator' />
                  </div>
                )
              }
              {/* // Displaying "No Results" when there are no matches based on the search term. */}
              {
                searchFields.filter(field =>
                (
                  (field.title && field.title.toLowerCase().indexOf(search.toLowerCase()) > -1) ||
                  (field.text && field.text.toLowerCase().indexOf(search.toLowerCase()) > -1)
                )
                ).length === 0 && (<div>No Results</div>)}
            </div>
          </div>
        </form>
      </div>
    </div >

  );
}

export default App;
