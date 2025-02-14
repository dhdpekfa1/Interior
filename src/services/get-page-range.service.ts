// 페이지 범위 계산
export const getPageRange = (
  showPages: number,
  currentPage: number,
  totalPages: number
) => {
  const halfShow = Math.floor(showPages / 2);

  let start = Math.max(1, currentPage - halfShow);
  const end = Math.min(totalPages, start + showPages - 1);

  if (end - start + 1 < showPages) {
    start = Math.max(1, end - showPages + 1);
  }

  return { start, end };
};
