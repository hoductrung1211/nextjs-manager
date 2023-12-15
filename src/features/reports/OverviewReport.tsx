"use client";

import { getAllDepartments } from "@/apis/masterData/departments";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import IDepartment from "@/models/Department";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BarChart,  PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

export default function OverviewReport() {
    const setAlert = useAlert();
    const setLoading = useLoadingAnimation();

    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>();
    const [selectedDepartment, setSelectedDepartment] = useState<number>();

    useEffect(() => {
        fetchDepartments();
    }, []);

    async function fetchDepartments() {
        setLoading(true);
        try {
            const { data: departmentRes } = await getAllDepartments();
            setDepartments(departmentRes);
        }
        catch (ex) {
            setAlert({
                message: "Xảy ra lỗi khi load dữ liệu danh sách Phòng ban",
                severity: "error"
            })
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="py-10 flex flex-col gap-10 ">
            <section className="pl-8 flex gap-4 items-center ">
                Bộ lọc báo cáo
                <FormControl className="w-68" size="small">
                    <InputLabel id="year-select-label">Chọn năm</InputLabel>
                    <Select
                        labelId="year-select-label" id="year-select"
                        className="bg-white"
                        label="Chọn năm"
                        value={selectedYear}
                        onChange={e => setSelectedYear(Number.parseInt(e.target.value + ""))}
                    >
                        <MenuItem value={undefined}>Tất cả</MenuItem>
                        {[
                            2023,
                            2022,
                            2021
                        ].map(year => (
                            <MenuItem value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className="w-68" size="small">
                    <InputLabel id="department-select-label">Chọn phòng ban</InputLabel>
                    <Select
                        labelId="department-select-label" id="department-select"
                        className="bg-white"
                        label="Chọn phòng ban"
                        value={selectedDepartment}
                        onChange={e => setSelectedDepartment(Number.parseInt(e.target.value + ""))}
                    >
                        <MenuItem value={undefined}>Tất cả</MenuItem>
                        {departments.map(department => (
                            <MenuItem value={department.departmentId}>{department.departmentName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </section>

            <section className="p-8 flex flex-col gap-8 border rounded-lg bg-white">
                <header>
                    <h1 className="text-xl font-semibold text-primary">Báo cáo tuyển dụng </h1>
                </header>
                <main className="flex flex-col gap-10">
                    <section className=" p-6 flex justify-between border rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold">Số lượng ứng viên được tuyển</h2>
                        <div className="">
                            <BarChart
                                height={300}
                                series={series }
                            />
                        </div>
                    </section>
                </main>
                <footer className="">

                </footer>
            </section>
        </div>
    )
}

const series = [
    {
      label: 'series 1',
      data: [
        2423, 2210, 764, 1879, 1478, 1373, 1891, 2171, 620, 1269, 724, 1707, 1188,
        1879, 626, 1635, 2177, 516, 1793, 1598,
      ],
    },
    {
      label: 'series 2',
      data: [
        2362, 2254, 1962, 1336, 586, 1069, 2194, 1629, 2173, 2031, 1757, 862, 2446,
        910, 2430, 2300, 805, 1835, 1684, 2197,
      ],
    },
    {
      label: 'series 3',
      data: [
        1145, 1214, 975, 2266, 1768, 2341, 747, 1282, 1780, 1766, 2115, 1720, 1057,
        2000, 1716, 2253, 619, 1626, 1209, 1786,
      ],
    },
    {
      label: 'series 4',
      data: [
        2361, 979, 2430, 1768, 1913, 2342, 1868, 1319, 1038, 2139, 1691, 935, 2262,
        1580, 692, 1559, 1344, 1442, 1593, 1889,
      ],
    },
    {
      label: 'series 5',
      data: [
        968, 1371, 1381, 1060, 1327, 934, 1779, 1361, 878, 1055, 1737, 2380, 875, 2408,
        1066, 1802, 1442, 1567, 1552, 1742,
      ],
    },
    {
      label: 'series 6',
      data: [
        2316, 1845, 2057, 1479, 1859, 1015, 1569, 1448, 1354, 1007, 799, 1748, 1454,
        1968, 1129, 1196, 2158, 540, 1482, 880,
      ],
    },
    {
      label: 'series 7',
      data: [
        2140, 2082, 708, 2032, 554, 1365, 2121, 1639, 2430, 2440, 814, 1328, 883, 1811,
        2322, 1743, 700, 2131, 1473, 957,
      ],
    },
    {
      label: 'series 8',
      data: [
        1074, 744, 2487, 823, 2252, 2317, 2139, 1818, 2256, 1769, 1123, 1461, 672,
        1335, 960, 1871, 2305, 1231, 2005, 908,
      ],
    },
    {
      label: 'series 9',
      data: [
        1792, 886, 2472, 1546, 2164, 2323, 2435, 1268, 2368, 2158, 2200, 1316, 552,
        1874, 1771, 1038, 1838, 2029, 1793, 1117,
      ],
    },
    {
      label: 'series 10',
      data: [
        1433, 1161, 1107, 1517, 1410, 1058, 676, 1280, 1936, 1774, 698, 1721, 1421,
        785, 1752, 800, 990, 1809, 1985, 665,
      ],
    },
  ] 