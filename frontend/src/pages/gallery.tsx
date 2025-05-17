

import { useEffect, useState } from 'react';
import axios from 'axios';

interface ImageType {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt?: string;
}

export default function Gallery() {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    axios
      .get<ImageType[]>('http://localhost:5000/api/gallery')
      .then(res => setImages(res.data))
      .catch(err => console.error('Failed to load images:', err));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.length === 0 && <p>No images found.</p>}
      {images.map((img) => (
        <div key={img._id}>
          <p>{img.title}</p>
          <img
            src={`http://localhost:5000${img.imageUrl}`}
            alt={img.title}
            width="200"
          />
        </div>
      ))}
    </div>
  );
}
