import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from 'lucide-react';
import TinyMCEEditor from '@/components/blogComponents/TinyMCEEditor';
import { categories } from '../../public/jsons/categories';

const ProductEntryForm = () => {
  const [product, setProduct] = useState({
    name: '',
    image: [],
    price: '',
    fakePrice: '',
    categories: [],
    slug: '',
    description: '',
    details: {}
  });

  const [newDetailKey, setNewDetailKey] = useState('');
  const [newDetailValue, setNewDetailValue] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct(prev => ({ ...prev, image: [...prev.image, ...files] }));
  };

  const handleCategoryChange = (value) => {
    setProduct(prev => ({ ...prev, categories: [...prev.categories, value] }));
  };

  const handleDescriptionChange = (content) => {
    setProduct(prev => ({ ...prev, description: content }));
  };

  const handleAddDetail = () => {
    if (newDetailKey && newDetailValue) {
      setProduct(prev => ({
        ...prev,
        details: { ...prev.details, [newDetailKey]: newDetailValue }
      }));
      setNewDetailKey('');
      setNewDetailValue('');
    }
  };

  const handleRemoveDetail = (key) => {
    setProduct(prev => {
      const newDetails = { ...prev.details };
      delete newDetails[key];
      return { ...prev, details: newDetails };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" value={product.name} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="image">Product Images</Label>
            <Input id="image" name="image" type="file" multiple onChange={handleImageChange} />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={product.price} onChange={handleInputChange} />
            </div>
            <div className="flex-1">
              <Label htmlFor="fakePrice">Original Price</Label>
              <Input id="fakePrice" name="fakePrice" type="number" value={product.fakePrice} onChange={handleInputChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="categories">Categories</Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="computer-accessories">Computer Accessories</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem> */}
                {categories.map(cat=>(
                    <SelectItem value={cat.slug} key={cat.slug}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" value={product.slug} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Product Description</Label>
            <TinyMCEEditor content={product.description} onEditorChange={handleDescriptionChange} />
          </div>
          <div>
            <Label>Product Details</Label>
            <div className="space-y-2">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Input value={key} disabled />
                  <Textarea value={value} onChange={(e) => setProduct(prev => ({
                    ...prev,
                    details: { ...prev.details, [key]: e.target.value }
                  }))} />
                  <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveDetail(key)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-end space-x-2 mt-2">
              <div className="flex-1">
                <Label htmlFor="newDetailKey">Key</Label>
                <Input
                  id="newDetailKey"
                  value={newDetailKey}
                  onChange={(e) => setNewDetailKey(e.target.value)}
                  placeholder="e.g., Weight"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="newDetailValue">Value</Label>
                <Input
                  id="newDetailValue"
                  value={newDetailValue}
                  onChange={(e) => setNewDetailValue(e.target.value)}
                  placeholder="e.g., 76 Grams"
                />
              </div>
              <Button type="button" onClick={handleAddDetail}>Add Detail</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Product</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductEntryForm;