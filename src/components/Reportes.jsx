import {useState, useEffect, useRef } from "react";
import { getReportes } from "../api/axiosInstance";
import { useDownloadExcel } from "react-export-table-to-excel";
import { generarReporte } from "../api/axiosInstance";

function Reportes() {
  const [fecha, setFecha] = useState("");
  const [empleado, setEmpleado] = useState("");
  const [ultimoReporte, setUltimoReporte] = useState([])
  const [tipoReporte, setTipoReporte] = useState("");
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    filename: "employee-report",
    sheet: "employee",
    currentTableRef: tableRef.current,
  });

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const data = await generarReporte();
        setUltimoReporte(data);
        setFecha(data[0].fecha)
      } catch (error) {
        console.error("Error generando reporte:", error);
      }
    };

    fetchReporte();
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
          placeholder=""
        />
        <select
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Seleccionar empleado</option>
          {ultimoReporte.map((reporte, index) => (
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
          {ultimoReporte.map((reporte, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{reporte.nombre}</td>
                <td className="px-4 py-2 border">{reporte.empleado_id}</td>
                <td className="px-4 py-2 border">{reporte.fecha}</td>
                <td className="px-4 py-2 border">{reporte.hora_entrada}</td>
                <td className="px-4 py-2 border">{reporte.hora_salida}</td>
                <td className="px-4 py-2 border">
                  <div>
                    <strong>Entrada:</strong> {reporte.emocion_entrada}
                  </div>
                  <div>
                    <strong>Salida:</strong> {reporte.emocion_salida}
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div>
                    <strong>Entrada:</strong> {reporte.comentarios_entrada}
                  </div>
                  <div>
                    <strong>Salida:</strong> {reporte.comentarios_salida}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reportes;