export const argbToRgba = (argb: string) => {
  const alpha = parseInt(argb.slice(2, 4), 16) / 255;
  const red = parseInt(argb.slice(4, 6), 16);
  const green = parseInt(argb.slice(6, 8), 16);
  const blue = parseInt(argb.slice(8, 10), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export const tagToColor = (tag: string): string => {
  const colorMap: { [key: string]: string } = {
    c0: "#424242", // #616161
    c1: "#e1e1e1",
    c2: "#fe8067",
    c3: "#9bee2e",
    c4: "#2865cf",
    c5: "#61def2",
    c6: "#f971f9",
    c7: "#ffd255",
    c8: "#d16eff",
    c9: "#fd6a72",
  };
  return colorMap[tag] || "#000";
};

export const parseClubName = (clubName: string) => {
  const match = clubName.match(/<c(\d+)>(.*?)<\/c>/);
  if (match) {
    const tag = `c${match[1]}`;
    const name = match[2];
    const color = tagToColor(tag);
    return { name, color };
  }
  return { name: clubName, color: "black" };
};
