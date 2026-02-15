import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ChefHat, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { itemCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">ByteBite</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link to="/menu">
            <Button variant={isActive('/menu') ? 'secondary' : 'ghost'} size="sm">
              Menu
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant={isActive('/orders') ? 'secondary' : 'ghost'} size="sm">
              My Orders
            </Button>
          </Link>
          <Link to="/kitchen">
            <Button variant={isActive('/kitchen') ? 'secondary' : 'ghost'} size="sm">
              <ChefHat className="h-4 w-4" />
              <span className="hidden sm:inline">Kitchen</span>
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant={isActive('/cart') ? 'secondary' : 'ghost'} size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
