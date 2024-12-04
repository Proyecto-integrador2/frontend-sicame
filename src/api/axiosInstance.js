import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Obtener los reportes de los empleados
export const getReportes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/reportes/`);
    return response.data;
  } catch (error) {
    console.error("Error al intentar obtener los reportes: ", error);
    throw error.response?.data || error.message;
  }
};

// Registrar un empleado
export const registrarEmpleado = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/registro`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Marcar asistencia
export const marcarAsistencia = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/marcar-asistencia`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Marcar salida
export const marcarSalida = async (formData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/marcar-salida`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Actualizar observaciones
export const actualizarObservaciones = async (emocionId, observaciones) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/emocion/${emocionId}/actualizar_observaciones/`,
      { observaciones },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Lista empleados
export const listarEmpleados = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empleados/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};