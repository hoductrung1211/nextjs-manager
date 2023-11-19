'use client';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import EnhancedTableToolbar from "./RecruitmentTableToolbar";
import React, { useEffect, useMemo, useState } from "react"; 
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import Link from "next/link";
import EnhancedTableHeadCheckbox from "@/components/mui/EnhancedTableHeadCheckbox";
import { JobRequisitionFilter, getAllJobRequisitions } from "@/apis/jobRequisitions";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import RecruitmentContainer from "../RecruitmentContainer";

interface IRecruitmentData {
    id: number;
    title: string;
    department: string;
    reason: string;
    numberOfPosition: number;
    creator: string;
    createdTime: string;
}

interface HeadCell {
    id: keyof IRecruitmentData;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
    width?: string;
}

const headCells: HeadCell[] = [ 
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "Title",
        width: "25%"
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
        label: "Justification",
        width: "10%"
    },
    {
        id: "numberOfPosition",
        numeric: true,
        disablePadding: false,
        label: "Number Of Position",
        width: "20%"
    },
    {
        id: "creator",
        numeric: false,
        disablePadding: false,
        label: "Creator",
        width: "15%"
    }, 
    {
        id: "createdTime",
        numeric: true,
        disablePadding: false,
        label: "Created Time",
        width: "15%"
    }, 
];

export default function WaitingRecruitmentTable() {
    const [rows, setRows] = useState<IRecruitmentData[]>([]);
    
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof IRecruitmentData>('id');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    
    const setLoading = useLoadingAnimation();

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage, rows],
    ); 

    useEffect(() => {
        fetchRecruitments();
    }, []);

    async function fetchRecruitments() {
        try {
            setLoading(true);

            const { data: jobRequisitions } = await getAllJobRequisitions(JobRequisitionFilter.WaitingToReview);

            const newRows: IRecruitmentData[] = jobRequisitions.map(jr => ({
                id: jr.recruitmentId,
                title: jr.positionTitle,
                department: jr.departmentName,
                numberOfPosition: jr.numberOfPosition,
                reason: jr.requisitionReasonName,
                creator: jr.hrName,
                createdTime: jr.createdDateTime.toLocaleString(),
            }));

            setRows(newRows);
        }
        catch (ex) {
            console.log(ex);
        }
        finally {
            setLoading(false);
        }
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map(n => n.id);
            setSelected(newSelected);
        }
        else {
            setSelected([]);
        }
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IRecruitmentData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleClickCheckbox = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    };
    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <RecruitmentContainer>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table" className="h-full">
                    <EnhancedTableHeadCheckbox
                        numSelected={selected.length}
                        rowCount={rows.length}
                        onSelectAllClick={handleSelectAllClick}
                        orderBy={orderBy}
                        order={order}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                    />

                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow hover className="h-fit" key={row.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            onClick={(event) => handleClickCheckbox(event, row.id)}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        <Link href={`recruitments/${row.id}/review`}>{row.title}</Link>
                                    </TableCell>
                                    <TableCell align="left">{row.department}</TableCell>
                                    <TableCell align="left">{row.reason}</TableCell>
                                    <TableCell align="right">{row.numberOfPosition}</TableCell>
                                    <TableCell align="left">{row.creator}</TableCell>
                                    <TableCell align="right">{row.createdTime.slice(0, 10)}</TableCell>
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
        </RecruitmentContainer>
    )
}
 