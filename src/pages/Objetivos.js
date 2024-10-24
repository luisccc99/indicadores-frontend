import { Box, Button, Card, CardContent, CardMedia, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getObjetivosGeneralInfo } from '../services/dimensionService';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from '../components/dashboard/common/FormDialog';
import { FormDimension } from '../components/dashboard/forms/dimension/FormDimension';



const Objetivos = () => {
  const [objetivos, setObjetivos] = useState([])
  const getObjetivos = () => {
    getObjetivosGeneralInfo({})
      .then(({ data }) => {
        setObjetivos(data.data)
      })
  }

  useEffect(() => {
    getObjetivos()
  }, [])

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'start',
      alignItems: 'start',
      justifyContent: 'start',
    }}>
      {
        objetivos.map(({ indicadoresCount, objetivo }) => (
          <Cardie
            key={objetivo.id}
            count={indicadoresCount}
            {...objetivo}
          />
          // <Cardie
          //   key={objetivos.objetivos.id}
          //   id={objetivos.objetivos.id}
          //   titulo={objetivos.objetivos.titulo}
          //   descripcion={objetivos.objetivos.descripcion}
          //   color={objetivos.objetivos.color}
          //   urlImagen={objetivos.objetivos.urlImagen}
          //   count={objetivos.indicadoresCount}
          // />
        ))
      }



    </Box>
  )
};

const Cardie = (objetivo) => {

  const {
    titulo,
    descripcion,
    summary,
    color,
    urlImagen,
    count
  } = objetivo

  const [openModal, setOpenModal] = useState(false);
  const [selectedObjetivo, setSelectedObjetivo] = useState(null);

  const handleCloseModal = async () => {
    setOpenModal(false)
    setSelectedObjetivo(null)
  };

  const handleEdit = () => {
    setOpenModal(true)
    setSelectedObjetivo(objetivo)
  }


  return (
    <Box sx={{
      minHeight: 200,
      display: 'flex',
      flexDirection: 'row',
      m: 1,
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      borderRadius: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.58)',
      position: 'relative'
    }}>
      <Box
        component={'img'}
        sx={{
          minHeight: 250,
          maxHeight: 250,
          minWidth: 400,
          maxWidth: 400,
        }}
        alt={titulo}
        src={urlImagen}
      />

      {/* <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: 'black',
          borderRadius: 1,
        }}
        onClick={() => {
          handleEdit()
        }}
      >
        <EditIcon />
      </IconButton> */}

      <Box sx={{ p: 1 }}>
        <Typography variant="h5" component="div" sx={{
          mr: 3
        }}>
          {titulo}
        </Typography>
        <Typography variant="h6" >
          {summary}
        </Typography>

        <Typography variant="body2" >
          {descripcion}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: color,
          color: 'white',
          padding: 1,
          borderTopLeftRadius: 5,

        }}
      >
        <b>Indicadores bajo este objetivo:</b> {count}
      </Box>

      <FormDialog
        open={openModal}
        handleClose={handleCloseModal}
      >
        <DialogTitle>Editar dimensión</DialogTitle>
        <FormDimension
          selectedObjetivo={selectedObjetivo}
          handleCloseModal={handleCloseModal}
          action='edit' />
      </FormDialog>
    </Box>
  )
};

export default Objetivos