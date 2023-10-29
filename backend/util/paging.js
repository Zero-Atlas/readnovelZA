exports.paging = (arr, pageNum, itemPerPage) => {
  const maxPage = Math.ceil(arr.length / itemPerPage);
  return {
    result: arr.slice((pageNum - 1) * itemPerPage, itemPerPage),
    maxPage,
  };
};
