import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WatchlistPage = () => {
  const navigate = useNavigate();
  
  const [watchlistItems, setWatchlistItems] = useState([
    {
      id: 1,
      title: "Gaming PC Build Project",
      category: "Website and Technology",
      image: "/gaming-pc.jpg",
      currentBid: 25000,
      endDate: "Mon 27th May, 3:00pm",
      timeRemaining: "18 hours",
      bidCount: 12,
      isActive: true
    },
    {
      id: 2,
      title: "Mobile App Development",
      category: "Software Development",
      image: "/mobile-app.jpg",
      currentBid: 15000,
      endDate: "Wed 29th May, 10:00am",
      timeRemaining: "3 days 8 hours",
      bidCount: 8,
      isActive: true
    },
    {
      id: 3,
      title: "Logo Design for Startup",
      category: "Graphic Design",
      image: "/logo-design.jpg",
      currentBid: 500,
      endDate: "Fri 31st May, 5:00pm",
      timeRemaining: "5 days 12 hours",
      bidCount: 15,
      isActive: true
    },
    {
      id: 4,
      title: "Website Redesign Project",
      category: "Web Design",
      image: "/website-redesign.jpg",
      currentBid: 8000,
      endDate: "Sat 1st Jun, 2:00pm",
      timeRemaining: "6 days 10 hours",
      bidCount: 6,
      isActive: true
    },
    {
      id: 5,
      title: "Data Analysis Dashboard",
      category: "Data Science",
      image: "/data-dashboard.jpg",
      currentBid: 12000,
      endDate: "Tue 3rd Jun, 11:00am",
      timeRemaining: "1 week 2 days",
      bidCount: 4,
      isActive: true
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBackToProfile = () => {
    navigate('/login/profile');
  };

  const handleBackToMain = () => {
    navigate('/main');
  };

  const handleRemoveFromWatchlist = (itemId, event) => {
    event.stopPropagation(); // Prevent triggering the project click
    setWatchlistItems(prevItems => 
      prevItems.filter(item => item.id !== itemId)
    );
  };

  const handleProjectClick = (project) => {
    console.log("View project details:", project);
    // navigate(`/project/${project.id}`);
  };

  const handleBidNow = (project, event) => {
    event.stopPropagation(); // Prevent triggering the project click
    console.log("Bid on project:", project);
    // navigate(`/project/${project.id}/bid`);
  };

  const clearAllWatchlist = () => {
    if (window.confirm('Are you sure you want to remove all items from your watchlist?')) {
      setWatchlistItems([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-yellow-500 px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBackToProfile}
            className="p-2 hover:bg-yellow-600 rounded-full transition-colors"
          >
            <span className="text-black text-xl">←</span>
          </button>
          <h1 className="text-lg font-semibold text-black">My Watchlist</h1>
          <button 
            onClick={handleBackToMain}
            className="p-2 hover:bg-yellow-600 rounded-full transition-colors"
          >
            <span className="text-black text-lg">🏠</span>
          </button>
        </div>
      </div>

      {/* Watchlist Stats */}
      <div className="bg-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {watchlistItems.length} Items Watched
            </h2>
            <p className="text-sm text-gray-600">Stay updated on your favorite projects</p>
          </div>
          {watchlistItems.length > 0 && (
            <button 
              onClick={clearAllWatchlist}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Watchlist Items */}
      <div className="px-4 py-4">
        {watchlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">👀</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 mb-4">Start watching projects to keep track of auctions you're interested in</p>
            <button 
              onClick={handleBackToMain}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Projects
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {watchlistItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProjectClick(item)}
              >
                <div className="p-4">
                  {/* Category Tag and Remove Button */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs text-gray-500 font-medium">{item.category}</span>
                    <button
                      onClick={(e) => handleRemoveFromWatchlist(item.id, e)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove from watchlist"
                    >
                      <span className="text-lg">×</span>
                    </button>
                  </div>

                  <div className="flex space-x-4">
                    {/* Project Image */}
                    <div className="w-20 h-16 flex-shrink-0">
                      <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                        <div className="text-xs text-gray-500">IMG</div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                        {item.title}
                      </h3>
                      
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <span>📅</span>
                          <span>{item.endDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>⏰</span>
                          <span>{item.timeRemaining}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>👥</span>
                          <span>{item.bidCount} bids</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Bid and Actions */}
                    <div className="flex flex-col items-end justify-between text-right">
                      <div className="text-xs text-gray-500 mb-1">
                        Current highest bid
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(item.currentBid)}
                      </div>
                      <button 
                        onClick={(e) => handleBidNow(item, e)}
                        className="bg-blue-600 text-white text-xs px-3 py-1 rounded mt-2 hover:bg-blue-700 transition-colors"
                      >
                        Bid Now
                      </button>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 font-medium">Active Auction</span>
                    </div>
                    <span className="text-gray-400 text-lg">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {watchlistItems.length > 0 && (
        <div className="px-4 pb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Watchlist Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/login/notifications')}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">Set Bid Alerts</span>
                <span className="text-gray-400">→</span>
              </button>
              <button 
                onClick={() => navigate('/login/main')}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">Find More Projects</span>
                <span className="text-gray-400">→</span>
              </button>
              <button 
                onClick={() => navigate('/login/profile')}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">Back to Profile</span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;