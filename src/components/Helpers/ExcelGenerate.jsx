import React from 'react';
import { Button } from 'react-native';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';

const ExcelGenerator = ({ data, fileName }) => {
  const handleGenerateExcel = async () => {
  //   try {
  //     // Convertir los datos a formato CSV
  //     const csvData = convertToCSV(data);

  //     // Crear un archivo CSV temporal
  //     const csvFilePath = `${FileSystem.documentDirectory}${fileName}.csv`;
  //     await FileSystem.writeAsStringAsync(csvFilePath, csvData, { encoding: FileSystem.EncodingType.UTF8 });

  //     // Convertir el archivo CSV a XLSX
  //     const xlsxFilePath = `${FileSystem.documentDirectory}${fileName}.xlsx`;
  //     await convertCSVToXLSX(csvFilePath, xlsxFilePath);

  //     // Descargar el archivo XLSX
  //     await FileSystem.downloadAsync(xlsxFilePath, `${FileSystem.documentDirectory}${fileName}.xlsx`);

  //     // Eliminar los archivos temporales
  //     await FileSystem.deleteAsync(csvFilePath);
  //     await FileSystem.deleteAsync(xlsxFilePath);
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };

  // const convertToCSV = (data) => {
  //   const header = Object.keys(data[0]).join(',') + '\n';
  //   const rows = data.map((item) => Object.values(item).join(',')).join('\n');
  //   return header + rows;
  // };

  // const convertCSVToXLSX = async (csvFilePath, xlsxFilePath) => {
  //   const fileContent = await FileSystem.readAsStringAsync(csvFilePath);
  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.sheet_add_json(XLSX.utils.json_from_csv(fileContent), { header: 1 });
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //   const excelBuffer = XLSX.write(workbook, { type: 'base64' });
  //   await FileSystem.writeAsStringAsync(xlsxFilePath, excelBuffer, { encoding: FileSystem.EncodingType.Base64 });
  };

  return (
    <Button title="Generar Excel" onPress={handleGenerateExcel} />
  );
};

export default ExcelGenerator;