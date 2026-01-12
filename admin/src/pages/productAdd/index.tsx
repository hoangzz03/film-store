import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface ProductFormData {
  name: string;
  image: string;
  desc: string;
  price: string;
  detail: string;
  productCategory: string;
}

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(!!id);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    image: '',
    desc: '',
    price: '',
    detail: '',
    productCategory: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/product-category');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        if (!id) setLoading(false);
      }
    };

    fetchCategories();

    if (id) {
      const fetchProductData = async (productId: string): Promise<void> => {
        // console.log(`Fetching product with ID: ${productId}`);

        try {
          const response = await fetch(`http://localhost:3000/products/${productId}`);
          const data = await response.json();
          // console.log('Fetched product data:', data);
          setImagePreview(data[0].image);
          setFormData({
            ...data[0],
            productCategory: data[0].productCategory.name
          });
          if (data.image) setImagePreview(data.image);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductData(id);
    }
  }, [id]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): Promise<void> => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setImagePreview(URL.createObjectURL(file));

        try {
          const uploadForm = new FormData();
          uploadForm.append('file', file);

          const res = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: uploadForm
          });

          const result = await res.json();
          if (res.ok && result.url) {
            setFormData({
              ...formData,
              image: result.url
            });
          } else {
            console.error('Upload failed:', result);
            setSubmitMessage('Image upload failed. Please try again.');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          setSubmitMessage('Error uploading image. Please try again.');
        }
      }
    } else if (name === 'name') {
      setFormData({
        ...formData,
        name: value
      });
    } else if (name === 'desc') {
      setFormData({
        ...formData,
        desc: value
      });
    } else if (name === 'price') {
      setFormData({
        ...formData,
        price: value
      });
    } else if (name === 'detail') {
      setFormData({
        ...formData,
        detail: value
      });
    } else if (name === 'productCategory') {
      setFormData({
        ...formData,
        productCategory: value
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(id
        ? `http://localhost:3000/products/${id}`
        : 'http://localhost:3000/products', {
        method: id ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitMessage(id ? 'Product updated successfully!' : 'Product added successfully!');

      // Reset form after successful submission if adding new product
      if (!id) {
        setFormData({
          name: '',
          image: '',
          desc: '',
          price: '',
          detail: '',
          productCategory: ''
        });
        setImagePreview('');
      }

      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/productmanagement');
      }, 1500);
    } catch (error) {
      console.error('Error saving product:', error);
      setSubmitMessage('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <svg className="mx-auto h-12 w-12 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? 'Edit Product' : 'Add New Product'}
        </h1>

        {submitMessage && (
          <div className={`mb-4 p-3 rounded ${submitMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Product Category
              </label>
              <select
                id="productCategory"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-32 w-32 bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Product preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-gray-400">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                  Upload
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="sr-only"
                  />
                </label>
              </div>
              {formData.image && (
                <p className="mt-2 text-sm text-gray-500">File: {formData.image.split('/').pop()}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-6">
            <label htmlFor="detail" className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <textarea
              id="detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting ? (id ? 'Updating...' : 'Adding...') : (id ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;