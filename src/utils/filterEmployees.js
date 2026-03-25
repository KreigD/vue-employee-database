/**
 * Filter employees by substring match on first+last name (no space), case-insensitive.
 * Matches legacy behavior: queries shorter than 2 characters return the full list.
 * @param {Array<Record<string, unknown>>} employees
 * @param {string} query
 * @returns {Array<Record<string, unknown>>}
 */
export function filterEmployeesByName(employees, query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) {
    return employees;
  }
  return employees.filter((employee) => {
    const fullName =
      `${employee.name.first}${employee.name.last}`.toLowerCase();
    return fullName.includes(q);
  });
}
