export default function OriginalTable() {
    return (
        <div className="w-full h-screen p-5 bg-gray-100">
            <div className="w-full h-full grid place-items-center bg-white">
                <table className="w-140">
                    <thead className="">
                        <tr className="">
                            <th>Date</th>
                            <th>Month</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>12</td>
                            <td>2012</td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>12</td>
                            <td>2012</td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>12</td>
                            <td>2012</td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>12</td>
                            <td>2012</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}