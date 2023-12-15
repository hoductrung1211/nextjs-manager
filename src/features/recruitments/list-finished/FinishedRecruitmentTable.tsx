'use client';
import {  SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import EnhancedTableHead from "@/components/mui/EnhancedTableHead";
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import Link from "next/link";
import EnhancedTableToolbar from "../EnhancedTableToolbar";
import { Dayjs } from "dayjs";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import RecruitmentContainer from "../RecruitmentContainer";
import { getFinishedRecruitments } from "@/apis/recruitments/recruitments";
import { IRecruitmentData, headCells } from "./constants";

export default function FinishedRecruitmentTable() {
    const [rows, setRows] = useState<readonly IRecruitmentData[]>([]); console.log(rows);
    const [filteredRows, setFilteredRows] = useState<readonly IRecruitmentData[]>([]); console.log(filteredRows);

    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof IRecruitmentData>('departmentId');
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
        console.log('hehe');
        try { 
            setLoading(true);
            const { data: recruitments } = await getFinishedRecruitments();
            console.log(recruitments);
            const newRows: IRecruitmentData[] = recruitments.map(recruitment => ({
                recruitmentId: recruitment.recruitmentId,
                stateId: recruitment.recruitmentState.recruitmentStateId,
                departmentId: recruitment.department.departmentId + "",
                recruitmentStateId: recruitment.recruitmentState.recruitmentStateId,
                
                recruitmentTitle: recruitment.recruitmentTitle,
                departmentName: recruitment.department.departmentName,
                jobJustificationName: recruitment.jobJustification.jobJustificationName,
                finishedTime: "12-11-2001",
                numberOfHiredApplicant: recruitment.numberOfHiredApplicant,
            }));
            console.log("newRows", newRows);
            setRows(newRows);
            setFilteredRows(newRows);
        }
        catch(ex) {
            console.log(ex);
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
            <TableContainer sx={{ maxHeight: 460 }}>
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
