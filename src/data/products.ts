export type Product = {
  id: number;
  name: string;
  price: number;          // in LKR
  image: string;          // placeholder URLs for now
  category: string;
  fabric?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Banarasi Silk Saree - Royal Red",
    price: 289,
    image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=800&auto=format&fit=crop&q=80",
    category: "Saree",
    fabric: "Silk",
    description: "Pure handwoven Banarasi with intricate zari work. Includes matching blouse piece.",
  },
  {
    id: 2,
    name: "Cotton Handloom Saree - Soft Green",
    price: 149,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    category: "Saree",
    fabric: "Cotton",
    description: "Lightweight everyday saree with traditional motifs. Breathable & comfortable.",
  },
  {
    id: 3,
    name: "Anarkali Kurti Set - Navy Blue",
    price: 179,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d26?w=800&auto=format&fit=crop&q=80",
    category: "Kurti",
    fabric: "Chanderi",
    description: "Elegant floor-length Anarkali with dupatta. Perfect for festive occasions.",
  },
  {
    id: 4,
    name: "Chiffon Dupatta - Golden Embroidery",
    price: 89,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
    category: "Dupatta",
    fabric: "Chiffon",
    description: "Sheer dupatta with hand-embroidered borders. Complements any outfit.",
  },
  {
    id: 5,
    name: "Kanchipuram Silk Saree - Emerald Green",
    price: 399,
    image: "https://images.unsplash.com/photo-1609811845304-5a5c3e6e8e3f?w=800&auto=format&fit=crop&q=80",
    category: "Saree",
    fabric: "Silk",
    description: "Premium Kanchipuram with rich pallu and contrast blouse.",
  },
  // Add more if you want — or replace images with your own later
];