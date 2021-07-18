import "./Restaurant.css";
import Table from './table/Table';
import { Grid, Box } from "@material-ui/core";

const RestaurantEditor = () => {
    let referenceNumbers = [];
    for (let i = 1; i < 151; i++) {
        referenceNumbers[i] = i;
    }

    const Tables = (referenceNumbers.map(rn => (
        <Box width={1 / 11} key={rn} textAlign='center' justifyContent='center' alignSelf='center'>
            <Table number={rn} />
        </Box>)
    ))

    return (<Grid margin={1} container display='grid' className="grid-container" >
        {Tables}
    </Grid>)


}

export default RestaurantEditor;