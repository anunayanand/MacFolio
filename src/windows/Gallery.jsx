import React, { useState } from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import { WindowControls } from '../components';
import { galleryImages, photosLinks } from '../constants';
import useWindowStore from '../store/window';

const Gallery = () => {
  const { openWindow, windows } = useWindowStore();
  const [selectedCategory, setSelectedCategory] = useState('Library');
  const isMaximized = windows.photos.isMaximized;

  const filteredImages = selectedCategory === 'Library' ? galleryImages : galleryImages.filter(img => img.category === selectedCategory);

  const openImage = (image) => {
    openWindow('imgfile', { name: image.name, imageUrl: image.fullUrl });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2 className="text-center flex-1 font-bold">Gallery</h2>
      </div>
      <div className="flex h-full">
        {!isMaximized && (
          <div className="w-48 bg-gray-100 p-4 border-r">
            <h3 className="font-bold mb-4">Photos</h3>
            <ul className="space-y-2">
              {photosLinks.map((link) => (
                <li
                  key={link.id}
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedCategory === link.title ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                  onClick={() => setSelectedCategory(link.title)}
                >
                  <img src={link.icon} alt={link.title} className="w-5 h-5" />
                  <span>{link.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={`${isMaximized ? 'w-full' : 'flex-1'} p-4`}>
          <div className={`grid ${isMaximized ? 'grid-cols-5' : 'grid-cols-4'} gap-4`}>
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="cursor-pointer group"
                onClick={() => openImage(image)}
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-2">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-center font-medium truncate">{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const GalleryWindow = WindowWrapper(Gallery, "photos");
export default GalleryWindow;