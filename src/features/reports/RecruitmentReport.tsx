"use client";

import { DefaultizedPieValueType, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { useState } from "react";

export default function RecruitmentReport({

}) {
    const [dataset, setDataset] = useState([
        [
            { id: 0, value: 7, label: 'Ứng viên đạt yêu cầu' },
            { id: 1, value: 3, label: 'Ứng viên không đạt yêu cầu', color: '#f1c40f' },
        ],
        [
            { id: 0, value: 6, label: 'Ứng viên đạt yêu cầu đi phỏng vấn' },
            { id: 1, value: 1, label: 'Ứng viên đạt yêu cầu vắng mặt phỏng vấn', color: '#f1c40f' },
        ],
        [
            { id: 0, value: 2, label: 'Ứng viên được tuyển' },
            { id: 1, value: 4, label: 'Ứng viên không được tuyển', color: '#f1c40f' },
        ]
    ])
    return (
        <main className="pt-8 p-4 flex flex-col gap-10 bg-content">
            <h2 className="font-semibold text-2xl text-primary">Báo cáo đơn ứng tuyển theo đợt tuyển dụng</h2>
            <div className="grid grid-cols-3 ">
                {dataset.map(data => (
                    <section>
                        <p className="text-lg">
                            Tổng cộng: {
                                data.map(d => d.value)
                                    .reduce((total, current) => total + current, 0)
                            } ứng viên
                        </p>
                        <PieChart
                            series={[
                                {
                                    data,
                                    arcLabel: (params: DefaultizedPieValueType) => {
                                        const percent = params.value / data.map(d => d.value)
                                        .reduce((total, current) => total + current, 0);
                                        return `${(percent * 100).toFixed(0)}%`;
                                    },
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                },
                            ]}
                            height={400}
                            margin={{ top: 20, bottom: 100, left: 80, right: 80 }}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vertical: 'bottom', horizontal: 'middle' },
                                    padding: 20,
                                },
                            }}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 16,
                                },
                            }}
                        />
                    </section>
                ))}
            </div>
        </main>
    )
}