import { create } from 'zustand';

// import exampleImg2 from '@/assets/images/01-min_aUP6.jpg';
// import exampleImg1 from '@/assets/images/00006-1889027936.jpeg';
import api from '@/utils/api';

// const imageArray = Array.from({ length: 2 }, (_, index) => `${index % 2 ? exampleImg1 : exampleImg2}`);
// const imageArray = [exampleImg1, exampleImg2];

type ImageType = { id: string; image: string };

type Store = {
  activeImageIndex: number | null;
  allImages: ImageType[];
};

type Actions = {
  setActiveImageIndex: (index: number) => void;
  resetIndex: () => void;
  incrementIndex: () => void;
  decrementIndex: () => void;
  setImage: (image: ImageType) => void;

  fetchAllImages: () => Promise<void>;
  createImage: (data: FormData) => Promise<void>;
};

export const useGalleryStore = create<Store & Actions>((set, get) => ({
  activeImageIndex: null,
  allImages: [],

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

  setImage: (image) => set({ allImages: [image, ...get().allImages] }),

  fetchAllImages: async () => {
    try {
      const result = await api.posts.getAll();
      set({ allImages: result });
    } catch (error) {
      console.error(error);
    }
  },

  createImage: async (data) => {
    try {
      await api.posts.create(data);

      get().fetchAllImages();
    } catch (error) {
      console.error(error);
    }
  },
}));
