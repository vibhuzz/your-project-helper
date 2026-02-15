import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Clock, CheckCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

interface KitchenOrder {
  id: string;
  items: { name: string; qty: number }[];
  status: 'new' | 'preparing' | 'ready';
  time: string;
}

const INITIAL_ORDERS: KitchenOrder[] = [
  { id: 'BB-1045', items: [{ name: 'Chicken Biryani', qty: 1 }, { name: 'Cold Coffee', qty: 1 }], status: 'new', time: '12:42 PM' },
  { id: 'BB-1044', items: [{ name: 'Masala Dosa', qty: 2 }], status: 'new', time: '12:40 PM' },
  { id: 'BB-1042', items: [{ name: 'Veg Biryani', qty: 1 }, { name: 'Chai', qty: 1 }], status: 'preparing', time: '12:35 PM' },
  { id: 'BB-1041', items: [{ name: 'Samosa', qty: 4 }, { name: 'Chai', qty: 2 }], status: 'preparing', time: '12:32 PM' },
  { id: 'BB-1039', items: [{ name: 'Samosa', qty: 2 }, { name: 'Cold Coffee', qty: 1 }], status: 'ready', time: '12:20 PM' },
];

const KitchenDashboard = () => {
  const [orders, setOrders] = useState<KitchenOrder[]>(INITIAL_ORDERS);

  const updateStatus = (id: string, newStatus: KitchenOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const columns: { title: string; status: KitchenOrder['status']; icon: React.ElementType; color: string }[] = [
    { title: 'New Orders', status: 'new', icon: Bell, color: 'text-destructive' },
    { title: 'Preparing', status: 'preparing', icon: ChefHat, color: 'text-primary' },
    { title: 'Ready', status: 'ready', icon: CheckCircle, color: 'text-accent' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <ChefHat className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Kitchen Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage incoming orders in real-time</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {columns.map(col => {
            const colOrders = orders.filter(o => o.status === col.status);
            return (
              <div key={col.status} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-4">
                  <col.icon className={`h-5 w-5 ${col.color}`} />
                  <h2 className="font-display text-lg font-semibold text-foreground">{col.title}</h2>
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {colOrders.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {colOrders.map(order => (
                    <motion.div
                      key={order.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-lg border border-border bg-background p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-foreground">{order.id}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {order.time}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {order.items.map((item, i) => (
                          <li key={i} className="text-sm text-foreground">
                            {item.qty}x {item.name}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex gap-2">
                        {col.status === 'new' && (
                          <Button size="sm" variant="hero" className="w-full" onClick={() => updateStatus(order.id, 'preparing')}>
                            Start Preparing
                          </Button>
                        )}
                        {col.status === 'preparing' && (
                          <Button size="sm" variant="accent" className="w-full" onClick={() => updateStatus(order.id, 'ready')}>
                            Mark Ready ✓
                          </Button>
                        )}
                        {col.status === 'ready' && (
                          <span className="w-full text-center text-sm font-medium text-accent">
                            Waiting for pickup
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {colOrders.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">No orders</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;
