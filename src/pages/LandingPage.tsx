import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Smartphone, Zap, ShieldCheck, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-food.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const features = [
  { icon: Smartphone, title: 'Order from Class', desc: 'Browse the menu and place orders right from your phone during lectures.' },
  { icon: Zap, title: 'Fast-Track Pickup', desc: 'Skip the queue. Your food is ready when you arrive at the counter.' },
  { icon: Clock, title: 'Live Tracking', desc: 'Track your order status in real-time — Pending → Preparing → Ready!' },
  { icon: ShieldCheck, title: 'Digital Payments', desc: 'No cash hassle. Pay securely via UPI, cards, or campus wallet.' },
];

const steps = [
  { num: '01', title: 'Browse Menu', desc: 'Explore today\'s menu with prices, prep time, and availability.' },
  { num: '02', title: 'Add to Cart', desc: 'Pick your favorites and customize your order.' },
  { num: '03', title: 'Pay & Confirm', desc: 'Checkout with digital payment. Get instant confirmation.' },
  { num: '04', title: 'Pick Up', desc: 'Head to the Fast-Track Counter when notified. No queue!' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
        <div className="container mx-auto grid gap-8 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <motion.div className="flex flex-col justify-center" variants={stagger} initial="initial" animate="animate">
            <motion.div {...fadeUp} className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
              Now live on campus
            </motion.div>
            <motion.h1 {...fadeUp} className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Skip the Queue,<br />
              <span className="text-primary">Grab Your Bite.</span>
            </motion.h1>
            <motion.p {...fadeUp} className="mt-4 max-w-md text-lg text-muted-foreground">
              ByteBite lets you pre-order meals from your campus canteen, pay digitally, and pick up without waiting. Built for students, by a student.
            </motion.p>
            <motion.div {...fadeUp} className="mt-8 flex gap-3">
              <Link to="/menu">
                <Button variant="hero" size="xl">
                  Order Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/kitchen">
                <Button variant="hero-outline" size="xl">
                  Kitchen View
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img src={heroImage} alt="Delicious canteen food" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-lg" style={{ boxShadow: 'var(--card-shadow)' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Clock className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Avg. Wait Time</p>
                  <p className="text-2xl font-bold text-primary">3 min</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 {...fadeUp} className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Why <span className="text-primary">ByteBite</span>?
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-3 max-w-lg text-muted-foreground">
            No more wasting 20-30 minutes of your 45-minute break standing in line.
          </motion.p>
        </motion.div>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              style={{ '--tw-shadow': 'var(--card-shadow-hover)' } as React.CSSProperties}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <motion.h2 initial="initial" whileInView="animate" viewport={{ once: true }} {...fadeUp} className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
            How It Works
          </motion.h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((s) => (
              <motion.div key={s.num} {...fadeUp} className="text-center">
                <span className="font-display text-5xl font-bold text-primary/20">{s.num}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
          <motion.h2 {...fadeUp} className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Ready to skip the queue?
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-3 max-w-md text-muted-foreground">
            Join hundreds of students already using ByteBite for a faster, smarter lunch break.
          </motion.p>
          <motion.div {...fadeUp} className="mt-8">
            <Link to="/menu">
              <Button variant="hero" size="xl">
                Start Ordering <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-4 w-4 text-primary" />
            <span className="font-display font-semibold text-foreground">ByteBite</span>
          </div>
          <p>Smart Canteen & Event Catering System — A CS Student Project</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
