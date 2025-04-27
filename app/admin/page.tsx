"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Home, LogOut, Package, PlusCircle, Settings, ShoppingBag, Tag, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { initializeFirebase } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

interface AdminAuth {
  isAdmin: boolean
  email: string
}

interface SalesData {
  month: string
  sales: number
  revenue: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [adminAuth, setAdminAuth] = useState<AdminAuth | null>(null)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalCategories, setTotalCategories] = useState(0)

  useEffect(() => {
    // Check if user is authenticated as admin
    const checkAuth = () => {
      const auth = localStorage.getItem("adminAuth")
      if (!auth) {
        router.push("/admin-login")
        return
      }

      try {
        const parsedAuth = JSON.parse(auth) as AdminAuth
        if (!parsedAuth.isAdmin) {
          router.push("/admin-login")
          return
        }

        setAdminAuth(parsedAuth)
      } catch (error) {
        console.error("Error parsing auth data:", error)
        router.push("/admin-login")
        return
      }
    }

    checkAuth()

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const { db } = await initializeFirebase()

        // Fetch products count
        const productsCollection = collection(db, "productos")
        const productsSnapshot = await getDocs(productsCollection)
        setTotalProducts(productsSnapshot.docs.length)

        // Fetch categories count
        const categoriesCollection = collection(db, "categorias")
        const categoriesSnapshot = await getDocs(categoriesCollection)
        setTotalCategories(categoriesSnapshot.docs.length)

        // Generate mock sales data (in a real app, this would come from a database)
        const mockSalesData: SalesData[] = [
          { month: "Enero", sales: 45, revenue: 125000 },
          { month: "Febrero", sales: 52, revenue: 145000 },
          { month: "Marzo", sales: 61, revenue: 168000 },
          { month: "Abril", sales: 48, revenue: 132000 },
          { month: "Mayo", sales: 55, revenue: 152000 },
          { month: "Junio", sales: 67, revenue: 185000 },
          { month: "Julio", sales: 72, revenue: 198000 },
          { month: "Agosto", sales: 58, revenue: 160000 },
          { month: "Septiembre", sales: 63, revenue: 174000 },
          { month: "Octubre", sales: 70, revenue: 193000 },
          { month: "Noviembre", sales: 85, revenue: 234000 },
          { month: "Diciembre", sales: 92, revenue: 253000 },
        ]

        setSalesData(mockSalesData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin-login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5D3EF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-black font-medium">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#F5D3EF] flex">
        {/* Sidebar */}
        <Sidebar className="bg-white border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-[#F5D3EF] mr-2" />
              <h1 className="text-xl font-bold">Estilo Vale 4</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Panel de Administración</p>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("dashboard")}
                  isActive={activeSection === "dashboard"}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveSection("products")} isActive={activeSection === "products"}>
                  <Package className="h-5 w-5" />
                  <span>Productos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("categories")}
                  isActive={activeSection === "categories"}
                >
                  <Tag className="h-5 w-5" />
                  <span>Categorías</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveSection("orders")} isActive={activeSection === "orders"}>
                  <ShoppingBag className="h-5 w-5" />
                  <span>Pedidos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("customers")}
                  isActive={activeSection === "customers"}
                >
                  <Users className="h-5 w-5" />
                  <span>Clientes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveSection("settings")} isActive={activeSection === "settings"}>
                  <Settings className="h-5 w-5" />
                  <span>Configuración</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push("/")}>
                  <Home className="h-5 w-5" />
                  <span>Ver Tienda</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{adminAuth?.email}</p>
                <p className="text-sm text-gray-500">Administrador</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Cerrar sesión">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-bold">
                {activeSection === "dashboard" && "Dashboard"}
                {activeSection === "products" && "Gestión de Productos"}
                {activeSection === "categories" && "Gestión de Categorías"}
                {activeSection === "orders" && "Gestión de Pedidos"}
                {activeSection === "customers" && "Gestión de Clientes"}
                {activeSection === "settings" && "Configuración"}
              </h1>
            </div>
            <div>
              <Button variant="outline" onClick={handleLogout} className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </header>

          <main className="p-6">
            {activeSection === "dashboard" && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total de Ventas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{salesData.reduce((acc, curr) => acc + curr.sales, 0)}</div>
                      <p className="text-xs text-gray-500">Ventas realizadas en el último año</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Ingresos Totales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ${salesData.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString("es-AR")}
                      </div>
                      <p className="text-xs text-gray-500">Ingresos generados en el último año</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total de Productos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalProducts}</div>
                      <p className="text-xs text-gray-500">Productos disponibles en la tienda</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total de Categorías</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalCategories}</div>
                      <p className="text-xs text-gray-500">Categorías disponibles en la tienda</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Sales Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ventas Mensuales</CardTitle>
                    <CardDescription>Resumen de ventas e ingresos por mes durante el último año</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <SalesChart data={salesData} />
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pedidos Recientes</CardTitle>
                    <CardDescription>Los últimos pedidos realizados en la tienda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fecha
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Estado
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#1001</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">María López</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25/04/2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$12,500</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Completado
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#1002</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Juan Pérez</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">24/04/2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$8,750</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pendiente
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#1003</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ana García</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">23/04/2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15,200</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Completado
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "products" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Gestión de Productos</h2>
                  <Button className="bg-black text-white hover:bg-gray-800">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nuevo Producto
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Imagen
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Precio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Categorías
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                <img
                                  src="/placeholder.svg?height=40&width=40"
                                  alt="Producto"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Vestido Floral
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$4,500</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                En stock
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ropa, Vestidos</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                <img
                                  src="/placeholder.svg?height=40&width=40"
                                  alt="Producto"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Blusa Elegante
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3,200</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                En stock
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ropa, Blusas</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "categories" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Gestión de Categorías</h2>
                  <Button className="bg-black text-white hover:bg-gray-800">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nueva Categoría
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Productos
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ropa</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">24 productos</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Accesorios
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18 productos</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Calzado</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 productos</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection !== "dashboard" && activeSection !== "products" && activeSection !== "categories" && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h2 className="text-2xl font-bold mb-4">Sección en desarrollo</h2>
                  <p className="text-gray-600 mb-6">
                    Esta sección está actualmente en desarrollo y estará disponible próximamente.
                  </p>
                  <Button
                    onClick={() => setActiveSection("dashboard")}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    Volver al Dashboard
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function SalesChart({ data }: { data: SalesData[] }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex">
        <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>250k</span>
          <span>200k</span>
          <span>150k</span>
          <span>100k</span>
          <span>50k</span>
          <span>0</span>
        </div>
        <div className="flex-1 flex items-end">
          {data.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex justify-center space-x-1">
                <div
                  className="w-5 bg-[#F5D3EF] rounded-t-sm"
                  style={{ height: `${(month.revenue / 250000) * 100}%` }}
                  title={`$${month.revenue.toLocaleString("es-AR")}`}
                ></div>
                <div
                  className="w-5 bg-black rounded-t-sm"
                  style={{ height: `${(month.sales / 100) * 30}%` }}
                  title={`${month.sales} ventas`}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1">{month.month.substring(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#F5D3EF] rounded-sm mr-2"></div>
          <span className="text-sm">Ingresos (ARS)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-black rounded-sm mr-2"></div>
          <span className="text-sm">Ventas</span>
        </div>
      </div>
    </div>
  )
}
