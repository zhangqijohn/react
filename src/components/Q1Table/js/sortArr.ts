export function getPriority(a:any) {
  return !a.fixed && a.fixed !== true ? 1 : (a.fixed === 'right' ? 2 : 0)
}
// 固定项重新排序
export function sortArr(arr:any) {
  return arr.sort((a:any, b:any) => {
    const priorityA = getPriority(a)
    const priorityB = getPriority(b)
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    if (a.sortIndex === undefined && b.sortIndex === undefined) {
      return 0;
    }
    const sortA = a.sortIndex === undefined ? Infinity : a.sortIndex;
    const sortB = b.sortIndex === undefined ? Infinity : b.sortIndex;
    return sortA > sortB ? 1 : (sortA === sortB ? 0 : -1);
  })
}
