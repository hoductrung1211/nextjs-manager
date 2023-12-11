'use client';
import { SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import EnhancedTableToolbar from "../EnhancedTableToolbar";
import React, { useEffect, useMemo, useState } from "react";
import EnhancedTableHead from "@/components/mui/EnhancedTableHead";
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import { getOtherRecruitments } from "@/apis/recruitments/recruitments";
import Link from "next/link";
import  { Dayjs } from "dayjs";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import RecruitmentStateChip from "../RecruitmentStateChip";
import RecruitmentContainer from "../RecruitmentContainer";

interface IRecruitmentData {
    recruitmentId: number;
    departmentId: string;
    recruitmentStateId: number;
    
    recruitmentTitle: string;
    departmentName: string;
    jobJustificationName: string;
    description: string;
    createdDateTime: string;
    recruitmentStateName: string;
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
        label: "Tiêu đề",
        width: "25%"
    },
    {
        id: "departmentName",
        numeric: false,
        disablePadding: false,
        label: "Phòng ban",
        width: "15%"
    },
    {
        id: "jobJustificationName",
        numeric: false,
        disablePadding: false,
        label: "Lý do",
        width: "10%"
    },
    {
        id: "description",
        numeric: false,
        disablePadding: false,
        label: "Chú thích",
        width: "35%"
    }, 
    {
        id: "recruitmentStateName",
        numeric: false,
        disablePadding: false,
        label: "Trạng thái",
        width: "20%"
    },
];
 
export default function OthersRecruitmentTable() {
    const [rows, setRows] = useState<readonly IRecruitmentData[]>([]);
    const [filteredRows, setFilteredRows] = useState<readonly IRecruitmentData[]>([]);
    
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof IRecruitmentData>('createdDateTime');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    
    const [departmentId, setDepartmentId] = useState('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const setLoading = useLoadingAnimation();

    const visibleRows = useMemo(
        () => stableSort(filteredRows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
            page * rowsPerPage + rowsPerPage) 
        , [order, orderBy, page, rowsPerPage, filteredRows],
    );
    
    useEffect(() => {
        fetchRecruitments();
    }, []);     

    async function fetchRecruitments() {
        try { 
            setLoading(true);

            const { data: recruitments } = await getOtherRecruitments();

            const newRows: IRecruitmentData[] = recruitments.map(recruitment => ({
                recruitmentId: recruitment.recruitmentId,
                departmentId: recruitment.department.departmentId + "",
                recruitmentStateId: recruitment.recruitmentState.recruitmentStateId,

                recruitmentTitle: recruitment.recruitmentTitle,
                departmentName: recruitment.department.departmentName,
                numberOfApplicant: 1, // TODO
                jobJustificationName: recruitment.jobJustification.jobJustificationName,
                recruitmentStateName: recruitment.recruitmentState.recruitmentStateName,
                createdDateTime: recruitment.createdDateTime.toLocaleString(),
                description: recruitment.description,
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
            const isStartDateOk = startDate ? startDate.toDate() <= new Date(row.createdDateTime) : true; 
            const isEndDateOk = endDate ? endDate.toDate() >= new Date(row.createdDateTime) : true;

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
            <TableContainer sx={{maxHeight: 460}}>
                <Table stickyHeader aria-label="sticky table" >
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
                                <TableRow hover key={row.recruitmentId}>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                    >
                                        <Link href={`recruitments/${row.recruitmentId}`}>{row.recruitmentTitle}</Link>
                                    </TableCell>
                                    <TableCell align="left">{row.departmentName}</TableCell>
                                    <TableCell align="left">{row.jobJustificationName}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="left">
                                        <RecruitmentStateChip stateId={row.recruitmentStateId}>
                                        {row.recruitmentStateName}
                                        </RecruitmentStateChip>
                                    </TableCell>
                                </TableRow>
                            )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </RecruitmentContainer>
    )
}
