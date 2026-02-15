import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    toast.success('Order placed successfully! 🎉', { description: 'Head to the Fast-Track Counter when notified.' });
    clearCart();
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold text-foreground">Your Cart</h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30" />
            <p className="mt-4 text-lg text-muted-foreground">Your cart is empty</p>
            <Link to="/menu">
              <Button variant="hero" className="mt-6">Browse Menu</Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="mt-6 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                  >
                    <span className="text-2xl">{item.image}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="w-16 text-right font-display font-bold text-foreground">₹{item.price * item.quantity}</span>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between text-lg">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-foreground">₹{total}</span>
              </div>
              <Button variant="hero" size="xl" className="mt-4 w-full" onClick={handlePlaceOrder}>
                Place Order
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                You'll receive a notification when your food is ready
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
