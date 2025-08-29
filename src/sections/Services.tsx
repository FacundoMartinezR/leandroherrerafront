import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/Card';
import Flecha from '../assets/flecha.png';
import AnimatedOnScrollRight from '../components/AnimatedOnScrollRight';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateClickArg as DateClickType } from '@fullcalendar/interaction';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  duration: number;
  badge?: { text: string; backgroundColor: string; textColor: string };
}

interface SlotSummary {
  date: string; // YYYY-MM-DD
  availableCount: number;
}

interface TimeSlot {
  id: string;
  start: string; // ISO date-time
  end: string;   // ISO date-time
}

const services: Service[] = [
  { id: '687c693e9bcf209f376f573b', title: 'Basic', description: '60 minutes of basic mentoring.', features: ['Live Class - 60 min', '14 Day Follow-up', 'Material Extra'], price: 50, duration: 60 },
  { id: '687c68ab9bcf209f376f573a', title: 'Standard', description: '90 minutes of intermediate mentoring.', features: ['Live Class - 90 min', '21 Day Follow-up', 'Material Extra'], price: 75, duration: 90, badge: { text: 'MOST POPULAR', backgroundColor: '#bb0501', textColor: '#fff' } },
  { id: '687bdca7ec552ab3ad90f52b', title: 'Premium', description: '120 minutes of advanced mentoring.', features: ['Live Class - 120 min', '28 Day Follow-up', 'PDF Guide Included'], price: 100, duration: 120 }
];

