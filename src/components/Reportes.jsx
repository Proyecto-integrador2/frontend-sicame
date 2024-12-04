import { useState, useEffect, useRef } from "react";
import { getReportes } from "../api/axiosInstance";
import { useDownloadExcel } from "react-export-table-to-excel";

function Reportes() {
  const [fecha, setFecha] = useState("");
  const [empleado, setEmpleado] = useState("");
  const [tipoReporte, setTipoReporte] = useState("");
  const [reportes, setReportes] = useState([]);

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    filename: "employee-report",
    sheet: "employee",
    currentTableRef: tableRef.current,
  });

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await getReportes();
        setReportes(data);
      } catch (error) {
        console.error("Error al listar reportes: ", error);
      }
    };
    fetchReportes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Reportes de Asistencia y Emociones
      </h2>

      {/* Filtros */}
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border px-4 py-2 rounded-lg"
          placeholder="dd/mm/aaaa"
        />
        <select
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Seleccionar empleado</option>
          {reportes.map((reporte, index) => (
            <option key={index} value={reporte.empleado_id}>
              {reporte.nombre}
            </option>
          ))}
        </select>
        <select
          value={tipoReporte}
          onChange={(e) => setTipoReporte(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Seleccionar tipo</option>
          <option value="asistencia">Asistencia</option>
          <option value="emociones">Emociones</option>
        </select>
        <button
          onClick={onDownload}
          className="bg-black text-white py-2 px-4 rounded-lg"
        >
          Exportar
        </button>
      </div>

      {/* Tabla de reportes */}
      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className="table-auto w-full border border-gray-300"
        >
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Entrada</th>
              <th className="px-4 py-2 border">Salida</th>
              <th className="px-4 py-2 border">Emoción</th>
              <th className="px-4 py-2 border">Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{reporte.empleado.nombre}</td>
                <td className="px-4 py-2 border">{reporte.empleado_id}</td>
                <td className="px-4 py-2 border">{reporte.asistencia.fecha}</td>
                <td className="px-4 py-2 border">
                  {reporte.asistencia.hora_entrada}
                </td>
                <td className="px-4 py-2 border">
                  {reporte.asistencia.hora_salida}
                </td>
                <td className="px-4 py-2 border">
                  {reporte.emocion_registrada}
                </td>
                <td className="px-4 py-2 border">{reporte.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reportes;
