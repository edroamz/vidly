export function paginate(items, pageNumber, pageSize) {
  const pageIndex = (pageNumber - 1) * pageSize;
  let itemsPerPage = items.slice(pageIndex);
  itemsPerPage = itemsPerPage.slice(0, pageSize);

  return itemsPerPage;
}
