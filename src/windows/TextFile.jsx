import React from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import { WindowControls } from '../components';
import useWindowStore from '../store/window';

const TextFile = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile.data;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>
      <div className="p-4">
        {data.image && (
          <img src={data.image} alt={data.name} className="w-full  object-cover mb-4 rounded" />
        )}
        {data.subtitle && (
          <h3 className="text-lg font-semibold mb-2">{data.subtitle}</h3>
        )}
        {data.description && data.description.map((paragraph, index) => (
          <p key={index} className="mb-2">{paragraph}</p>
        ))}
      </div>
    </>
  );
};

const TextFileWindow = WindowWrapper(TextFile, "txtfile");
export default TextFileWindow;