export default class ConvertUtils {
  static unixtimestamp2Yyyymm(unixtimestamp: string): string {
    const date = new Date(unixtimestamp);
    const yyyyMm = date.getFullYear() + "/" + (date.getMonth() + 1);
    return yyyyMm;
  }
}
