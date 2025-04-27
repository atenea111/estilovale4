import { Suspense } from "react"
import Link from "next/link"
import { ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5D3EF]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#F5D3EF] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-black">
            Estilo Vale 4
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-black hover:text-gray-700 font-medium">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-black hover:text-gray-700 font-medium">
              Catálogo
            </Link>
            <Link href="/quienes-somos" className="text-black hover:text-gray-700 font-medium">
              Quiénes Somos
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/carrito" className="relative">
              <ShoppingBag className="h-6 w-6 text-black" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/admin-login" className="text-black hover:text-gray-700">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-[#F5D3EF]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Descubre tu estilo en Estilo Vale 4</h1>
            <p className="text-lg text-gray-800 mb-8">
              Encuentra las últimas tendencias y los mejores productos para expresar tu personalidad.
            </p>
            <Link href="/catalogo">
              <Button className="bg-black text-white hover:bg-gray-800">Ver Catálogo</Button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 bg-white rounded-full shadow-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/placeholder.svg?height=320&width=320" alt="Estilo Vale 4" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Categorías Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Suspense fallback={<div>Cargando...</div>}>
              <CategoryCard
                title="Ropa"
                image="/placeholder.svg?height=200&width=300"
                link="/catalogo?categoria=ropa"
              />
              <CategoryCard
                title="Accesorios"
                image="/placeholder.svg?height=200&width=300"
                link="/catalogo?categoria=accesorios"
              />
              <CategoryCard
                title="Calzado"
                image="/placeholder.svg?height=200&width=300"
                link="/catalogo?categoria=calzado"
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#F5D3EF]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Suspense fallback={<div>Cargando productos...</div>}>
              <ProductCard name="Vestido Floral" price={4500} image="/placeholder.svg?height=300&width=300" id="1" />
              <ProductCard name="Blusa Elegante" price={3200} image="/placeholder.svg?height=300&width=300" id="2" />
              <ProductCard name="Pantalón Casual" price={5100} image="/placeholder.svg?height=300&width=300" id="3" />
              <ProductCard name="Zapatos de Tacón" price={6800} image="/placeholder.svg?height=300&width=300" id="4" />
            </Suspense>
          </div>
          <div className="text-center mt-10">
            <Link href="/catalogo">
              <Button className="bg-black text-white hover:bg-gray-800">Ver Todos los Productos</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Estilo Vale 4</h3>
              <p className="text-gray-300">Tu tienda de moda favorita con los mejores productos y precios.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/catalogo" className="text-gray-300 hover:text-white">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link href="/quienes-somos" className="text-gray-300 hover:text-white">
                    Quiénes Somos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p className="text-gray-300">WhatsApp: 3412714029</p>
              <p className="text-gray-300 mt-2">Email: info@estilovale4.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Estilo Vale 4. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CategoryCard({ title, image, link }: { title: string; image: string; link: string }) {
  return (
    <Link href={link}>
      <Card className="overflow-hidden transition-transform hover:scale-105">
        <div className="h-48 overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
        <CardContent className="p-4 bg-white">
          <h3 className="text-xl font-semibold text-center text-black">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}

function ProductCard({ name, price, image, id }: { name: string; price: number; image: string; id: string }) {
  return (
    <Link href={`/producto/${id}`}>
      <Card className="overflow-hidden transition-transform hover:scale-105">
        <div className="h-64 overflow-hidden bg-white p-4">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-contain" />
        </div>
        <CardContent className="p-4 bg-white">
          <h3 className="text-lg font-semibold text-black mb-2">{name}</h3>
          <p className="text-black font-bold">${price.toLocaleString("es-AR")}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
