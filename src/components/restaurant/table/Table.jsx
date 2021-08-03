import { IconButton, Box, Typography } from "@material-ui/core";
import { AddCircle, Edit } from '@material-ui/icons';
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from "../../../constants/itemTypes";

const Table = ({ number, table, setNumber, setShow, setTable, setShowEdit }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TABLE,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const handleShow = (number) => {
        setNumber(number);
        setShow(true);
    }

    const handleEditShow = () => {
        setTable(table);
        setShowEdit(true);
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TABLE,
        drop: (e) => console.log(e),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [])

    return (

        <Box border={1} width={1} flexGrow={1}>
            <div ref={drop}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}>
                {isOver && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                        }}
                    />
                )}
                {table ?
                    <div ref={drag} style={{
                        opacity: isDragging ? 0.5 : 1,
                        fontSize: 25,
                        fontWeight: 'bold',
                        cursor: 'move',
                    }}>
                        <Typography> Table# {number}</Typography>
                        <Typography>Seats: {table.seats}</Typography>
                        <IconButton onClick={handleEditShow}>
                            <Edit color='primary' />
                        </IconButton>
                    </div>

                    : (<div>
                        <Typography>Place # {number}</Typography>
                        <IconButton variant='light' onClick={() => handleShow(number)}>
                            <AddCircle color="primary" />
                        </IconButton>
                    </div>)}
            </div>
        </Box>
    )
}
export default Table;