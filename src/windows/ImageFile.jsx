import React, { useState } from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import { WindowControls } from '../components';
import { Download, Share, Copy } from 'lucide-react';
import useWindowStore from '../store/window';

const ImageFile = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile.data;
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(data.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.name || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.name,
          url: data.imageUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy URL to clipboard
      await navigator.clipboard.writeText(data.imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2 className="text-center flex-1 font-bold">{data.name}</h2>
        <div className="flex items-center gap-5 mr-4 relative">
          <Download className="icon cursor-pointer" onClick={handleDownload} />
          <Share className="icon cursor-pointer" onClick={handleShare} />
          <Copy className="icon cursor-pointer" onClick={handleCopy} />
          {copied && (
            <div className="absolute top-full right-0 mt-1 bg-black text-white text-xs px-2 py-1 rounded">
              Link copied!
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        {data.imageUrl && (
          <img src={data.imageUrl} alt={data.name} className="w-full h-auto object-contain" />
        )}
      </div>
    </>
  );
};

const ImageFileWindow = WindowWrapper(ImageFile, "imgfile");
export default ImageFileWindow;