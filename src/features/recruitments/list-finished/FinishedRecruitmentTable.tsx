'use client';
import {  SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import EnhancedTableHead from "../../../components/mui/EnhancedTableHead";
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import Link from "next/link";
import EnhancedTableToolbar from "../EnhancedTableToolbar";
import { Dayjs } from "dayjs";
import { JobRequisitionFilter, getAllJobRequisitions } from "@/apis/jobRequisitions";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";

interface IRecruitmentData {
    recruitmentId: number;
    departmentId: string;
    stateId: number;

    title: string;
    department: string;
    reason: string;
    hiredNumber: number;
    finishedTime: string;
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
        disablePadding: false,
        label: "Title",
        width: "30%"
    },
    {
        id: "department",
        numeric: false,
        disablePadding: false,
        label: "Department",
        width: "20%"
    },
    {
        id: "reason",
        numeric: false,
        disablePadding: false,
        label: "Reason",
        width: "15%"
    },
    {
        id: "hiredNumber",
        numeric: true,
        disablePadding: false,
        label: "Hired Number",
        width: "20%"
    },
    {
        id: "finishedTime",
        numeric: false,
        disablePadding: false,
        label: "Finished Time",
        width: "20%"
    }, 
]; 

export default function FinishedRecruitmentTable() {
    const [rows, setRows] = useState<readonly IRecruitmentData[]>([]);
    const [filteredRows, setFilteredRows] = useState<readonly IRecruitmentData[]>([]);

    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof IRecruitmentData>('finishedTime');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const [departmentId, setDepartmentId] = useState('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const setLoading = useLoadingAnimation();

    const visibleRows = useMemo(
        () =>
            stableSort(filteredRows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage, filteredRows],
    );

    useEffect(() => {
        fetchRecruitments();
    }, []);     

    async function fetchRecruitments() {
        try { 
            setLoading(true);
            const { data: jobRequisitions } = await getAllJobRequisitions(JobRequisitionFilter.finished);

            const newRows: IRecruitmentData[] = jobRequisitions.map(jr => ({
                recruitmentId: jr.recruitmentId,
                stateId: jr.recruitmentStateId,
                departmentId: jr.departmentId + "",

                title: jr.positionTitle,
                department: jr.departmentName,
                finishedTime: jr.createdDateTime.toLocaleString(),
                hiredNumber: jr.numberOfPosition,
                reason: jr.requisitionReasonName,
            }));

            setRows(newRows);
            setFilteredRows(newRows);
        }
        catch(ex) {
            
        }
        finally {
            setLoading(false);
        }
    }

    const handleClearFilter = () => {
        setDepartmentId('');
        setStartDate(null);
        setEndDate(null);
    }

    const handleFilter = () => {
        const newFilteredRows = rows.filter(row => {
            const isSameDapartment = departmentId ? row.departmentId == departmentId : true;
            const isStartDateOk = startDate ? startDate.toDate() <= new Date(row.finishedTime) : true; 
            const isEndDateOk = endDate ? endDate.toDate() >= new Date(row.finishedTime) : true;

            if (isSameDapartment && isStartDateOk && isEndDateOk)
                return true;

            return false;
        });

        setFilteredRows(newFilteredRows);
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IRecruitmentData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    

    return (
        <main className="h-full flex flex-col rounded-lg overflow-hidden bg-default">
            <EnhancedTableToolbar
                departmentId={departmentId}
                onChangeDepartment={(event: SelectChangeEvent) => {
                    setDepartmentId(event.target.value as string);
                }}
                startDate={startDate}
                onChangeStartDate={(newDate: Dayjs | null) => {setStartDate(newDate)}}
                endDate={endDate}
                onChangeEndDate={(newDate: Dayjs | null) => { setEndDate(newDate) }}
                onClearFilter={handleClearFilter}
                onFilter={handleFilter}
            />
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
                                        <Link href={`recruitments/${row.recruitmentId}/review`}>{row.title}</Link>
                                    </TableCell>
                                    <TableCell align="left">{row.department}</TableCell>
                                    <TableCell align="left">{row.reason}</TableCell>
                                    <TableCell align="right">{row.hiredNumber}</TableCell>
                                    <TableCell align="left">{row.finishedTime.slice(0, 10)}</TableCell>
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
