export function getDynamicProps<T extends {}, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}
// 首字母小写
export const strFirstLower = (str: string) => str.replace(str[0], str[0].toLowerCase());
