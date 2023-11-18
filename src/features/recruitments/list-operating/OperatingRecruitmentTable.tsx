'use client';
import {  Button, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import EnhancedTableToolbar from "../EnhancedTableToolbar";
import React, { useEffect, useMemo, useState } from "react";
import EnhancedTableHead from "@/components/mui/EnhancedTableHead";
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import Link from "next/link";
import { JobRequisitionFilter, getAllJobRequisitions } from "@/apis/jobRequisitions";
import dayjs, { Dayjs } from "dayjs";
import AddIcon from '@mui/icons-material/Add';
import useLoadingAnimation from "@/hooks/useLoadingAnimation";

interface IRecruitmentData {
    recruitmentId: number;
    departmentId: string;
    stateId: number;
    
    title: string;
    department: string;
    reason: string;
    numberOfApplicant: number;
    state: string;
    createdDateTime: string;
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
        width: "20%"
    },
    {
        id: "createdDateTime",
        numeric: true,
        disablePadding: false,
        label: "Cread Time",
        width: "15%"
    },
    {
        id: "state",
        numeric: false,
        disablePadding: false,
        label: "State",
        width: "10%"
    },
];

const RecruitmentState = ({
    children,
    stateId
}: {
    children: React.ReactNode,
    stateId: number;
}) => {
    let colorClassName = "";
    switch (stateId) {
        case 1:
            colorClassName = "text-pumpkin bg-pumpkin";
            break;
        case 2:
            colorClassName = "text-green-sea bg-green-sea";
            break;
        case 3:
            colorClassName = "text-belize-hole bg-belize-hole";
            break;
        case 4:
            colorClassName = "text-wisteria bg-wisteria";
            break;
        case 5:
            colorClassName = "text-gray-500 bg-gray-500";
            break;
        case 6:
            colorClassName = "text-pomegranate bg-pomegranate";
            break;
    }    

    return (
        <span className={`p-2 rounded-md font-bold bg-opacity-10 ${colorClassName}`}>
            {children}
        </span>
    )
}

export default function OperatingRecruitmentTable() {
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

            const { data: jobRequisitions } = await getAllJobRequisitions(JobRequisitionFilter.operating);

            const newRows = jobRequisitions.map(jr => ({
                recruitmentId: jr.recruitmentId,
                departmentId: jr.departmentId + "",
                stateId: jr.recruitmentStateId,

                title: jr.positionTitle,
                department: jr.departmentName,
                numberOfApplicant: jr.numberOfPosition,
                reason: jr.requisitionReasonName,
                state: jr.recruitmentStateName,
                createdDateTime: jr.createdDateTime.toLocaleString()
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
            >
                <Button
                    variant="contained"
                    color="info"
                    startIcon={<AddIcon />}
                    href="./recruitments/create"
                    onClick={() => setLoading(true)}
                >
                    Create
                </Button>
            </EnhancedTableToolbar>
            <TableContainer sx={{maxHeight: 500}}>
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
                                        <Link href={`recruitments/${row.recruitmentId}/review`}>{row.title}</Link>
                                    </TableCell>
                                    <TableCell align="left">{row.department}</TableCell>
                                    <TableCell align="left">{row.reason}</TableCell>
                                    <TableCell align="right">{row.numberOfApplicant}</TableCell>
                                    <TableCell align="right">{row.createdDateTime.slice(0, 10)}</TableCell>
                                    <TableCell align="left">
                                        <RecruitmentState stateId={row.stateId}>
                                        {row.state}
                                        </RecruitmentState>
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
        </main>
    )
}
