import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // Fallback function to ensure preview works if local assets aren't present
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://tse4.mm.bing.net/th?q=${encodeURIComponent(game.title + ' game')}&w=300&h=300&c=7&rs=1&p=0`;
  };

  return (
    <Link 
      to={`/game/${game.id}`}
      className="group relative bg-gaming-800 rounded-xl overflow-hidden shadow-lg hover:shadow-gaming-accent/40 hover:-translate-y-1 transition-all duration-300 block h-full flex flex-col"
    >
      <div className="aspect-square w-full overflow-hidden relative bg-gaming-900">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={handleImageError}
        />
        {(game.isNew || game.isTrending) && (
          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded text-black shadow-sm ${game.isNew ? 'bg-gaming-neon' : 'bg-orange-500'}`}>
            {game.isNew ? 'NEW' : 'HOT'}
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-gaming-accent hover:bg-violet-600 text-white px-6 py-2 rounded-full font-bold transform scale-90 group-hover:scale-100 transition-transform">
              PLAY NOW
            </span>
        </div>
      </div>
      <div className="p-3 flex-grow flex flex-col justify-between">
        <div>
            <h3 className="font-bold text-sm md:text-base truncate text-gray-100 group-hover:text-gaming-accent transition-colors">
            {game.title}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-2 mt-1 mb-2">{game.description}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gaming-700 pt-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{game.category}</span>
          <div className="flex items-center text-xs text-yellow-400 font-bold">
             ★ {game.rating}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
