import React, { useState, useEffect } from 'react';

const sampleMovies = [ { id: 1, title: 'The Lost Galaxy', poster: 'https://picsum.photos/400/600?random=1', genre: 'Sci-Fi', rating: 8.2, year: 2024, trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'An intergalactic adventure that explores humanity’s place among the stars.', }, { id: 2, title: 'Mystic River', poster: 'https://picsum.photos/400/600?random=2', genre: 'Thriller', rating: 7.9, year: 2023, trailer: 'https://www.youtube.com/embed/ysz5S6PUM-U', description: 'A mysterious disappearance leads a detective on a mind-bending chase.', }, { id: 3, title: 'Love in Pixels', poster: 'https://picsum.photos/400/600?random=3', genre: 'Romance', rating: 8.5, year: 2022, trailer: 'https://www.youtube.com/embed/tgbNymZ7vqY', description: 'Two gamers find love in a virtual world that becomes their reality.', }, { id: 4, title: 'Dark Horizon', poster: 'https://picsum.photos/400/600?random=4', genre: 'Action', rating: 9.1, year: 2025, trailer: 'https://www.youtube.com/embed/3fumBcKC6RE', description: 'A lone warrior must protect Earth from a shadowy alien invasion.', }, ];

function App() { const [darkMode, setDarkMode] = useState(false); const [search, setSearch] = useState(''); const [selectedMovie, setSelectedMovie] = useState(null); const [watchlist, setWatchlist] = useState([]);

useEffect(() => { const savedList = JSON.parse(localStorage.getItem('watchlist')) || []; setWatchlist(savedList); }, []);

const toggleWatchlist = (movie) => { let updated; if (watchlist.find((m) => m.id === movie.id)) { updated = watchlist.filter((m) => m.id !== movie.id); } else { updated = [...watchlist, movie]; } setWatchlist(updated); localStorage.setItem('watchlist', JSON.stringify(updated)); };

const filteredMovies = sampleMovies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()) );

return ( <div className={${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition}> <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white dark:bg-gray-800 z-50"> <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">CineStream</h1> <div className="flex items-center gap-3"> <input type="text" placeholder="Search movies..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" /> <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-2 rounded-lg bg-indigo-600 text-white" > {darkMode ? '☀️ Light' : '🌙 Dark'} </button> </div> </header>

<section className="p-6 text-center bg-indigo-50 dark:bg-gray-700">
    <h2 className="text-3xl font-semibold mb-2">Unlimited Movies, TV Shows and More</h2>
    <p className="text-gray-600 dark:text-gray-300 mb-4">Watch anywhere. Cancel anytime.</p>
    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition">Start Watching</button>
  </section>

  <main className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredMovies.map((movie) => (
      <div
        key={movie.id}
        className="rounded-lg overflow-hidden shadow hover:shadow-xl transition cursor-pointer bg-white dark:bg-gray-800"
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-80 object-cover"
          onClick={() => setSelectedMovie(movie)}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{movie.genre} • {movie.year}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-yellow-500 font-medium">⭐ {movie.rating}</span>
            <button
              onClick={() => toggleWatchlist(movie)}
              className={`px-3 py-1 rounded ${watchlist.find((m) => m.id === movie.id) ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'}`}
            >
              {watchlist.find((m) => m.id === movie.id) ? 'Remove' : 'Watchlist'}
            </button>
          </div>
        </div>
      </div>
    ))}
  </main>

  {selectedMovie && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          onClick={() => setSelectedMovie(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{selectedMovie.description}</p>
        <iframe
          width="100%"
          height="250"
          src={selectedMovie.trailer}
          title="Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )}

  <footer className="text-center py-6 border-t dark:border-gray-700 text-gray-600 dark:text-gray-400">
    <p>© 2025 CineStream | Built with ❤️ using React + Tailwind</p>
  </footer>
</div>

); }

export default App;

