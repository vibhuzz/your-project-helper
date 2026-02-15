import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Clock, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SAMPLE_MENU, MENU_CATEGORIES, MenuItem } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const qty = cartItem?.quantity || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl border bg-card p-4 transition-shadow hover:shadow-md ${!item.available ? 'opacity-50' : ''}`}
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary text-3xl">
          {item.image}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-foreground truncate">{item.name}</h3>
                {item.isVeg && <Leaf className="h-3.5 w-3.5 shrink-0 text-accent" />}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold text-foreground">₹{item.price}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {item.prepTime} min
              </span>
            </div>
            {item.available ? (
              qty > 0 ? (
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, qty - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center font-semibold text-foreground">{qty}</span>
                  <Button size="icon" variant="default" className="h-8 w-8" onClick={() => addItem(item)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="hero" onClick={() => addItem(item)}>
                  <Plus className="h-4 w-4" /> Add
                </Button>
              )
            ) : (
              <span className="text-xs font-medium text-destructive">Unavailable</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = SAMPLE_MENU.filter(item => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (vegOnly && !item.isVeg) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Today's Menu</h1>
        <p className="mt-1 text-muted-foreground">Fresh from the canteen kitchen 🍳</p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {MENU_CATEGORIES.map(cat => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
          <Button
            size="sm"
            variant={vegOnly ? 'accent' : 'outline'}
            onClick={() => setVegOnly(!vegOnly)}
            className="ml-auto"
          >
            <Leaf className="h-4 w-4" /> Veg Only
          </Button>
        </div>

        {/* Menu Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No items found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
