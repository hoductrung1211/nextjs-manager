'use client';
import { Checkbox, Chip, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import EnhancedTableToolbar from "./SkillToolbar";
import React, { useEffect, useMemo, useState } from "react";
import { Order, getComparator, stableSort } from "@/utils/functions/sort";
import EnhancedTableHeadCheckbox from "@/components/mui/EnhancedTableHeadCheckbox";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import RecruitmentContainer from "../../recruitments/RecruitmentContainer";
import useAlert from "@/hooks/useAlert";
import { ICriteriaData, headCells } from "./config";
import IconButton from "@/components/IconButton";
import useModal from "@/hooks/useModal";
import PopupEditCriteria from "./PopupEditCriteria";
import PopupAddSkill from "./PopupAddCriteria";
import { getAllCriterias } from "@/apis/masterData/criterias";

export default function CriteriaTable() {
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();
	const {
		setIsOpenModal,
		setModal
	} = useModal();

	const [rows, setRows] = useState<ICriteriaData[]>([]);
	const [order, setOrder] = useState<Order>('desc');
	const [orderBy, setOrderBy] = useState<keyof ICriteriaData>('criteriaId');
	const [selected, setSelected] = React.useState<readonly number[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(15);


	const visibleRows: ICriteriaData[] = useMemo(
		() => stableSort(rows, getComparator(order, orderBy)).slice(
			page * rowsPerPage,
			page * rowsPerPage + rowsPerPage,
		),
		[order, orderBy, page, rowsPerPage, rows],
	);

	useEffect(() => {
		fetchSkills();
	}, []);

	async function fetchSkills() {
		try {
			setLoading(true);
			const { data: criterias } = await getAllCriterias();
			setRows(criterias.map(criteria => ({
				isDeleted: criteria.isDeleted + "",
				criteriaId: criteria.criteriaId,
				criteriaName: criteria.criteriaName
			})));

			console.log(criterias);
		}
		catch (ex) {
			console.log(ex);
			setAlert({
				message: "Xảy ra lỗi khi load danh sách Tiêu chí đánh giá",
				severity: "error"
			})
		}
		finally {
			setLoading(false);
		}
	}

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map(n => n.criteriaId);
			setSelected(newSelected);
		}
		else {
			setSelected([]);
		}
	};

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof ICriteriaData | "function",
	) => {
		if (property == "function")
			return;

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
			<EnhancedTableToolbar
				numSelected={selected.length}
				onClickAddButton={() => {
					setModal({
						children:
							<PopupAddSkill
								onCancel={() => setIsOpenModal(false)}
								onSave={(criteriaName: string) => {
									const nextId = Math.max(...rows.map(r => r.criteriaId)) + 1;
									setRows([
										...rows,
										{
											criteriaId: nextId,
											isDeleted: "false",
											criteriaName
										}
									]);

									setIsOpenModal(false);
									setAlert({
										message: "Thêm mới tiêu chí đánh giá thành công!",
										severity: "success"
									});
								}}
							/>
					});

					setIsOpenModal(true);
				}}
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
							const isItemSelected = isSelected(row.criteriaId);
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<TableRow hover className="h-fit" key={row.criteriaId}>
									<TableCell padding="checkbox">
										<Checkbox
											color="primary"
											checked={isItemSelected}
											onClick={(event) => handleClickCheckbox(event, row.criteriaId)}
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
										{row.criteriaId}
									</TableCell>
									
									<TableCell align="left">
										{row.criteriaName}
									</TableCell>
									
									<TableCell align="left">
										{row.isDeleted == "true" ?
											<Chip
												className="font-bold text-error"
												label="Đã bị xóa"
											/> :
											<Chip
												className="font-bold text-primary"
												label="Hoạt động"
											/>
										}
									</TableCell>
									
									<TableCell align="right" className="flex flex-row justify-end gap-6">
										<IconButton
											name="pen-to-square"
											tooltip="Chỉnh sửa kỹ năng này"
											onClick={() => {
												setModal({
													children: <PopupEditCriteria
														key={row.criteriaId}
														criteria={row}
														onSave={(row: ICriteriaData) => {
															const index = rows.findIndex(r => r.criteriaId == row.criteriaId);

															setRows([
																...rows.slice(0, index),
																row,
																...rows.slice(index + 1),
															]);

															setIsOpenModal(false);
															setAlert({
																message: "Chỉnh sửa thông tin tiêu chí đánh giá thành công",
																severity: "success"
															})
														}}
														onCancel={() => setIsOpenModal(false)}
													/>
												});

												setIsOpenModal(true);
											}}
										/> 
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
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</RecruitmentContainer>
	)
}
