
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
// CARDS
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardContent } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

type Props = {
    index:number,
    primeraLetra:string,
    job_title:string,
    created_at:string,
    company:string,

}



const Tarjetas = ({index,primeraLetra,job_title,created_at,company}: Props) => {

    const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
        props: ({ expand }) => !expand,
        style: {
            transform: 'rotate(0deg)',
        },
        },
        {
        props: ({ expand }) => !!expand,
        style: {
            transform: 'rotate(180deg)',
        },
        },
    ],
    }));

    return (
        <>
        
            <Card sx={{ maxWidth: 345 }} key={index}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {primeraLetra}
                    </Avatar>
                    }
                    action={
                      <>
                        <IconButton aria-label="settings" >
                            <EditIcon color="primary" onClick = {() =>{console.log('editar')}} />
                        </IconButton>
                        <IconButton aria-label="settings" >
                            <DeleteIcon sx={{ color: red[500] }} onClick = {() =>{console.log('delete')}} />
                        </IconButton>
                      </>
                    }
                    title={job_title}
                    subheader={format(parseISO(created_at), 'dd/MM/yyyy', { locale: es })}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <strong>Compañia o empresa aplicada: </strong>{company}
                    </Typography>
                </CardContent>
            </Card>
        
        </>
    )
}

export default Tarjetas