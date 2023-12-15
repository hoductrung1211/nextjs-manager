'use client';
import { Checkbox, Table, TableBody, TableCell, TableContainer,  TablePagination, TableRow } from "@mui/material";
import EnhancedTableToolbar from "./RecruitmentTableToolbar";
import React, { useEffect, useMemo, useState } from "react"; 
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import EnhancedTableHeadCheckbox from "@/components/mui/EnhancedTableHeadCheckbox";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import RecruitmentContainer from "../RecruitmentContainer";
import { getWaitingToReviewRecruitments, reviewRecruitment } from "@/apis/recruitments/recruitments";
import useAlert from "@/hooks/useAlert";
import { isAxiosError } from "axios";
import { getVNLocaleDateString } from "@/utils/functions/getLocaleDateString";
import { IRecruitmentData, headCells } from "./config";


export default function WaitingRecruitmentTable() {
    const [rows, setRows] = useState<IRecruitmentData[]>([]);
    
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof IRecruitmentData>('recruitmentId');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    
    const setLoading = useLoadingAnimation();
    const setAlert = useAlert();

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
            
            const { data: recruitments } = await getWaitingToReviewRecruitments();
            
            const newRows: IRecruitmentData[] = recruitments.map(recruitment => ({
                recruitmentId: recruitment.recruitmentId,
                recruitmentTitle: recruitment.recruitmentTitle,
                departmentName: recruitment.department.departmentName,
                numberOfPosition: recruitment.numberOfPosition,
                jobJustificationName: recruitment.jobJustification.jobJustificationName,
                creatorName: recruitment.creatorName,
                createdTime: recruitment.createdDateTime.toLocaleString(),
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
            const newSelected = rows.map(n => n.recruitmentId);
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

    const handleReviewRecruitments = async (isApproved: boolean) => {
        setLoading(true);
        let count = 0;
        const handledRecruitments: number[] = [];

        try {
            for (let i = 0; i < selected.length; i++) {
                await reviewRecruitment(
                    selected[i],
                    {
                        isApproved: isApproved
                    });
                
                count++;

                handledRecruitments.push(selected[i]);
            }

            setAlert({
                message: `${isApproved ? "Thông qua" : "Từ chối"} thành công ${count} Đợt tuyển dụng`,
                severity: "success"
            });
        }
        catch (ex) {
            if (isAxiosError(ex)) {
                setAlert({
                    message: ex.message,
                    severity: "error"
                })
            }
        }
        finally {
            setRows(rows.filter(recruitment => !handledRecruitments.includes(recruitment.recruitmentId)));
            setSelected([]);

            setLoading(false);
        }
    }

    return (
        <RecruitmentContainer>
            <EnhancedTableToolbar
                numSelected={selected.length}
                handleApprove={() => handleReviewRecruitments(true)}
                handleReject={() => handleReviewRecruitments(false)}
            />
            <TableContainer sx={{ maxHeight: 460 }}>
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
                            const isItemSelected = isSelected(row.recruitmentId);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow hover className="h-fit" key={row.recruitmentId}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            onClick={(event) => handleClickCheckbox(event, row.recruitmentId)}
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
                                        {row.recruitmentTitle}
                                        {/* <Link href={`recruitments/${row.recruitmentId}/review`}>{row.recruitmentTitle}</Link> */}
                                    </TableCell>
                                    <TableCell align="left">{row.departmentName}</TableCell>
                                    <TableCell align="left">{row.jobJustificationName}</TableCell>
                                    <TableCell align="right">{row.numberOfPosition}</TableCell>
                                    <TableCell align="left">{row.creatorName}</TableCell>
                                    <TableCell align="right">{getVNLocaleDateString(row.createdTime)}</TableCell>
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
 