import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getCatalogosDetails, getCatalogosFromIndicador } from '../../../services/cataloguesService';


const CatalogPicker = ({ idCatalog, Catalog, idIndicatorCatalog = 0 }) => {

    const [value, setValue] = useState('');
    const [options, setOptions] = useState([{ id: 0, nombre: 'Seleccione una opción', idCatalogo: 0 }]);
    const [indicatorCatalogues, setIndicatorCatalogues] = useState([{ id: 0, nombre: 'Seleccione una opción', idCatalogo: 0 }]);

    useEffect(() => {
        getCatalogosDetails(idCatalog).
            then(res => {
                setOptions(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [0]);

    useEffect(() => {
        getCatalogosFromIndicador(idIndicatorCatalog)
            // find in array js
            //RHF Provider
            .then(res => {
                res.map(item => {
                    if (item.idCatalogoDetail === idCatalog) {
                        setIndicatorCatalogues(item);
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
    }, [0]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        // 
        <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={option => option.nombre}
            onChange={handleChange}
            style={{ width: '90%' }}
            renderInput={params => (
                <TextField
                    {...params}
                    label={`${Catalog}`}
                    variant="outlined"
                    size='small'
                    fullWidth
                />
            )}
        />
    );
};

export default CatalogPicker;