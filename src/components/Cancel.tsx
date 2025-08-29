// src/components/Cancel.tsx
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4">Pago cancelado</h1>
      <p className="mb-6">No se ha procesado tu pago. Puedes intentar de nuevo.</p>
      <Link to="/" className="text-blue-600 underline">
        Volver al inicio
      </Link>
    </div>
  );
}
