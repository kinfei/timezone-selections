import * as moment from "moment-timezone";

export function getTimezonesNames() {
  const arr = [];

  const names = moment.tz.names();

  for (const name of names) {
    if ((name.indexOf("/") < 0 && name !== "UTC") || name.startsWith("Etc/")) {
      continue;
    }

    const data = {
      value: name,
      displayName: moment.tz(name).format("Z"),
    };

    arr.push(data);
  }

  arr.sort((a, b) => {
    if (a.displayName === b.displayName) {
      if (a.value === "UTC") return -1;

      return a.value === b.value ? 0 : a.value > b.value ? 1 : -1;
    }

    const afc = a.displayName.charAt(0);

    const bfc = b.displayName.charAt(0);

    if (afc === "-") {
      if (bfc === "+") return -1;

      return a.displayName > b.displayName ? -1 : 1;
    }

    if (bfc === "-") return 1;
    return a.displayName > b.displayName ? 1 : -1;
  });

  arr.forEach((a) => (a.displayName = `(GMT ${a.displayName}) ${a.value}`));

  return arr;
}
