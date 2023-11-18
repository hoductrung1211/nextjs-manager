'use client';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import React, { useMemo, useState } from "react";
import EnhancedTableHead from "../../../components/mui/EnhancedTableHead";
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import Link from "next/link";

interface Data {
    id: number;
    title: string;
    department: string;
    reason: string;
    numberOfApplicant: number;
    stage: string;
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean; 
    disablePadding: boolean;
    width?: string;
}

const headCells: HeadCell[] = [
    {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "Title",
        width: "40%"
    },
    {
        id: "department",
        numeric: false,
        disablePadding: false,
        label: "Department",
        width: "15%"
    },
    {
        id: "reason",
        numeric: false,
        disablePadding: false,
        label: "Reason",
        width: "15%"
    },
    {
        id: "numberOfApplicant",
        numeric: true,
        disablePadding: false,
        label: "Number Of Applicant",
        width: "15%"
    },
    {
        id: "stage",
        numeric: false,
        disablePadding: false,
        label: "Stage",
        width: "15%"
    }, 
];

function createData(
    id: number,
    title: string,
    department: string,
    reason: string,
    numberOfApplicant: number,
    stage: string, 
): Data {
    return {
        id, 
        title,
        numberOfApplicant,
        department,
        reason,
        stage,
    }
}

const rows = [
    createData(1, 'Embedded Systems Developer', 'Marketing', 'Retired', 2, 'interviewing'),
    createData(2, 'Full Stack Developer', 'Finance', 'Promoted', 2, 'interviewing'),
    createData(3, 'Senior Frontend Engineer', 'Sales', 'Maternity', 1, 'interviewing'),
    createData(4, 'Senior Frontend Engineer', 'Finance', 'New role', 1, 'sourcing'),
    createData(5, 'Senior Frontend Engineer', 'Business Development', 'Maternity', 1, 'sourcing'),
    createData(6, 'Embedded Systems Developer', 'Human Resources', 'Maternity', 1, 'interviewing'),
    createData(7, 'Backend Software Engineer', 'Operations', 'Transfer', 1, 'sourcing'),
    createData(8, 'Backend Software Engineer', 'Operations', 'Termination', 2, 'interviewing'),
    createData(9, 'Embedded Systems Developer', 'Marketing', 'Leave without pay', 3, 'interviewing'),
    createData(10, 'Machine Learning Engineer', 'Sales', 'Paternity leave', 2, 'interviewing'),
    createData(11, 'Full Stack Developer', 'Business Development', 'Leave without pay', 1, 'interviewing'),
    createData(12, 'Cloud Solutions Architect', 'Operations', 'Leave without pay', 2, 'sourcing'),
    createData(13, 'Game Developer', 'Finance', 'Promoted', 1, 'sourcing'),
    createData(14, 'Embedded Systems Developer', 'Marketing', 'Retired', 3, 'sourcing'),
    createData(15, 'Augmented Reality (AR\',) Developer', 'Operations', 'Termination', 1, 'interviewing'),
    createData(16, 'Full Stack Developer', 'Marketing', 'New role', 1, 'sourcing'),
    createData(17, 'Game Developer', 'Finance', 'Leave without pay', 2, 'sourcing'),
    createData(18, 'Cloud Solutions Architect', 'Marketing', 'Paternity leave', 2, 'interviewing'),
    createData(19, 'Backend Software Engineer', 'Finance', 'Termination', 3, 'interviewing'),
    createData(20, 'Cloud Solutions Architect', 'Information Technology (IT)', 'Termination', 1, 'interviewing')
  ]

export default function OthersRecruitmentTable() {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Data>('id');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    // HEAD HEAD HEAD HEAD HEAD
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }
    // HEAD HEAD HEAD HEAD HEAD



    // BODY BODY BODY BODY BODY
    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage],
    );
    // BODY BODY BODY BODY BODY
    

    
    // FOOT FOOT FOOT FOOT FOOT
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    // FOOT FOOT FOOT FOOT FOOT

    return (
        <main className="h-full flex flex-col rounded-lg overflow-hidden bg-default">
            <EnhancedTableToolbar/>
            <TableContainer sx={{ maxHeight: 520 }}>
                <Table stickyHeader aria-label="sticky table" className="h-full">
                    <EnhancedTableHead
                        orderBy={orderBy}
                        order={order}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                    />

                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow hover>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                    >
                                        <Link href={`recruitments/${row.id}/review`}>{row.title}</Link>
                                    </TableCell>
                                    <TableCell align="left">{row.department}</TableCell>
                                    <TableCell align="left">{row.reason}</TableCell>
                                    <TableCell align="right">{row.numberOfApplicant}</TableCell>
                                    <TableCell align="left">{row.stage}</TableCell>
                                </TableRow>
                            )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </main>
    )
}
