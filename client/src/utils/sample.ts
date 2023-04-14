export default class ConvertUtils {
  static unixtimestamp2Yyyymm(unixtimestamp: string): string {
    const date = new Date(unixtimestamp);
    const yyyyMm = date.getFullYear() + "/" + (date.getMonth() + 1);
    return yyyyMm;
  }
  static generateSpecificYyyymm(index: number): string {
    const currentDate = new Date();
    const month = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - index,
      1
    );
    const yyyyMm = month.getFullYear() + "-" + (month.getMonth() + 1);
    return yyyyMm;
  }
  static array2FilteredArray(baseArr: any, currentPeriod: string) {
    const newArr = baseArr.filter((el: any) => {
      const createdAt = el.createdat;
      const yyyymm = this.unixtimestamp2Yyyymm(createdAt);
      return yyyymm === currentPeriod;
    });
  }
  static getStartPeriod(dateParam: string | null) {
    const d = new Date(dateParam + "-1");
    return d.getTime();
  }
  static getEndPeriod(dateParam: string | null) {
    const d = new Date(dateParam + "-1");
    const tmpEnd: Date | number = new Date(
      d.getFullYear(),
      d.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    return tmpEnd.getTime();
  }
}
