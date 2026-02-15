import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, ChefHat, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

interface DemoOrder {
  id: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready';
  time: string;
}

const DEMO_ORDERS: DemoOrder[] = [
  { id: 'BB-1042', items: ['Veg Biryani', 'Chai'], total: 95, status: 'preparing', time: '12:35 PM' },
  { id: 'BB-1039', items: ['Samosa (2 pcs)', 'Cold Coffee'], total: 70, status: 'ready', time: '12:20 PM' },
  { id: 'BB-1035', items: ['Paneer Butter Masala', 'Mango Lassi'], total: 145, status: 'confirmed', time: '11:50 AM' },
];

const statusConfig = {
  pending: { icon: Clock, label: 'Pending', color: 'text-muted-foreground', bg: 'bg-muted' },
  confirmed: { icon: Package, label: 'Confirmed', color: 'text-primary', bg: 'bg-primary/10' },
  preparing: { icon: ChefHat, label: 'Preparing', color: 'text-primary', bg: 'bg-primary/10' },
  ready: { icon: CheckCircle, label: 'Ready!', color: 'text-accent', bg: 'bg-accent/10' },
};

const OrdersPage = () => {
  const [orders] = useState<DemoOrder[]>(DEMO_ORDERS);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold text-foreground">My Orders</h1>
        <p className="mt-1 text-muted-foreground">Track your order status in real-time</p>

        <div className="mt-8 space-y-4">
          {orders.map((order, i) => {
            const config = statusConfig[order.status];
            const Icon = config.icon;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-lg font-bold text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.items.join(', ')}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Placed at {order.time}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${config.bg} ${config.color}`}>
                    <Icon className="h-4 w-4" />
                    {config.label}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display font-bold text-foreground">₹{order.total}</span>
                </div>
                {/* Status Progress */}
                <div className="mt-3 flex gap-1">
                  {['pending', 'confirmed', 'preparing', 'ready'].map((step, idx) => {
                    const stepOrder = ['pending', 'confirmed', 'preparing', 'ready'];
                    const currentIdx = stepOrder.indexOf(order.status);
                    const isActive = idx <= currentIdx;
                    return (
                      <div key={step} className={`h-1.5 flex-1 rounded-full transition-colors ${isActive ? 'bg-primary' : 'bg-muted'}`} />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
