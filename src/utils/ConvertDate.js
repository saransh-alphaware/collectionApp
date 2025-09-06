export function convertDate(dateString = "") {
  if (dateString === "" || dateString === undefined || dateString === null)
    return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}
