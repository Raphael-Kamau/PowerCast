import React from 'react';
import { exportToCSV } from '../utils/exportToCSV';

const ExportButton = ({ data }) => {
    const handleExport = () => {
        exportToCSV(data, 'energy_data.csv');
    };

    return <button onClick={handleExport}>Export to CSV</button>;
};

export default ExportButton;