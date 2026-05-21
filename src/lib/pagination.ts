
export function paginate(items = [], page = 1, limit = 10) {
  const start = (page - 1) * limit;

  return {
    items: items.slice(start, start + limit),
    page,
    totalPages: Math.ceil(items.length / limit)
  };
}