const Services: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [slotSummaries, setSlotSummaries] = useState<SlotSummary[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);

  const emailRegex = /^\S+@\S+\.\S+$/;
  const isValidEmail = emailRegex.test(userEmail);
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
  if (modalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto';
  };
}, [modalOpen]);

  const openModal = async (service: Service) => {
    
    setSelectedService(service);
    setModalOpen(true);
    setSelectedDate(null);
    setTimeSlots([]);
    setSelectedTimeSlot(null);

    try {
      const res = await axios.get<SlotSummary[]>(`https://leandroherreraback.onrender.com/api/slots/summary`);
      console.log('Resumen de fechas:', res.data);
      setSlotSummaries(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching slots summary', err);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSlotSummaries([]);
    setSelectedDate(null);
    setTimeSlots([]);
    setSelectedTimeSlot(null);
  };

  const getDisplayDate = (ymd: string) => {
  const [year, month, day] = ymd.split('-').map(Number);
  // new Date(year, monthIndex, day) usa tu zona local
  return new Date(year, month - 1, day).toLocaleDateString();
  };

  const handleBooking = async () => {
    if (isBooking) return;
    setIsBooking(true);

    console.log('Intentando reservar con:', {
      serviceId:    selectedService?.id,
      slotId:       selectedTimeSlot,
      customerEmail: userEmail,
      firstName:    firstName,
      lastName:     lastName,
      phone:       phone
    });

    try {
      const { data } = await axios.post('http://localhost:4000/api/reservations', {
        serviceId:    selectedService!.id,
        slotId:       selectedTimeSlot,
        customerEmail: userEmail,
        firstName:    firstName,
        lastName:     lastName,
        phone:       phone
      });
      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error('Error en handleBooking:', err);
      let errorMessage = 'Error procesando la reserva.';
      if ((err as any).response?.data?.error) {
        errorMessage = (err as any).response.data.error;
      }
      alert(errorMessage);
    } finally {
      setIsBooking(false);
    }
  };

  const handleDateClick = async (info: DateClickType) => {
  // Si cambiás de fecha, borrá la hora anterior
  setSelectedTimeSlot(null);
  setTimeSlots([]);
  
  if (!selectedService) return;

  // dateStr ya viene garantizado como "YYYY-MM-DD" por FullCalendar:
  const formattedDate = info.dateStr;
  setSelectedDate(formattedDate);

    try {
      const res = await axios.get<{
        _id:       string;
        start:     string;
        end:       string;
        status:    string;
      }[]>(`http://localhost:4000/api/slots`, {
        params: { date: formattedDate }
      });
      console.log(`Slots para ${formattedDate}:`, res.data);

      const slots: TimeSlot[] = res.data.map(slot => ({
        id:    slot._id,
        start: slot.start,
        end:   slot.end
      }));
      setTimeSlots(slots);
    } catch (err) {
      console.error('Error fetching time slots', err);
    }
  };

  const backgroundEvents = slotSummaries
  .filter(s => s.availableCount > 0 && s.date >= todayStr)
  .map(s => ({
    start:       s.date,      // "YYYY-MM-DD"
    display:     'background',
    backgroundColor: '#13c203ff',
    allDay:      true
  }));

  return (
    <section id="services" className="w-full bg-[url('/background_varios.png')] bg-cover bg-center p-8 pt-20">
      <div className="max-w-5xl mx-auto">
        <AnimatedOnScrollRight offsetX={200} duration={0.8}>
          <div className="flex items-center mb-8">
            <h1 className="font-horizon text-5xl text-white font-extrabold leading-tight">MY<br />SERVICES</h1>
            <img src={Flecha} alt="Flecha indicar servicios" width={50} height={40} className="ml-2" />
            <img src={Flecha} alt="Flecha indicar servicios" width={50} height={40} />
          </div>
        </AnimatedOnScrollRight>
        <div className="mt-12 flex flex-wrap gap-8 justify-center">
          {services.map(svc => (
            <AnimatedOnScrollRight key={svc.id} offsetX={200} duration={0.8}>
              <div className="transform hover:scale-105 transition-shadow shadow-lg">
                <ServiceCard
                  id={svc.id}
                  title={svc.title}
                  description={svc.description}
                  features={svc.features}
                  badge={svc.badge}
                  price={svc.price}
                  duration={svc.duration}
                  actionText={`Book Now — U$S ${svc.price}`}
                  onAction={() => openModal(svc)}
                />
              </div>
            </AnimatedOnScrollRight>
          ))}
        </div>
      </div>

      {modalOpen && (
  <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div
      className="
        bg-white rounded-2xl shadow-xl
        w-full max-w-2xl
        max-h-[90vh]           /* Máximo 90% de la altura de la ventana */
        overflow-y-auto        /* Scroll interno si hace falta */
        p-6 space-y-6          /* Espaciado uniforme entre secciones */
        relative
      "
    >
      {/* Header */}
      <div className="bg-white py-4 flex items-center justify-between border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Reserve: {selectedService?.title}
        </h2>
        <button
          onClick={closeModal}
          className="
            text-gray-500 hover:text-gray-800
            p-2 rounded-full
            transition-colors
          "
        >
          ✕
        </button>
      </div>

      {/* Info del servicio */}
      <div className="space-y-1">
        <p className="text-gray-600">Duration: <span className="font-medium">{selectedService?.duration} min</span></p>
        <p className="text-gray-600">Price: <span className="font-medium">U$S {selectedService?.price}</span></p>
      </div>

      {/* Calendario */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={350}
        timeZone="UTC"
        events={backgroundEvents.map(ev => ({ ...ev, allDay: true }))}
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
        showNonCurrentDates={false}
        dayMaxEventRows={3}
      />

      {/* Selección de hora */}
      {!!selectedDate && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Available hours for {getDisplayDate(selectedDate!)}:
          </h3>
          {timeSlots.length === 0 ? (
            <p className="text-gray-500">No available hours.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {timeSlots.map(ts => {
                const label = new Date(ts.start)
                  .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <button
                    key={ts.id}
                    onClick={() => setSelectedTimeSlot(ts.id)}
                    className={`
                      px-4 py-2 border rounded-full
                      transition
                      ${selectedTimeSlot === ts.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Formulario de datos y confirmación */}
      {!!selectedTimeSlot && (
        <div className="space-y-4 pt-4 border-t">
          <p className="text-gray-700">
            Selected time: <span className="font-medium">
              {new Date(timeSlots.find(ts => ts.id === selectedTimeSlot)!.start)
                .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </p>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Your email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
              {userEmail && !isValidEmail && (
                <p className="text-sm text-red-600 mt-1">
                  Enter a valid email address (e.g., user@gmail.com)
                </p>
              )}
          </div>
          <button
            onClick={handleBooking}
            disabled={!isValidEmail || !selectedTimeSlot || isBooking || !firstName || !lastName || !phone}
            className="
              w-full py-3 font-semibold rounded-lg
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white transition-opacity disabled:opacity-50
            "
          >
            {isBooking ? 'Booking...' : 'Confirm reservation'}
          </button>
        </div>
      )}
    </div>
  </div>
)}

    </section>
  );
};

export default Services;
