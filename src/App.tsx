import React, { useState } from 'react';
import './styles.css';

// ============================================================
// TYPES
// ============================================================

interface Photocard {
  id: string;
  name: string;
  group: string;
  album?: string;
  status: 'Owned' | 'Wishlist' | 'Trade' | 'Sold';
  imageUrl: string;
  price?: number;
}

// ============================================================
// SAMPLE DATA
// ============================================================

const sampleCards: Photocard[] = [
  {
    id: '1',
    name: 'Jisoo',
    group: 'BLACKPINK',
    album: 'BORN PINK',
    status: 'Owned',
    imageUrl: 'https://picsum.photos/seed/jisoo/300/400',
    price: 12.50,
  },
  {
    id: '2',
    name: 'Jennie',
    group: 'BLACKPINK',
    album: 'BORN PINK',
    status: 'Owned',
    imageUrl: 'https://picsum.photos/seed/jennie/300/400',
    price: 15.00,
  },
  {
    id: '3',
    name: 'Jungkook',
    group: 'BTS',
    album: 'BE',
    status: 'Wishlist',
    imageUrl: 'https://picsum.photos/seed/jungkook/300/400',
    price: 20.00,
  },
  {
    id: '4',
    name: 'Nayeon',
    group: 'TWICE',
    album: 'IM NAYEON',
    status: 'Owned',
    imageUrl: 'https://picsum.photos/seed/nayeon/300/400',
  },
  {
    id: '5',
    name: 'Hanni',
    group: 'NEWJEANS',
    album: 'NewJeans',
    status: 'Trade',
    imageUrl: 'https://picsum.photos/seed/hanni/300/400',
  },
  {
    id: '6',
    name: 'Felix',
    group: 'STRAY KIDS',
    album: '5-STAR',
    status: 'Owned',
    imageUrl: 'https://picsum.photos/seed/felix/300/400',
    price: 25.00,
  },
  {
    id: '7',
    name: 'Rosé',
    group: 'BLACKPINK',
    album: 'BORN PINK',
    status: 'Sold',
    imageUrl: 'https://picsum.photos/seed/rose/300/400',
    price: 30.00,
  },
  {
    id: '8',
    name: 'V',
    group: 'BTS',
    album: 'BE',
    status: 'Wishlist',
    imageUrl: 'https://picsum.photos/seed/v/300/400',
    price: 18.00,
  },
  {
    id: '9',
    name: 'Momo',
    group: 'TWICE',
    album: 'Formula of Love',
    status: 'Owned',
    imageUrl: 'https://picsum.photos/seed/momo/300/400',
  },
];

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [cards, setCards] = useState<Photocard[]>(sampleCards);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase()) ||
                          card.group.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || card.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: cards.length,
    owned: cards.filter(c => c.status === 'Owned').length,
    value: cards
      .filter(c => c.status === 'Owned')
      .reduce((sum, c) => sum + (c.price || 0), 0),
  };

  const addMockCard = () => {
    const newCard: Photocard = {
      id: Date.now().toString(),
      name: `Member ${cards.length + 1}`,
      group: ['BLACKPINK', 'BTS', 'TWICE', 'NEWJEANS', 'STRAY KIDS'][cards.length % 5],
      status: ['Owned', 'Wishlist', 'Trade', 'Sold'][cards.length % 4] as any,
      imageUrl: `https://picsum.photos/seed/${cards.length + 100}/300/400`,
    };
    setCards([...cards, newCard]);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Owned': return '#4CAF50';
      case 'Wishlist': return '#2196F3';
      case 'Trade': return '#FF9800';
      case 'Sold': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📸 My K-Pop Collection</h1>
        <div className="stats">
          <span>Total: {stats.total}</span>
          <span>Owned: {stats.owned}</span>
          <span>Value: ${stats.value.toFixed(2)}</span>
        </div>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Owned">Owned</option>
          <option value="Wishlist">Wishlist</option>
          <option value="Trade">Trade</option>
          <option value="Sold">Sold</option>
        </select>
      </div>

      {filteredCards.length === 0 ? (
        <div className="empty-state">
          <p>No cards found</p>
        </div>
      ) : (
        <div className="grid">
          {filteredCards.map((card) => (
            <div key={card.id} className="card">
              <img
                src={card.imageUrl}
                alt={card.name}
                className="card-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400/333/666?text=No+Image';
                }}
              />
              <div className="card-info">
                <div className="card-name">{card.name}</div>
                <div className="card-group">{card.group}</div>
                {card.album && <div className="card-album">{card.album}</div>}
                <span
                  className="card-status"
                  style={{ background: getStatusColor(card.status) }}
                >
                  {card.status}
                </span>
                {card.price && <div className="card-price">${card.price.toFixed(2)}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="fab" onClick={addMockCard}>
        +
      </button>
    </div>
  );
}