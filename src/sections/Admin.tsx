// src/sections/Admin.tsx
import { useEffect, useState, useMemo } from 'react';
import axios from '../axiosConfig.ts';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Package2, RefreshCcw, Trash2 } from 'lucide-react';

export default function Admin() {
  type Reservation = {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    customerEmail: string;
    serviceId?: { title?: string; price?: number };
    slotId?: { start?: string };
    status: string;
    meetingLink?: string;
  };

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [slots, setSlots] = useState<{ _id: string; start: string; status: string }[]>([]);
  const [newSlot, setNewSlot] = useState({ start: '', end: '' });

  // Paginación y orden
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const ITEMS_PER_PAGE = 10;

  // Fetch data
  const fetchReservations = () => {
    axios.get('/api/admin/reservations')
      .then(res => setReservations(res.data))
      .catch(err => console.error('Error fetching reservations:', err));
  };

  const fetchSlots = () => {
    axios.get('/api/admin/slots')
      .then(res => setSlots(res.data))
      .catch(err => console.error('Error fetching slots:', err));
  };

  useEffect(() => {
    fetchReservations();
    fetchSlots();
  }, []);

  // Métricas
  const paidReservations = useMemo(
    () => reservations.filter(r => r.status === 'paid'),
    [reservations]
  );
  const totalSales = paidReservations.length;
  const totalRevenue = paidReservations.reduce(
    (sum, r) => sum + (r.serviceId?.price || 0),
    0
  );

  // Ordenar correctamente según fecha ISO
  const sortedReservations = useMemo(() => {
    return [...reservations].sort((a, b) => {
      const dateA = Date.parse(a.slotId?.start || '');
      const dateB = Date.parse(b.slotId?.start || '');
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [reservations, sortOrder]);

  // Paginación global: aplicar en sorted
  const paginatedReservations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedReservations.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedReservations, currentPage]);

  const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);

  // Handlers slots
  const handleCreate = async () => {
    if (!newSlot.start) return alert('Debes completar la fecha y hora de inicio.');
    try {
      const res = await axios.post('/api/admin/slots', newSlot);
      setSlots(prev => [...prev, res.data]);
      setNewSlot({ start: '', end: '' });
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error creando slot.');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const res = await axios.put(`/api/admin/slots/${id}`, { status: currentStatus === 'free' ? 'booked' : 'free' });
      setSlots(prev => prev.map(s => s._id === id ? res.data : s));
    } catch {
      alert('No se pudo actualizar el slot.');
    }
  };

  const handleDeleteSlot = async (id: string) => {
    if (!confirm('¿Eliminar este slot?')) return;
    try {
      await axios.delete(`/api/admin/slots/${id}`);
      fetchSlots();
    } catch {
      alert('No se pudo eliminar el slot.');
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (!confirm('¿Eliminar esta reserva?')) return;
    try {
      const res = // Asegurate que tu backend exponga esta ruta, o ajusta según definición:
      await axios.delete(`/api/admin/reservation/${id}`);
      // Si el backend devuelve algún mensaje de error o status != 200, lanzar
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      // Refrescar datos y llevar a primera página
      fetchReservations();
      setCurrentPage(1);
    } catch (err: any) {
      console.error('Error eliminando reserva:', err.response || err);
      const msg = err.response?.data?.error || err.message || 'Error eliminando la reserva.';
      alert(msg);
    }
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      booked: 'destructive', free: 'default', Activo: 'default', Inactivo: 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white z-10 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Package2 className="h-6 w-6" />
          <span className="font-semibold">Panel Admin</span>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 md:p-6">
        {/* Métricas */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Totales</CardTitle>
              <CardDescription>Cantidad de reservas pagadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSales}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ingresos</CardTitle>
              <CardDescription>Total facturado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRevenue}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reservas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reservas">Reservas</TabsTrigger>
            <TabsTrigger value="slots">Slots</TabsTrigger>
          </TabsList>

          <TabsContent value="reservas" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <CardTitle>Reservas</CardTitle>
                    <CardDescription>Listado de reservas realizadas</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="sortOrder" className="text-sm">Orden:</label>
                    <select
                      id="sortOrder"
                      value={sortOrder}
                      onChange={e => { setSortOrder(e.target.value as 'asc' | 'desc'); setCurrentPage(1); }}
                      className="border rounded p-1 text-sm"
                    >
                      <option value="asc">Fecha ↑</option>
                      <option value="desc">Fecha ↓</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Celular</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Meet</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedReservations.map(r => (
                      <TableRow key={r._id}>
                        <TableCell>{`${r.firstName || ''} ${r.lastName || ''}`.trim()}</TableCell>
                        <TableCell>{r.phone || '—'}</TableCell>
                        <TableCell>{r.customerEmail}</TableCell>
                        <TableCell>{r.serviceId?.title || '—'}</TableCell>
                        <TableCell>{r.slotId?.start ? new Date(r.slotId.start).toLocaleString() : '—'}</TableCell>
                        <TableCell>{statusBadge(r.status)}</TableCell>
                        <TableCell>
                          {r.meetingLink
                            ? <a href={r.meetingLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">Unirse</a>
                            : '—'}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteReservation(r._id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Paginación */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  >Anterior</Button>
                  <span className="self-center text-sm">{currentPage} / {totalPages}</span>
                  <Button
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  >Siguiente</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slots" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crear nuevo slot</CardTitle>
                <CardDescription>Agregá una nueva hora disponible</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="datetime-local"
                  value={newSlot.start}
                  onChange={(e) => setNewSlot(ns => ({ ...ns, start: e.target.value }))}
                />
                <Button onClick={handleCreate}>Crear Slot</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Listado de Slots</CardTitle>
                <CardDescription>Slots disponibles o reservados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {slots.map(s => (
                      <TableRow key={s._id}>
                        <TableCell>{new Date(s.start).toLocaleString()}</TableCell>
                        <TableCell>{statusBadge(s.status)}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(s._id, s.status)}>
                            <RefreshCcw className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteSlot(s._id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
