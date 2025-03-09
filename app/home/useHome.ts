import { useState, useCallback, useEffect, useRef } from 'react';
import { MatchData } from '@/types/MatchDataType';

export const useHome = () => {
  const [newMatches, setNewMatches] = useState<MatchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowInterestsModal, setIsShowInterestsModal] = useState(false);
  const isFetching = useRef(false);

  const fetchNewMatches = useCallback(async (): Promise<MatchData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Array.from({ length: 10 }, (_, i) => ({
          id: `new-${Date.now()}-${i}`,
          name: `New Match ${i}`,
          age: 20 + Math.floor(Math.random() * 15),
          location: ['New York', 'Brooklyn', 'Manhattan'][Math.floor(Math.random() * 3)],
          distance: Math.floor(Math.random() * 10) + 1,
          image: `https://picsum.photos/seed/${Date.now() + i}/800/1200`,
          bio: 'New match bio...',
          interests: ['Travel', 'Music', 'Food'].slice(0, Math.floor(Math.random() * 3) + 1),
        })));
      }, 300);
    });
  }, []);

  const prefetchNextBatch = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    
    try {
      const newMatchesResponse = await fetchNewMatches();
      setNewMatches(prev => [...prev, ...newMatchesResponse]);
    } catch (error) {
      console.error('Error prefetching data:', error);
    } finally {
      isFetching.current = false;
    }
  }, [fetchNewMatches]);

  const handleSwipe = useCallback((id: string) => {
    setNewMatches(prev => {
      const newCards = prev.filter(match => match.id !== id);
      if (newCards.length <= 5) {
        prefetchNextBatch();
      }
      return newCards;
    });
  }, [prefetchNextBatch]);

  const handleLike = useCallback((id: string) => {
    handleSwipe(id);
  }, [handleSwipe]);

  const handlePass = useCallback((id: string) => {
    handleSwipe(id);
  }, [handleSwipe]);

  const handleMessage = useCallback((id: string) => {
    console.log('Message:', id);
  }, []);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const newMatchesResponse = await fetchNewMatches();
      setNewMatches(newMatchesResponse);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchNewMatches]);


  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const [stories] = useState([
    {
      id: '1',
      name: 'Sarah',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      isLive: true,
    },
    {
      id: '2',
      name: 'Jessica',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      isLive: false,
    },
    {
      id: '3',
      name: 'Emily',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      isLive: true,
    },
    {
      id: '4',
      name: 'Anna',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      isLive: false,
    },
    {
      id: '5',
      name: 'Lisa',
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
      isLive: true,
    },
  ]);

  const resetMatches = useCallback(async () => {
    setIsLoading(true);
    try {
      const newMatchesResponse = await fetchNewMatches();
      setNewMatches(newMatchesResponse);
    } catch (error) {
      console.error('Error resetting matches:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchNewMatches]);

  return {
    stories,
    newMatches,
    handleLike,
    handlePass,
    handleMessage,
    refreshData,
    isLoading,
    resetMatches,
    isShowInterestsModal,
    setIsShowInterestsModal,
  };
};
