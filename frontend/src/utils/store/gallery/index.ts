import { create } from 'zustand';

import exampleImg1 from '@/assets/images/00006-1889027936.jpeg';
import exampleImg2 from '@/assets/images/01-min_aUP6.jpg';

const imageArray = Array.from({ length: 20 }, (_, index) => `${index % 2 ? exampleImg1 : exampleImg2}`);

type Store = {
  activeImageIndex: number | null;
  allImages: string[];
};

type Actions = {
  setActiveImageIndex: (index: number) => void;
  resetIndex: () => void;
  incrementIndex: () => void;
  decrementIndex: () => void;
};

export const useGalleryStore = create<Store & Actions>((set, get) => ({
  activeImageIndex: null,
  allImages: imageArray,

  setActiveImageIndex: (activeImageIndex) => set({ activeImageIndex }),
  resetIndex: () => set({ activeImageIndex: null }),

  incrementIndex: () => {
    const { activeImageIndex, allImages } = get();
    if (activeImageIndex === null) return;

    if (activeImageIndex === allImages.length - 1) {
      return set({ activeImageIndex: 0 });
    }

    set({ activeImageIndex: activeImageIndex + 1 });
  },

  decrementIndex: () => {
    const { activeImageIndex, allImages } = get();
    if (activeImageIndex === null) return;

    if (activeImageIndex === 0) {
      return set({ activeImageIndex: allImages.length - 1 });
    }
    set({ activeImageIndex: activeImageIndex - 1 });
  },
}));
