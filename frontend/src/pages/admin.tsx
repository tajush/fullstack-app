// import { useState } from 'react';
// import axios from 'axios';

// export default function AdminPanel() {
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     image: null as File | null
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;
//     if (name === 'image' && files) {
//       setFormData(prev => ({ ...prev, image: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('name', formData.name);
//     form.append('price', formData.price);
//     if (formData.image) {
//       form.append('image', formData.image);
//     }

//     try {
//       await axios.post('http://localhost:5000/api/products', form, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('Product uploaded successfully!');
//       setFormData({ name: '', price: '', image: null });
//     } catch (err) {
//       console.error(err);
//       alert('Upload failed');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Admin Panel - Upload Product</h1>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//           required
//         />
//         <br /><br />
//         <button type="submit">Upload Product</button>
//       </form>
//     </div>
//   );
// }


import { useState } from 'react';
import axios from 'axios';

export default function AdminGalleryUpload() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Uploaded');
      setTitle('');
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Failed');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="text"
        placeholder="Image title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}
