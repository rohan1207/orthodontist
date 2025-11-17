import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import SubscriptionGate from './SubscriptionGate';

const ScrollBasedSubscription = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const founderRef = useRef(null);
  const hasShownModal = useRef(false);
  const { user, loading } = useAuth();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimer = useRef(null);
  
  const isAuthenticated = !!user;

  // Check if we should show the modal
  const shouldShowModal = useCallback(() => {
    // Don't show if already authenticated
    if (isAuthenticated) return false;
    
    // Check if we've already shown the modal in this session
    const hasSeenModal = sessionStorage.getItem('hasSeenSubscriptionModal');
    return !hasSeenModal;
  }, [isAuthenticated]);

  useEffect(() => {
    // Don't do anything while still loading auth state
    if (loading) return;
    
    // If we shouldn't show the modal, don't set up the scroll listener
    if (!shouldShowModal()) {
      hasShownModal.current = true;
      return;
    }

    const handleScroll = () => {
      if (!founderRef.current || hasShownModal.current) return;
      
      const founderSection = founderRef.current;
      const rect = founderSection.getBoundingClientRect();
      
      // Show modal when user scrolls past the founder section
      if (rect.bottom <= window.innerHeight) {
        // Add a small delay to prevent modal from showing during fast scrolls
        clearTimeout(scrollTimer.current);
        setIsScrolling(true);
        
        scrollTimer.current = setTimeout(() => {
          if (isScrolling) {
            setShowModal(true);
            hasShownModal.current = true;
            // Remember that we've shown the modal in this session
            sessionStorage.setItem('hasSeenSubscriptionModal', 'true');
            window.removeEventListener('scroll', handleScroll);
          }
        }, 1000); // 1 second delay after scrolling stops
      }
    };

    // Add scroll event listener with debounce
    const scrollListener = () => {
      handleScroll();
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    
    // Initial check in case the user loads the page already scrolled
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollListener);
      clearTimeout(scrollTimer.current);
    };
  }, [isAuthenticated, isScrolling, loading, shouldShowModal]);
  
  // Reset the modal state when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false);
      hasShownModal.current = true;
    }
  }, [isAuthenticated]);

  const handleCloseModal = () => {
    setShowModal(false);
    hasShownModal.current = true;
    // Remember that we've shown the modal in this session
    sessionStorage.setItem('hasSeenSubscriptionModal', 'true');
  };

  const handleAuthSuccess = () => {
    setShowModal(false);
  };

  // Don't show the modal if user is authenticated or still loading auth state
  if (isAuthenticated || loading) {
    return <>{children(founderRef)}</>;
  }

  return (
    <>
      {children(founderRef)}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Unlock Premium Content</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Sign up now to access all our premium orthodontic resources, articles, and exclusive content!
              </p>
              <div className="space-y-4">
                <SubscriptionGate onAuthSuccess={handleAuthSuccess} />
                <div className="text-center text-sm text-gray-500 mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollBasedSubscription;
