import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein
    };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function EngageTable() {
    return (
        <div className="h-screen w-full p-5 bg-white">
            <TableContainer
                className="w-full h-full flex flex-col rounded-xl bg-default overflow-hidden"
            >
                <Table>
                    <TableHead className="flex-shrink-0 h-14 px-3 flex items-center gap-4 border-b ">
                        <div className="w-12 h-12 rounded-full bg-grey"></div>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <main className=" overflow-y-auto drop-shadow-sm">
                        <div className="h-screen"></div>
                    </main>
                </Table>
            </TableContainer>
        </div>
    )
}

