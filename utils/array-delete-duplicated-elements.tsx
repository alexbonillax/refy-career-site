export const arrayDeleteDuplicatedElements = (value: string, index: number, self: string[]): boolean => {
    return self.indexOf(value) === index;
  }