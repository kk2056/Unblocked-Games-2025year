import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GAMES } from '../constants';
import AdSenseUnit from '../components/AdSenseUnit';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = GAMES.find(g => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); // Used to force reload iframe
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  }, [id]);

  if (!game) {
    return <div className="text-center py-20 text-white">Game not found</div>;
  }

  const toggleFullscreen = () => {
    const elem = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        elem?.requestFullscreen().catch(err => {
            console.log(err);
        });
        setIsFullscreen(true);
    } else {
        document.exitFullscreen();
        setIsFullscreen(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const relatedGames = GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 6);

  // Fallback for related game images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, title: string) => {
    e.currentTarget.src = `https://tse4.mm.bing.net/th?q=${encodeURIComponent(title + ' game')}&w=100&h=100&c=7&rs=1&p=0`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
            <div className="bg-gaming-800 rounded-xl p-2 md:p-4 mb-4 shadow-2xl relative">
                <div id="game-container" className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
                    {/* Loading State */}
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gaming-900 z-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaming-accent mb-4"></div>
                            <span className="text-gaming-accent font-bold animate-pulse">Loading Game...</span>
                        </div>
                    )}
                    
                    <iframe
                        key={iframeKey}
                        ref={iframeRef}
                        src={game.url}
                        title={game.title}
                        className="game-frame relative z-0"
                        allowFullScreen
                        allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
                        onLoad={handleIframeLoad}
                    ></iframe>

                    {/* Controls Overlay */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                         <button 
                            onClick={handleRetry}
                            className="bg-gaming-900/80 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur text-xs font-bold transition-colors"
                            title="Reload Game"
                        >
                            ↻ Retry
                        </button>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button 
                            onClick={toggleFullscreen}
                            className="bg-gaming-900/80 hover:bg-gaming-accent text-white px-4 py-2 rounded-lg backdrop-blur font-bold flex items-center gap-2"
                        >
                            <span>⛶</span> Fullscreen
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white">{game.title}</h1>
                    <div className="flex gap-2 text-sm text-gray-400 mt-1">
                        <span className="bg-gaming-700 px-2 py-0.5 rounded text-xs uppercase">{game.category}</span>
                        <span>•</span>
                        <span>{game.plays.toLocaleString()} Plays</span>
                    </div>
                </div>
                <div className="flex gap-2">
                     <button className="bg-gaming-700 hover:bg-gaming-neon hover:text-black transition-colors px-6 py-2 rounded-full font-bold flex items-center gap-2">
                        👍 Like
                     </button>
                     <button className="bg-gaming-700 hover:bg-red-500 transition-colors px-6 py-2 rounded-full font-bold text-sm">
                        Report
                     </button>
                </div>
            </div>

            <div className="bg-gaming-800 rounded-xl p-6 mb-8 border border-gaming-700/50">
                <h3 className="font-bold text-lg mb-2 text-gaming-accent">About this Game</h3>
                <p className="text-gray-300 leading-relaxed">{game.description}</p>
                <div className="mt-6">
                    <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {game.tags.map(tag => (
                            <span key={tag} className="bg-gaming-900 border border-gaming-700 hover:border-gaming-accent px-3 py-1 rounded-full text-xs text-gray-300 transition-colors cursor-default">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            <AdSenseUnit slot="1122334455" />

            {/* Comments Placeholder */}
            <div className="bg-gaming-800 rounded-xl p-6 border border-gaming-700/50">
                <h3 className="font-bold text-lg mb-4">Comments</h3>
                <div className="bg-gaming-900 p-8 rounded-lg text-center border-2 border-dashed border-gaming-700">
                    <p className="text-gray-400 mb-2">Chat disabled in Unblocked Mode</p>
                    <p className="text-xs text-gray-600">This feature is turned off to ensure school firewall compliance.</p>
                </div>
            </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
            <AdSenseUnit slot="5544332211" format="rectangle" style={{ height: '250px' }} />
            
            <div className="bg-gaming-800 rounded-xl p-4 border border-gaming-700/50">
                <h3 className="font-bold text-lg mb-4 text-gaming-accent flex items-center gap-2">
                    <span>🎮</span> Related Games
                </h3>
                <div className="flex flex-col gap-3">
                    {relatedGames.map(g => (
                        <Link key={g.id} to={`/game/${g.id}`} className="flex gap-3 group bg-gaming-900/50 p-2 rounded-lg hover:bg-gaming-700 transition-colors">
                            <img 
                                src={g.thumbnail} 
                                className="w-16 h-16 rounded-md object-cover" 
                                alt={g.title} 
                                onError={(e) => handleImageError(e, g.title)}
                            />
                            <div className="flex flex-col justify-center">
                                <h4 className="font-bold text-sm text-gray-200 group-hover:text-white line-clamp-1">{g.title}</h4>
                                <span className="text-xs text-gaming-accent">{g.category}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-gaming-accent to-purple-600 rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="font-bold text-xl mb-2 text-white">Go Premium</h3>
                <p className="text-sm mb-4 text-white/90">Request new unblocked games tailored for your school.</p>
                <button className="bg-white text-gaming-accent font-black py-2 px-6 rounded-full w-full hover:bg-gray-100 transition-colors shadow-md">
                    Request Game
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
