import { useState } from 'react';
import { ShoppingCart, X, Menu, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../imports/LOGO_PRINCIPAL.png';

// ============================================
// EDITE AS IMAGENS DOS PRODUTOS AQUI
// ============================================
// Para editar, substitua as URLs das imagens abaixo
// Você pode usar URLs de qualquer imagem hospedada online
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // URL da imagem - EDITE AQUI
  category: 'casual' | 'premium' | 'graphic' | 'limited';
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Camiseta Branca Clássica',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    category: 'casual',
    description: 'Essencial para qualquer torcedor'
  },
  {
    id: 2,
    name: 'Camiseta Preta Premium',
    price: 99.90,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    category: 'casual',
    description: 'Elegância e versatilidade'
  },
  {
    id: 3,
    name: 'Edição Laranja',
    price: 119.90,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    category: 'graphic',
    description: 'Cores vibrantes da nossa marca'
  },
  {
    id: 4,
    name: 'Camiseta Azul Oceano',
    price: 109.90,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
    category: 'premium',
    description: 'Azul característico'
  },
  {
    id: 5,
    name: 'Modelo Esportivo',
    price: 94.90,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    category: 'casual',
    description: 'Performance e estilo'
  },
  {
    id: 6,
    name: 'Edição Especial',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80',
    category: 'limited',
    description: 'Tiragem limitada - colecionável'
  },
  {
    id: 7,
    name: 'Verde Bandeira',
    price: 104.90,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    category: 'premium',
    description: 'Design exclusivo premium'
  },
  {
    id: 8,
    name: 'Cinza Minimal',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    category: 'casual',
    description: 'Simplicidade moderna'
  },
  {
    id: 9,
    name: 'Estampa Artística',
    price: 139.90,
    image: 'https://images.unsplash.com/photo-1503341338985-c4bde0c08c31?w=800&q=80',
    category: 'graphic',
    description: 'Arte que veste sua paixão'
  },
];

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'casual', label: 'Básicas' },
    { id: 'premium', label: 'Premium' },
    { id: 'graphic', label: 'Estampadas' },
    { id: 'limited', label: 'Edição Limitada' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-8">
              <img
                src={logo}
                alt="Entine Bandeiras"
                className="h-12 sm:h-16 w-auto"
              />
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm uppercase tracking-wide hover:text-primary transition-colors">Novidades</a>
                <a href="#" className="text-sm uppercase tracking-wide hover:text-primary transition-colors">Coleções</a>
                <a href="#" className="text-sm uppercase tracking-wide hover:text-primary transition-colors">Sobre</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 hover:bg-muted rounded-lg transition-all ${cartItemsCount > 0 ? 'text-primary' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-primary to-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium shadow-lg animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <nav className="px-4 py-4 space-y-2">
                <a href="#" className="block py-2 text-sm uppercase tracking-wide hover:text-primary transition-colors">Novidades</a>
                <a href="#" className="block py-2 text-sm uppercase tracking-wide hover:text-primary transition-colors">Coleções</a>
                <a href="#" className="block py-2 text-sm uppercase tracking-wide hover:text-primary transition-colors">Sobre</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full mb-6">
                <span className="text-sm uppercase tracking-wide text-primary font-medium">Nova Coleção 2026</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Vista seu <br /><span className="text-primary">Time</span></h2>
              <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-lg">Camisetas de qualidade premium com designs exclusivos do seu time. Expresse sua paixão pelo futebol.</p>
              <button className="group bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-secondary text-primary-foreground px-8 py-4 rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                Ver Coleção
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
                  alt="Camisetas Premium"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">{products.length}+</div>
                <div className="text-sm uppercase tracking-wide">Modelos</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-secondary text-secondary-foreground p-4 rounded-xl shadow-xl">
                <div className="text-xl font-bold">100%</div>
                <div className="text-xs uppercase tracking-wide">Qualidade</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-foreground px-6 py-3 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white whitespace-nowrap shadow-lg"
                  >
                    Adicionar ao Carrinho
                  </motion.button>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <span className="text-primary font-bold whitespace-nowrap">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold">Carrinho</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 bg-background p-4 rounded-lg"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <p className="text-sm text-primary font-bold mt-1">
                            R$ {item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-muted hover:bg-muted/80 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-muted hover:bg-muted/80 flex items-center justify-center"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-destructive text-sm hover:underline"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-border p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-lg font-medium hover:shadow-xl transition-all shadow-lg">
                    Finalizar Compra
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-foreground text-background mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img
                src={logo}
                alt="Entine Bandeiras"
                className="h-16 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-background/70 text-sm">
                Vista suas cores com orgulho. Qualidade premium em cada peça.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Camisetas</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Bandeiras</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Acessórios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ajuda</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Entregas</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Trocas</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/70">
            <p>© 2026 Entine Bandeiras. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
