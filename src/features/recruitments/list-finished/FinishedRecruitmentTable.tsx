'use client';
import {  SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import EnhancedTableHead from "../../../components/mui/EnhancedTableHead";
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import Link from "next/link";
import { RecruitmentFilter, getAllRecruitments } from "@/apis/recruitments";
import EnhancedTableToolbar from "../EnhancedTableToolbar";
import { Dayjs } from "dayjs";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import RecruitmentContainer from "../RecruitmentContainer";

interface IRecruitmentData {
    recruitmentId: number;
    departmentId: string;
    recruitmentStateId: number;

    recruitmentTitle: string;
    departmentName: string;
    jobJustificationName: string;
    numberOfHiredApplicant: number;
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
        id: "recruitmentTitle",
        numeric: false,
        disablePadding: false,
        label: "Title",
        width: "30%"
    },
    {
        id: "departmentName",
        numeric: false,
        disablePadding: false,
        label: "Department",
        width: "20%"
    },
    {
        id: "jobJustificationName",
        numeric: false,
        disablePadding: false,
        label: "Justification",
        width: "15%"
    },
    {
        id: "numberOfHiredApplicant",
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
            const { data: recruitments } = await getAllRecruitments(RecruitmentFilter.Finished);

            const newRows: IRecruitmentData[] = recruitments.map(recruitment => ({
                recruitmentId: recruitment.recruitmentId,
                stateId: recruitment.recruitmentStateId,
                departmentId: recruitment.departmentId + "",
                recruitmentStateId: recruitment.recruitmentStateId,
                
                recruitmentTitle: recruitment.recruitmentTitle,
                departmentName: recruitment.departmentName,
                jobJustificationName: recruitment.jobJustificationName,
                finishedTime: recruitment.createdTime.toLocaleString(),
                numberOfHiredApplicant: recruitment.numberOfPosition,
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
        <RecruitmentContainer>
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
                                        <Link href={`recruitments/${row.recruitmentId}`}>{row.recruitmentTitle}</Link>
                                    </TableCell>
                                    <TableCell align="left">{row.departmentName}</TableCell>
                                    <TableCell align="left">{row.jobJustificationName}</TableCell>
                                    <TableCell align="right">{row.numberOfHiredApplicant}</TableCell>
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
        </RecruitmentContainer>
    )
}
