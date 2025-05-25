import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const MainLogging = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProject, setDetailProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Build Formula 1 cars 2026 team project",
      image: "/formula1.jpg",
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).getTime(),
      views: 2437,
      likes: 438,
      currentBid: 200000000,
      minBid: 150000000,
      category: "Architecture and engineering",
      rating: 4.9,
      description: "Seeking experienced automotive engineers and designers to join our revolutionary Formula 1 team project for the 2026 season. This is a once-in-a-lifetime opportunity to be part of building cutting-edge F1 cars that will compete at the highest level of motorsport.",
      requirements: [
        "Minimum 5 years experience in automotive engineering",
        "Experience with aerodynamics and CFD analysis",
        "Knowledge of Formula 1 regulations",
        "Proficiency in CAD software (CATIA, SolidWorks)",
        "Previous motorsport experience preferred"
      ],
      deliverables: [
        "Complete car design and engineering",
        "Aerodynamic package optimization",
        "Power unit integration",
        "Safety systems implementation",
        "Testing and validation reports"
      ],
      timeline: "18 months",
      location: "Silverstone, UK",
      bidHistory: [
        { id: 1, bidder: "John D.", company: "Apex Motorsports", amount: 200000000, time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { id: 2, bidder: "Sarah M.", company: "Racing Dynamics", amount: 195000000, time: new Date(Date.now() - 5 * 60 * 60 * 1000) },
        { id: 3, bidder: "Mike R.", company: "Speed Engineering", amount: 180000000, time: new Date(Date.now() - 8 * 60 * 60 * 1000) },
        { id: 4, bidder: "Anna K.", company: "Formula Tech", amount: 165000000, time: new Date(Date.now() - 12 * 60 * 60 * 1000) },
        { id: 5, bidder: "Tom B.", company: "Motorsport Solutions", amount: 150000000, time: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 2,
      title: "HP super computer project",
      image: "/computer.jpg",
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).getTime(),
      views: 1254,
      currentBid: 50000000,
      minBid: 30000000,
      category: "Website and Technology",
      description: "Development of next-generation supercomputer infrastructure for HP's advanced computing division. This project involves designing and implementing high-performance computing solutions capable of handling complex scientific calculations and AI workloads.",
      requirements: [
        "PhD in Computer Science or related field",
        "10+ years experience in HPC systems",
        "Expertise in parallel computing architectures",
        "Knowledge of GPU computing (CUDA, OpenCL)",
        "Experience with Linux system administration"
      ],
      deliverables: [
        "Complete system architecture design",
        "Hardware specification and procurement",
        "Software stack implementation",
        "Performance optimization",
        "Documentation and training materials"
      ],
      timeline: "24 months",
      location: "Palo Alto, CA",
      bidHistory: [
        { id: 1, bidder: "Alex P.", company: "Quantum Computing Inc.", amount: 50000000, time: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        { id: 2, bidder: "Lisa W.", company: "SuperTech Solutions", amount: 45000000, time: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { id: 3, bidder: "David L.", company: "High Performance Systems", amount: 40000000, time: new Date(Date.now() - 6 * 60 * 60 * 1000) },
        { id: 4, bidder: "Emma S.", company: "Computing Dynamics", amount: 35000000, time: new Date(Date.now() - 10 * 60 * 60 * 1000) },
        { id: 5, bidder: "Chris T.", company: "Advanced Computing", amount: 30000000, time: new Date(Date.now() - 18 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 3,
      title: "GTA 6 manager project",
      image: "/gta5.jpg",
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000).getTime(),
      views: 982,
      currentBid: 200000,
      minBid: 100000,
      category: "Website and Technology",
      description: "Seeking a experienced project manager to oversee the development of marketing and community management systems for the highly anticipated GTA 6 release. This role involves coordinating between multiple teams and managing complex timelines.",
      requirements: [
        "5+ years game industry project management",
        "Experience with AAA game launches",
        "Strong communication and leadership skills",
        "Knowledge of agile development methodologies",
        "Experience with community management platforms"
      ],
      deliverables: [
        "Project timeline and milestone planning",
        "Team coordination and communication",
        "Marketing campaign management",
        "Community engagement strategy",
        "Launch preparation and execution"
      ],
      timeline: "12 months",
      location: "New York, NY (Remote options available)",
      bidHistory: [
        { id: 1, bidder: "Ryan H.", company: "Game Management Pro", amount: 200000, time: new Date(Date.now() - 30 * 60 * 1000) },
        { id: 2, bidder: "Kate N.", company: "Digital Project Solutions", amount: 180000, time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { id: 3, bidder: "Ben F.", company: "Gaming Consultants", amount: 150000, time: new Date(Date.now() - 5 * 60 * 60 * 1000) },
        { id: 4, bidder: "Zoe M.", company: "Project Masters", amount: 120000, time: new Date(Date.now() - 8 * 60 * 60 * 1000) },
        { id: 5, bidder: "Jake R.", company: "Indie Project Hub", amount: 100000, time: new Date(Date.now() - 12 * 60 * 60 * 1000) }
      ]
    }
  ]);

  const categories = [
    "Website and technology",
    "Graphics and design",
    "Filming",
    "Write and translate",
    "Marketing and advertising",
    "Easy Job",
    "CODING",
    "Architecture and engineering"
  ];

  // Timer hook for countdown
  const useCountdown = (endTime) => {
    const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

    useEffect(() => {
      const timer = setInterval(() => {
        const remaining = endTime - Date.now();
        setTimeLeft(remaining > 0 ? remaining : 0);
        
        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [endTime]);

    return timeLeft;
  };

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return "Auction Ended";
    
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime12Hour = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleViewDetails = (project) => {
    setDetailProject(project);
    setShowDetailModal(true);
  };

  const handlePlaceBid = (project) => {
    setSelectedProject(project);
    setBidAmount('');
    setShowBidModal(true);
  };

  const submitBid = () => {
    const amount = parseFloat(bidAmount);
    if (amount <= selectedProject.currentBid) {
      alert(`Bid must be higher than current bid of ${formatCurrency(selectedProject.currentBid)}`);
      return;
    }
    if (amount < selectedProject.minBid) {
      alert(`Bid must be at least ${formatCurrency(selectedProject.minBid)}`);
      return;
    }

    // Update project with new bid
    setProjects(prev => prev.map(p => {
      if (p.id === selectedProject.id) {
        return {
          ...p,
          currentBid: amount,
          bidHistory: [
            { id: Date.now(), bidder: "You", company: "Your Company", amount: amount, time: new Date() },
            ...p.bidHistory
          ]
        };
      }
      return p;
    }));

    setShowBidModal(false);
    alert('Bid placed successfully!');
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const FeaturedProject = ({ project, onClick }) => {
    const timeLeft = useCountdown(project.endTime);
    const isEnded = timeLeft <= 0;
    const bidProgress = Math.min((project.currentBid / project.minBid) * 100, 100);

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border"
        >
        <h3 className="text-sm font-bold text-gray-600 mb-2">{project.category}</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2 cursor-pointer" onClick={() => handleViewDetails(project)}>
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg bg-gray-200" />
          </div>
          <div className="md:w-1/2">
            <h3 
              className="text-lg md:text-xl font-semibold cursor-pointer hover:text-blue-600 mb-2"
              onClick={() => handleViewDetails(project)}
            >
              {project.title}
            </h3>
            <div className={`text-sm font-medium mb-2 ${isEnded ? 'text-red-600' : 'text-orange-600'}`}>
              ⏰ {formatTime(timeLeft)}
            </div>

            <button className="bg-yellow-500 text-white text-xs px-3 py-1 rounded mb-3 hover:bg-yellow-600">
              Add to Wishlist
            </button>

            <div className="text-xs text-gray-500 flex justify-between mb-1">
              <span>Current Bid</span>
              <span>Target Bid</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-green-600 font-bold text-sm md:text-lg">{formatCurrency(project.currentBid)}</span>
              <span className="text-red-600 font-bold text-sm md:text-lg">{formatCurrency(project.minBid)}</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded mb-3">
              <div 
                className="h-full bg-green-600 rounded transition-all duration-300" 
                style={{ width: `${bidProgress}%` }}
              ></div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handlePlaceBid(project)}
                disabled={isEnded}
                className={`flex-1 text-white text-sm py-2 rounded ${
                  isEnded ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isEnded ? 'Auction Ended' : 'Place Bid'}
              </button>
              <button 
                onClick={() => handleViewDetails(project)}
                className="px-4 py-2 border border-blue-300 text-blue-600 text-sm rounded hover:bg-blue-50"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectCard = ({ project , onClick}) => {
    const timeLeft = useCountdown(project.endTime);
    const isEnded = timeLeft <= 0;

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 border hover:shadow-lg transition-shadow"
       >
        <h3 className="text-sm font-bold text-gray-600 mb-1">{project.category}</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 cursor-pointer" onClick={() => handleViewDetails(project)}>
            <img src={project.image} alt={project.title} className="w-full h-32 object-cover rounded bg-gray-200" />
          </div>
          <div className="sm:w-2/3 flex flex-col justify-between">
            <div>
              <h4 
                className="font-semibold cursor-pointer hover:text-blue-600 mb-1"
                onClick={() => handleViewDetails(project)}
              >
                {project.title}
              </h4>
              <div className={`text-xs font-medium mb-2 ${isEnded ? 'text-red-600' : 'text-orange-600'}`}>
                ⏰ {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                👁️ {project.views} views • 📍 {project.location}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Current Bid</span>
                <span className="text-sm font-bold text-green-600">{formatCurrency(project.currentBid)}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handlePlaceBid(project)}
                  disabled={isEnded}
                  className={`text-white text-xs px-3 py-1 rounded ${
                    isEnded ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isEnded ? 'Ended' : 'Place Bid'}
                </button>
                <button 
                  onClick={() => handleViewDetails(project)}
                  className="px-3 py-1 border border-blue-300 text-blue-600 text-xs rounded hover:bg-blue-50"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-200">
      {/* Top Bar */}
      <header className="bg-yellow-500 px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/public/LogoBid2.png" alt="Find works" className="h-6" />
            <span className="text-black font-bold text-sm">Find <span className="text-gray-700">works</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-800 hidden sm:inline">Welcome</span>
            <button
              onClick={() => { 
                navigate("/login/profile");
              }}
            >
              <img src="/public/ProfilePicture.png" alt="User Badge" className="w-8 h-8 rounded-full" />
            </button>
            <button
              onClick={() => { 
                navigate("/login/watchlist");
              }}
            >
              <img src="/src/assets/button/watchlist.png" alt="Wishlist" className="w-8 h-7 top-0" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-yellow-500 text-center py-6 px-4">
        <h1 className="text-2xl font-bold text-white mb-4">TURNING BIDS INTO BRILLIANCE.</h1>
        <input 
          type="text"
          placeholder="Search Auction"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white rounded-full px-4 py-2 text-sm w-full max-w-md mx-auto"
        />
      </section>

      {/* Category Grid */}
      <div className="bg-white py-4 px-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 text-center">
          {categories.map((category) => (
            <div key={category} className="flex flex-col items-center text-xs cursor-pointer hover:opacity-75">
              <div className="w-12 h-12 bg-gray-300 rounded-full mb-1"></div>
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Auction House Section */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Auction House</h2>
          <div className="text-sm text-gray-500">🔥 {filteredProjects.length} Active Auctions</div>
        </div>
     
     {/* project ปัจจุบันที่โชว์  */}
      {/* Featured Project */}
        {filteredProjects.length > 0 && (
          <FeaturedProject 
            project={filteredProjects[0]} 
            onClick={() => {
              setDetailProject(filteredProjects[0]);
              setShowDetailModal(true);
            }}
          />
        )}

        {/* Other Projects */}
        {filteredProjects.slice(1).map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => {
              setDetailProject(project);
              setShowDetailModal(true);
            }}
          />
        ))}

        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No auctions found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {showDetailModal && detailProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{detailProject.title}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[70vh]">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div>
                    <img 
                      src={detailProject.image} 
                      alt={detailProject.title} 
                      className="w-full h-64 object-cover rounded-lg bg-gray-200 mb-4"
                    />
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-lg mb-2">Auction Status</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Bid:</span>
                          <span className="font-bold text-green-600 text-lg">{formatCurrency(detailProject.currentBid)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Minimum Bid:</span>
                          <span className="font-medium">{formatCurrency(detailProject.minBid)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time Remaining:</span>
                          <span className="font-medium text-orange-600">{formatTime(useCountdown(detailProject.endTime))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Views:</span>
                          <span className="font-medium">{detailProject.views}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setShowDetailModal(false);
                          handlePlaceBid(detailProject);
                        }}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                      >
                        Place Bid
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedProject(detailProject);
                          setShowHistoryModal(true);
                        }}
                        className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                      >
                        View History
                      </button>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="mb-6">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-2">
                        {detailProject.category}
                      </span>
                      <h3 className="font-semibold text-lg mb-2">Project Description</h3>
                      <p className="text-gray-700 leading-relaxed">{detailProject.description}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3">Project Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Timeline:</span>
                          <p className="font-medium">{detailProject.timeline}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Location:</span>
                          <p className="font-medium">{detailProject.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {detailProject.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3">Deliverables</h3>
                      <ul className="space-y-2">
                        {detailProject.deliverables?.map((deliverable, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-blue-500 mr-2 mt-1">•</span>
                            <span className="text-gray-700">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Place Your Bid</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedProject?.title}</p>
            <p className="text-sm text-gray-500 mb-4">
              Current bid: <span className="font-bold text-green-600">{formatCurrency(selectedProject?.currentBid || 0)}</span>
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Bid Amount</label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Minimum: ${formatCurrency((selectedProject?.currentBid || 0) + 1000)}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowBidModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitBid}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bid History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md h-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Bid History</h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{selectedProject?.title}</p>
            
            <div className="overflow-y-auto h-64">
              {selectedProject?.bidHistory?.map((bid, index) => (
                <div key={bid.id} className={`p-3 border-b border-gray-200 ${index === 0 ? 'bg-green-50' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{bid.bidder}</p>
                      <p className="text-xs text-gray-400">{bid.company}</p>
                      <p className="text-xs text-gray-500">{formatTime12Hour(bid.time)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${index === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                        {formatCurrency(bid.amount)}
                      </p>
                      {index === 0 && <p className="text-xs text-green-600">Highest Bid</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}       
      <footer className="bg-yellow-500 text-black py-6 px-4 mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-bold mb-1">Categories</h3>
            <ul className="space-y-1 text-xs">
              <li>Website and technology</li>
              <li>Graphics and design</li>
              <li>Filming</li>
              <li>Write and translate</li>
              <li>Marketing and advertising</li>
              <li>Easy Job</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-1">Categories</h3>
            <ul className="space-y-1 text-xs">
              <li>CODING</li>
              <li>Architecture and engineering</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-1">How to use</h3>
            <ul className="space-y-1 text-xs mb-3">
              <li>Bidding System</li>
            </ul>
            <h3 className="font-bold mb-1">Contact us</h3>
            <ul className="space-y-1 text-xs">
              <li>Facebook</li>
              <li>Find works</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLogging;
