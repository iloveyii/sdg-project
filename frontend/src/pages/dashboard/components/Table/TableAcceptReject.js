import React from "react";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@material-ui/core";

import {Button} from "../../../../components/Wrappers";

export default function TableAcceptReject({data, changeDonationStatus}) {
    var keys = Object.keys(data[0]).map(i => i.toUpperCase());
    keys.shift(); // delete "id" key

    const columnsToShow = ['foodtype', 'quantity', 'datereceived', 'donatedby', 'receivedby', 'status', 'action'];

    return (
        <Table className="mb-0">
            <TableHead>
                <TableRow>
                    {columnsToShow.map(key => (
                        <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(({donationid, foodtype, quantity, datereceived, donatedby, receivedby, status}) => (
                    <TableRow key={donationid}>
                        <TableCell className="pl-3 fw-normal">{foodtype}</TableCell>
                        <TableCell>{quantity}</TableCell>
                        <TableCell>{datereceived}</TableCell>
                        <TableCell>{donatedby}</TableCell>
                        <TableCell>{receivedby}</TableCell>
                        <TableCell>{status}</TableCell>
                        <TableCell>
                            <Button
                                color={'success'}
                                size="small"
                                className="px-2"
                                variant="contained"
                                onClick={() => changeDonationStatus(donationid, receivedby, datereceived, 'Accepted')}
                            >
                                {'Accept'}
                            </Button>

                            <Button
                                color={'red'}
                                size="small"
                                className="px-2"
                                variant="contained"
                                onClick={() => changeDonationStatus(donationid, receivedby, datereceived, 'Rejected')}
                            >
                                {'Reject'}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
