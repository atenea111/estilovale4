import Link from "next/link"
import { ShoppingBag, User } from "lucide-react"

export default function QuienesSomos() {
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

      {/* About Us Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-8 text-center">Quiénes Somos</h1>

          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Estilo Vale 4"
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-black mb-4">Nuestra Historia</h2>
                <p className="text-gray-700 mb-4">
                  Estilo Vale 4 nació de la pasión por la moda y el deseo de ofrecer productos de calidad a precios
                  accesibles. Desde nuestros inicios, nos hemos comprometido a brindar una experiencia de compra única y
                  personalizada.
                </p>
                <p className="text-gray-700">
                  Fundada en 2020, nuestra tienda ha crecido gracias al apoyo de nuestros clientes y a nuestro
                  compromiso con la excelencia en cada detalle.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">Nuestra Misión</h2>
              <p className="text-gray-700">
                En Estilo Vale 4, nuestra misión es ofrecer productos de moda que permitan a nuestros clientes expresar
                su personalidad y sentirse seguros con su estilo. Nos esforzamos por seleccionar cuidadosamente cada
                artículo, asegurando la mejor calidad y las últimas tendencias.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">Nuestros Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F5D3EF] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-2">Calidad</h3>
                  <p className="text-gray-700">
                    Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad.
                  </p>
                </div>
                <div className="bg-[#F5D3EF] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-2">Atención</h3>
                  <p className="text-gray-700">
                    Brindamos un servicio personalizado y atento a las necesidades de cada cliente.
                  </p>
                </div>
                <div className="bg-[#F5D3EF] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-2">Innovación</h3>
                  <p className="text-gray-700">
                    Nos mantenemos actualizados con las últimas tendencias y novedades del mercado.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Contacto</h2>
              <p className="text-gray-700 mb-4">
                Estamos siempre disponibles para atender tus consultas y ayudarte a encontrar lo que buscas.
              </p>
              <div className="bg-[#F5D3EF] p-6 rounded-lg">
                <p className="text-black mb-2">
                  <strong>WhatsApp:</strong> 3412714029
                </p>
                <p className="text-black mb-2">
                  <strong>Email:</strong> info@estilovale4.com
                </p>
                <p className="text-black">
                  <strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 18:00 hs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
