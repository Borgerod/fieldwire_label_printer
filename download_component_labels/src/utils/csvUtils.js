export const convertToCSV = (data, fields) => {
  const selectedFields = Object.keys(fields).filter(field => fields[field]);
  const header = "component_label";
  const rows = data.map(device => {
    return selectedFields.map(field => device[field]).join(' - ');
  });
  return [header, ...rows].join('\n');
};

export const saveCSV = (devicesData, fields) => {
  try {
    const csvData = convertToCSV(devicesData, fields);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error saving CSV:", error);
  }
};
