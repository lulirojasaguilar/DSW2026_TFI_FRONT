const getErrorMessage = (error) => {
  if (!error.response) {
    return 'No se pudo conectar con el servidor. Intente nuevamente.';
  }

  const { status, data } = error.response;

  if (status === 429) {
    return 'Demasiadas solicitudes. Espere un minuto e intente de nuevo.';
  }

  if (status >= 500) {
    return 'Ocurrió un error en el servidor. Intente más tarde.';
  }

  if (data?.errors) {
    return Object.values(data.errors).flat().join(' ');
  }

  const detail = data?.details
    ?.map((item) => item.issue)
    .filter(Boolean)
    .join(', ');
  const message = data?.message || 'No se pudo completar la operación.';

  return detail && !message.includes(detail)
    ? `${message} (${detail})`
    : message;
};

export { getErrorMessage };
