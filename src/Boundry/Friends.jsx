import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {storage} from "../utils/storage.js";


function createData(name, calories, fat, carbs, protein,) {
    return {name, calories, fat, carbs, protein};
}

const rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0), createData('Ice cream sandwich', 237, 9.0, 37, 4.3), createData('Eclair', 262, 16.0, 24, 6.0), createData('Cupcake', 305, 3.7, 67, 4.3), createData('Gingerbread', 356, 16.0, 49, 3.9),];


export const Friends = () => {

    const [friends, setFriends] = useState([])

    const addFriend = () => {
    }

    useEffect(() => {
        const userName = storage.getFromCookies("userName")

    }, []);
    return (<TableContainer className="w-full max-w-md" component={Paper}>
        {friends && (
            <Table
                className="w-full max-w-md"
                aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Users</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {friends.map((row) => (
                        <TableRow
                            key={row.name}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell scope="row">
                                <Button onClick={() => addFriend(row)}>Add friend</Button>
                            </TableCell>

                        </TableRow>))}
                </TableBody>
            </Table>
        )}
    </TableContainer>);
}