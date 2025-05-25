import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  
  const [userProfile] = useState({
    email: "2096catmeaow@gmail.com",
    avatar: "/public/ProfilePicture.png",
    joinDate: "Member since 2023"
  });

  const [auctionHistory] = useState([
    {
      id: 1,
      title: "Hp super computer project",
      category: "Website and Technology",
      image: "/computer.jpg",
      status: "Your Current bid is",
      bidAmount: 40000000,
      endDate: "Sun 19th May, 12:30pm",
      timeRemaining: "2 day 15 hours",
      isWinning: true
    },
    {
      id: 2,
      title: "Lenovo computer project",
      category: "Website and Technology",
      image: "/laptop.jpg",
      status: "You won the auction!",
      bidAmount: 35000,
      endDate: "Completed",
      timeRemaining: "Auction ended",
      isWinning: true,
      isCompleted: true
    },
    {
      id: 3,
      title: "Floor cleaning at Temple",
      category: "Website and Technology",
      image: "/cleaning.jpg",
      status: "You won the auction!",
      bidAmount: 50,
      endDate: "Completed",
      timeRemaining: "Auction ended",
      isWinning: true,
      isCompleted: true
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

  const handleBackToMain = () => {
    navigate('/login/main');
  };

  const handleSettings = () => {
    navigate('/login/profile/settings');
  };

  const handleWatchlist = () => {
    navigate('/login/watchList');
  };

  const handleProjectClick = (project) => {
    // You can navigate to project details or open modal based on your routing structure
    console.log("View project details:", project);
    // navigate(`/project/${project.id}`);
  };

  const toggleSettingsMenu = () => setShowSettingsMenu(!showSettingsMenu);

   const handleNavigate = (path) => {
    navigate(path);
    setShowSettingsMenu(false);
  };

  const handleSignOut = () => navigate('/login');

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-yellow-500 px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBackToMain}
            className="p-2 hover:bg-yellow-600 rounded-full transition-colors"
          >
            <span className="text-black text-xl">←</span>
          </button>

          <button onClick={toggleSettingsMenu} className="bg-gray-200 p-2 rounded-full">
          <span className="text-xl">⚙️</span>
          {/* Settings Menu */}
      {showSettingsMenu && (
        <div className="absolute right-2 top-16 bg-white shadow-lg rounded-lg z-50 w-48">
          <div className="flex flex-col">
            <button onClick={() => handleNavigate('/main')} className="px-4 py-3 text-left hover:bg-gray-100 flex items-center border-b border-gray-200">
              <span className="mr-2">🏠</span>
              <span>Home</span>
            </button>
            <button onClick={handleSignOut} className="px-4 py-3 text-left hover:bg-gray-100 flex items-center border-b border-gray-200">
              <span className="mr-2">🚪</span>
              <span>Sign Out</span>
            </button>
            <button onClick={handleDeleteAccount} className="px-4 py-3 text-left hover:bg-red-100 text-red-600 flex items-center">
              <span className="mr-2">⚠️</span>
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      )}
        </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-gray-200 px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-green-400 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
              <div className="text-2xl">🌱</div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{userProfile.email}</h1>
            <p className="text-sm text-gray-600">{userProfile.joinDate}</p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">History</h2>
        
        <div className="space-y-4">
          {auctionHistory.map((auction) => (
            <div 
              key={auction.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProjectClick(auction)}
            >
              <div className="p-4">
                {/* Category Tag */}
                <div className="mb-3">
                  <span className="text-xs text-gray-500 font-medium">{auction.category}</span>
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
                      {auction.title}
                    </h3>
                    
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <span>📅</span>
                        <span>{auction.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>⏰</span>
                        <span>{auction.timeRemaining}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bid Amount and Status */}
                  <div className="flex flex-col items-end justify-between text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      {auction.isCompleted ? "You won the auction!" : auction.status}
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(auction.bidAmount)}
                    </div>
                    {!auction.isCompleted && (
                      <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded mt-2 hover:bg-blue-700">
                        Bid now highest bid now
                      </button>
                    )}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-end mt-2">
                  <span className="text-gray-400 text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Your Auction Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-xs text-gray-500">Active Bids</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-xs text-gray-500">Won Auctions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-xs text-gray-500">Total Participated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={handleWatchlist}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">View Watchlist</span>
              <span className="text-gray-400">→</span>
            </button>
            <button 
              onClick={() => navigate('/login/profile/payment')}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">Payment Methods</span>
              <span className="text-gray-400">→</span>
            </button>
            <button 
              onClick={() => navigate('/login/profile/notifications')}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">Notification Settings</span>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;