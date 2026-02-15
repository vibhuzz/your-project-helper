export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  prepTime: number; // in minutes
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked-up';
  createdAt: Date;
  estimatedTime: number;
}

export const MENU_CATEGORIES = ['All', 'Meals', 'Snacks', 'Beverages', 'Desserts'] as const;

export const SAMPLE_MENU: MenuItem[] = [
  { id: '1', name: 'Veg Biryani', description: 'Fragrant basmati rice with mixed vegetables and aromatic spices', price: 80, category: 'Meals', image: '🍚', isVeg: true, prepTime: 15, available: true },
  { id: '2', name: 'Paneer Butter Masala', description: 'Rich creamy tomato gravy with soft paneer cubes, served with roti', price: 100, category: 'Meals', image: '🍛', isVeg: true, prepTime: 20, available: true },
  { id: '3', name: 'Chicken Biryani', description: 'Hyderabadi style dum biryani with tender chicken pieces', price: 120, category: 'Meals', image: '🍗', isVeg: false, prepTime: 20, available: true },
  { id: '4', name: 'Samosa (2 pcs)', description: 'Crispy pastry filled with spiced potatoes and peas', price: 20, category: 'Snacks', image: '🥟', isVeg: true, prepTime: 5, available: true },
  { id: '5', name: 'Vada Pav', description: 'Mumbai style spicy potato fritter in a bun with chutneys', price: 25, category: 'Snacks', image: '🍔', isVeg: true, prepTime: 5, available: true },
  { id: '6', name: 'Masala Dosa', description: 'Crispy crepe with spiced potato filling, sambar and chutney', price: 60, category: 'Meals', image: '🥞', isVeg: true, prepTime: 10, available: true },
  { id: '7', name: 'Chai', description: 'Hot masala tea brewed with fresh spices and milk', price: 15, category: 'Beverages', image: '☕', isVeg: true, prepTime: 3, available: true },
  { id: '8', name: 'Cold Coffee', description: 'Chilled coffee with ice cream and chocolate drizzle', price: 50, category: 'Beverages', image: '🧋', isVeg: true, prepTime: 5, available: true },
  { id: '9', name: 'Fresh Lime Soda', description: 'Refreshing lemon soda – sweet or salted', price: 30, category: 'Beverages', image: '🍋', isVeg: true, prepTime: 3, available: true },
  { id: '10', name: 'Gulab Jamun (2 pcs)', description: 'Soft milk dumplings soaked in rose-flavored sugar syrup', price: 30, category: 'Desserts', image: '🍩', isVeg: true, prepTime: 2, available: true },
  { id: '11', name: 'Egg Roll', description: 'Flaky paratha wrapped around spiced egg filling', price: 40, category: 'Snacks', image: '🌯', isVeg: false, prepTime: 8, available: true },
  { id: '12', name: 'Mango Lassi', description: 'Thick creamy yogurt smoothie with fresh mango pulp', price: 45, category: 'Beverages', image: '🥭', isVeg: true, prepTime: 3, available: false },
];
