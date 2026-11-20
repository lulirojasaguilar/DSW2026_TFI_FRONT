import Spinner from '../atoms/Spinner';
import Pagination from '../molecules/Pagination';

/**
 * Tabla genérica con paginación incluida. Reemplaza todas las tablas de la app.
 *
 * columns: [{ key, header, render?(row), className?, align? }]
 *   - render opcional; si falta se muestra row[key]
 *   - align: 'right' para la columna Acciones
 * El administrador es solo de escritorio (no es responsive): siempre se muestra como tabla.
 *
 * pagination (opcional): { pageIndex, pageSize, total, onChange, noun, numbered }
 * onRowClick / selectedId (opcionales): permiten seleccionar la fila completa.
 */
export default function Table({
  columns,
  rows,
  rowKey = 'id',
  loading = false,
  emptyMessage = 'No hay registros para mostrar.',
  pagination,
  onRowClick,
  selectedId,
}) {
  const cell = (column, row) =>
    column.render ? column.render(row) : row[column.key];
  const alignClass = (column) => (column.align === 'right' ? 'text-right' : '');
  const clickable = onRowClick ? 'cursor-pointer hover:bg-brand-50' : '';
  const selected = (row) =>
    selectedId !== undefined && row[rowKey] === selectedId
      ? 'bg-brand-100'
      : 'bg-white';

  if (loading && rows.length === 0) return <Spinner />;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-table-head text-[11px] font-bold uppercase tracking-wide text-muted">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-3 ${alignClass(column)}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-8 text-center text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr
                key={row[rowKey]}
                onClick={onRowClick && (() => onRowClick(row))}
                className={`${selected(row)} ${clickable}`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-3.5 ${column.className ?? ''} ${alignClass(column)}`}
                  >
                    {cell(column, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && <Pagination {...pagination} />}
    </div>
  );
}
