import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UltraProfileEnhancements from "../components/UltraProfileEnhancements";
import UltraBottomNavBar from "../components/UltraBottomNavBar";
import { UltraPageTransition } from "../components/UltraBottomNavBar";
import { 
  Camera, 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Eye, 
  Star, 
  Edit3, 
  Settings,
  Crown,
  Heart,
  Users,
  MessageCircle,
  Calendar,
  Coffee,
  Music,
  Book,
  Plane,
  Camera as CameraIcon,
  Plus
} from "lucide-react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  increment
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { uploadProfileImage } from "../lib/storageUtils";
import { usePremium } from "../context/PremiumProvider";
import { useCoin } from "../context/CoinProvider";
import BottomNavBar from "../components/BottomNavBar";
import WhoLikedMeModal from "../components/WhoLikedMeModal";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Jessica Parker");
  const [age, setAge] = useState(25);
  const [location, setLocation] = useState("Chicago, IL");
  const [profession, setProfession] = useState("Professional model");
  const [bio, setBio] = useState("Living life to the fullest, one adventure at a time! ✨");
  const [interests, setInterests] = useState(["Often", "Sociale drinker", "Never", "Pisces"]);
  const [profileImage, setProfileImage] = useState<string | null>("https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800");
  const [profileViews, setProfileViews] = useState(247);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { isPremium, isUltraPremium, setPremium } = usePremium();
  const { coins } = useCoin();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = auth.currentUser;
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [likesData, setLikesData] = useState([
    {
      id: '1',
      name: 'Sarah',
      age: 24,
      location: 'Mumbai, India',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      timeAgo: '2 hours ago',
      isRevealed: false
    },
    {
      id: '2',
      name: 'Priya',
      age: 22,
      location: 'Delhi, India',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      timeAgo: '1 day ago',
      isRevealed: false
    },
    {
      id: '3',
      name: 'Anjali',
      age: 26,
      location: 'Bangalore, India',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      timeAgo: '3 days ago',
      isRevealed: false
    }
  ]);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    // Real-time listener
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.username || data.name || "Love");
        setAge(data.age || 25);
        setLocation(data.location || "Beverly Hills, CA");
        setProfession(data.profession || "Model & Influencer");
        setBio(data.bio || "Life is an adventure, let's explore it together! ✨");
        setInterests(data.interests || ["Often", "Sociale drinker", "Never", "Pisces"]);
        if (data.profileImage) {
          setProfileImage(data.profileImage);
        }
        setProfileViews(data.profileViews || Math.floor(Math.random() * 300) + 100);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Increment profile views for the current user (simulate views)
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        const userRef = doc(db, "users", user.uid);
        updateDoc(userRef, {
          profileViews: increment(1)
        }).catch(() => {
          // Silently fail if document doesn't exist
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingImage(true);
    setUploadProgress(0);

    try {
      const result = await uploadProfileImage(
        file,
        user.uid,
        (progress) => setUploadProgress(progress)
      );

      setProfileImage(result.url);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profileImage: result.url,
        profileImagePath: result.path,
        updatedAt: new Date()
      });

      console.log("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
    }
  };

  const handleRevealLike = (likeId: string) => {
    setLikesData(prev => prev.map(like =>
      like.id === likeId ? { ...like, isRevealed: true } : like
    ));
  };

  const handleShowLikes = () => {
    if (isPremium) {
      // Premium users can see all likes immediately
      setLikesData(prev => prev.map(like => ({ ...like, isRevealed: true })));
    }
    setShowLikesModal(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-passion-50 via-romance-25 to-bollywood-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-600 mb-4">Please log in first</h2>
          <Button onClick={() => navigate("/onboarding")} className="bg-romance-500 text-white">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-passion-50 via-romance-25 to-bollywood-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-romance-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <UltraPageTransition>
      <div className={`min-h-screen ${
        isUltraPremium() 
          ? 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100' 
          : 'bg-gradient-to-br from-peach-25 via-cream-50 to-blush-50'
      } pb-20 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-br from-red-300 to-pink-400 opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-4 w-10 h-10 bg-gradient-to-br from-teal-300 to-cyan-400 opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-4 w-8 h-8 bg-gradient-to-br from-pink-300 to-red-400 opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-48 right-8 w-6 h-6 bg-gradient-to-br from-red-400 to-pink-400 opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className={`${
        <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-pink-100/25 to-white/15 backdrop-blur-sm"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-200/15 to-transparent"></div>
          : 'bg-gradient-to-r from-peach-400 via-coral-400 to-blush-500'
      } px-4 py-3 flex items-center justify-between border-b ${
        isUltraPremium() ? 'border-purple-300' : 'border-peach-200'
      } sticky top-0 z-10 shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-jasmine-100/25 to-white/15 backdrop-blur-sm"></div>
        <button
          onClick={() => navigate(-1)}
          className="relative z-10 p-2 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>

        <h1 className="relative z-10 text-lg font-semibold text-white drop-shadow-lg">Profile</h1>

        <button
          onClick={() => navigate('/premium')}
          className="relative z-10 p-2 hover:bg-white/20 transition-colors"
        >
          <Settings size={24} className="text-white" />
        </button>
      </div>

      <div className={`${
        isUltraPremium() ? 'max-w-2xl' : 'max-w-sm'
      } mx-auto px-4 py-6`}>
        {/* Profile Image Section */}
        <Card className={`${
          isUltraPremium() 
            ? 'bg-white/95 backdrop-blur-lg shadow-2xl border border-pink-200/50' 
            : 'bg-white/90 backdrop-blur-sm shadow-xl border-0'
        } overflow-hidden mb-6 relative rounded-3xl`}>
          <div className="relative h-[50vh] overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-t-3xl"
              />
            ) : (
              <div className={`w-full h-full ${
                isUltraPremium() 
                  ? 'bg-gradient-to-br from-pink-200 via-red-200 to-teal-200' 
                  : 'bg-gradient-to-br from-romance-200 via-passion-200 to-royal-200'
              } flex items-center justify-center`}>
                <div className="text-center text-white">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold">{name.charAt(0)}</span>
                  </div>
                  <p className="text-white/80">Tap to add photo</p>
                </div>
              </div>
            )}

            {/* Upload overlay */}
            {uploadingImage && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-sm">Uploading... {uploadProgress}%</p>
                </div>
              </div>
            )}

            {/* Camera button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`absolute top-4 right-4 ${
                isUltraPremium() 
                  ? 'bg-red-500/90 hover:bg-red-600/90' 
                  : 'bg-black/20 hover:bg-black/30'
              } backdrop-blur-sm p-3 rounded-full transition-colors shadow-lg`}
              disabled={uploadingImage}
            >
              <Camera size={20} className="text-white" />
            </button>

            {/* Profile Views Badge - Only for Premium Users */}
            {isPremium && (
              <div className={`absolute top-4 left-4 ${
                isUltraPremium() 
                  ? 'bg-teal-500/90 backdrop-blur-lg' 
                  : 'bg-black/20 backdrop-blur-sm'
              } px-3 py-2 rounded-full flex items-center gap-2 shadow-lg`}>
                <Eye size={14} className="text-white" />
                <span className="text-white text-sm font-bold">{profileViews.toLocaleString()}</span>
              </div>
            )}

            {/* Premium Badge */}
            {isPremium && (
              <div className={`absolute top-16 left-4 ${
                isUltraPremium() 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
              } px-3 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                <Crown className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-bold">
                  {isUltraPremium() ? 'ULTRA+' : 'PREMIUM'}
                </span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </Card>

        {/* User Information Section */}
        <Card className={`${
          isUltraPremium() 
            ? 'bg-white/95 backdrop-blur-lg shadow-2xl border border-pink-200/50' 
            : 'bg-white/90 backdrop-blur-sm shadow-lg border-0'
        } mb-6 relative z-10 rounded-3xl`}>
          <CardContent className="p-6">
            {/* Name and Age */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`${
                  isUltraPremium() ? 'text-gray-900' : 'text-gray-900'
                } text-3xl font-bold mb-1`}>{name}, {age}</h2>
                <div className={`flex items-center gap-2 ${
                  isUltraPremium() ? 'text-gray-700' : 'text-gray-600'
                } mb-3`}>
                  <MapPin size={16} />
                  <span className="text-sm">{location}</span>
                </div>
              </div>

              <button className={`${
                isUltraPremium() 
                  ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              } p-3 rounded-full transition-colors shadow-md`}>
                <Edit3 size={18} />
              </button>
            </div>

            {/* Bio */}
            <p className={`${
              isUltraPremium() ? 'text-gray-800' : 'text-gray-700'
            } text-sm leading-relaxed mb-4 font-medium`}>{bio}</p>

            {/* Profession */}
            <div className={`flex items-center gap-2 ${
              isUltraPremium() ? 'text-gray-700' : 'text-gray-600'
            } mb-4`}>
              <Briefcase size={16} />
              <span className="text-sm font-semibold">{profession}</span>
            </div>

            {/* Interest Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className={`${
                    isUltraPremium() 
                      ? 'bg-pink-100 text-red-700 border border-pink-200' 
                      : 'bg-gray-100 text-gray-700'
                  } px-3 py-1 text-xs font-medium rounded-full`}
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  // Edit profile functionality
                  alert('Edit profile feature coming soon!');
                }}
                className={`flex-1 ${
                  isUltraPremium() 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                    : 'bg-gradient-to-r from-romance-500 to-passion-500 hover:from-romance-600 hover:to-passion-600'
                } text-white font-bold py-4 border-0 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>

              <Button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Profile',
                      text: `Check out my profile on AjnabiCam!`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Profile link copied to clipboard!');
                  }
                }}
                className={`${
                  isUltraPremium() 
                    ? 'bg-teal-100 hover:bg-teal-200 text-teal-700' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } font-bold px-6 py-4 border-0 rounded-2xl shadow-md transform hover:scale-105 transition-all duration-200`}
              >
                <Users className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className={`${
            isUltraPremium() 
              ? 'bg-white/95 backdrop-blur-lg shadow-lg border border-teal-200/50' 
              : 'bg-white/80 backdrop-blur-sm shadow-sm border-0'
          } rounded-2xl`}>
            <CardContent className="p-4 text-center">
              {isPremium ? (
                <>
                  <div className={`w-12 h-12 ${
                    isUltraPremium() 
                      ? 'bg-teal-100 text-teal-600' 
                      : 'bg-blue-100 text-blue-600'
                  } flex items-center justify-center mx-auto mb-2 rounded-xl`}>
                    <Eye className="w-6 h-6" />
                  </div>
                  <div className={`text-xl font-bold ${
                    isUltraPremium() ? 'text-teal-700' : 'text-blue-700'
                  }`}>{profileViews}</div>
                  <div className={`text-xs font-medium ${
                    isUltraPremium() ? 'text-teal-600' : 'text-blue-600'
                  }`}>Views</div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mx-auto mb-2 relative rounded-xl">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <Crown className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
                  </div>
                  <div className="text-xl font-bold text-gray-400">***</div>
                  <div className="text-xs text-gray-400">Premium</div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className={`${
            isUltraPremium() 
              ? 'bg-white/95 backdrop-blur-lg shadow-lg border border-pink-200/50' 
              : 'bg-white/80 backdrop-blur-sm shadow-sm border-0'
          } rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${
                isUltraPremium() 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-green-100 text-green-600'
              } flex items-center justify-center mx-auto mb-2 rounded-xl`}>
                <Users className="w-6 h-6" />
              </div>
              <div className={`text-xl font-bold ${
                isUltraPremium() ? 'text-red-700' : 'text-gray-800'
              }`}>23</div>
              <div className={`text-xs font-medium ${
                isUltraPremium() ? 'text-red-600' : 'text-gray-500'
              }`}>Friends</div>
            </CardContent>
          </Card>

          <Card
            className={`${
              isUltraPremium() 
                ? 'bg-white/95 backdrop-blur-lg shadow-lg border border-pink-200/50 hover:shadow-xl hover:scale-105' 
                : 'bg-white/80 backdrop-blur-sm shadow-sm border-0 hover:shadow-md'
            } cursor-pointer transition-all duration-200 rounded-2xl`}
            onClick={handleShowLikes}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${
                isUltraPremium() 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'bg-pink-100 text-pink-600'
              } flex items-center justify-center mx-auto mb-2 relative rounded-xl`}>
                <Heart className="w-6 h-6" />
                {!isPremium && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className={`text-xl font-bold ${
                isUltraPremium() ? 'text-pink-700' : 'text-pink-700'
              }`}>
                {isPremium ? likesData.length : '?'}
              </div>
              <div className={`text-xs font-medium ${
                isUltraPremium() ? 'text-pink-600' : 'text-pink-600'
              }`}>
                {isPremium ? 'Likes' : 'Tap to See'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className={`${
            isUltraPremium() 
              ? 'bg-white/95 backdrop-blur-lg shadow-lg border border-yellow-200/50' 
              : 'bg-white/80 backdrop-blur-sm shadow-sm border-0'
          } rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${
                isUltraPremium() 
                  ? 'bg-yellow-100 text-yellow-600' 
                  : 'bg-yellow-100 text-yellow-600'
              } flex items-center justify-center mx-auto mb-2 rounded-xl`}>
                <Star className="w-6 h-6" />
              </div>
              <div className={`text-xl font-bold ${
                isUltraPremium() ? 'text-yellow-700' : 'text-yellow-700'
              }`}>{coins}</div>
              <div className={`text-xs font-medium ${
                isUltraPremium() ? 'text-yellow-600' : 'text-yellow-600'
              }`}>Coins</div>
            </CardContent>
          </Card>

          <Card className={`${
            isUltraPremium() 
              ? 'bg-white/95 backdrop-blur-lg shadow-lg border border-purple-200/50' 
              : 'bg-white/80 backdrop-blur-sm shadow-sm border-0'
          } rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${
                isUltraPremium() 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'bg-purple-100 text-purple-600'
              } flex items-center justify-center mx-auto mb-2 rounded-xl`}>
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className={`text-xl font-bold ${
                isUltraPremium() ? 'text-purple-700' : 'text-purple-700'
              }`}>156</div>
              <div className={`text-xs font-medium ${
                isUltraPremium() ? 'text-purple-600' : 'text-purple-600'
              }`}>Chats</div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/premium')}
            className={`w-full ${
              isUltraPremium() 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                : 'bg-gradient-to-r from-peach-400 to-coral-500 hover:from-peach-500 hover:to-coral-600'
            } text-white font-bold py-4 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-200`}
          >
            <Crown className="w-5 h-5 mr-2" />
            {isUltraPremium() ? 'ULTRA+ Settings' : 'Upgrade to Premium'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate('/chat')}
              variant="outline"
              className={`py-4 rounded-2xl ${
                isUltraPremium() 
                  ? 'border-red-200 text-red-600 hover:bg-red-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              } font-bold shadow-md transform hover:scale-105 transition-all duration-200`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
            </Button>
            
            <Button
              onClick={() => navigate('/')}
              variant="outline" 
              className={`py-4 rounded-2xl ${
                isUltraPremium() 
                  ? 'border-teal-200 text-teal-600 hover:bg-teal-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              } font-bold shadow-md transform hover:scale-105 transition-all duration-200`}
            >
              <Users className="w-4 h-4 mr-2" />
              Discover
            </Button>
          </div>
        </div>
      </div>

      {/* ULTRA+ Profile Enhancements */}
      {isUltraPremium() && (
        <UltraProfileEnhancements
          isUltraPremium={true}
          userProfile={{
            name: name,
            bio: bio,
            profileImage: profileImage || undefined,
            premiumSince: new Date('2024-01-15'), // Example date
            totalFriends: 25,
            totalChats: 150,
            premiumFeatureUsage: {
              reactionsUsed: 89,
              filtersUsed: 15,
              adsFree: 45,
              unlimitedTime: 120
            }
          }}
          onProfileUpdate={(updates) => {
            console.log('Profile updates:', updates);
            // Handle profile updates
          }}
        />
      )}

      {/* Debug: Test ULTRA+ Features */}
      {!isUltraPremium() && (
        <div className="px-4 mb-4">
          <Button
            onClick={() => {
              const expiry = new Date();
              expiry.setMonth(expiry.getMonth() + 3);
              setPremium(true, expiry, 'ultra-quarterly');
              alert('🎉 ULTRA+ activated for testing! Refresh to see changes.');
              window.location.reload();
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg shadow-md transition-colors"
          >
            <Crown className="h-4 w-4 mr-2" />
            🧪 Test ULTRA+ Features (Debug)
          </Button>
        </div>
      )}

      {/* Use UltraBottomNavBar for ULTRA+ users, regular for others */}
      {isUltraPremium() ? <UltraBottomNavBar /> : <BottomNavBar />}

      {/* Who Liked Me Modal */}
      <WhoLikedMeModal
        isOpen={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        likes={likesData}
        onRevealLike={handleRevealLike}
      />
      </div>
    </UltraPageTransition>
  );
}
