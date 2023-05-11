import React, { useEffect, useState } from 'react'



const Endyeargraph = ({ data }) => {
    const [selected, setSelected] = useState("intensity");
    const numberOfYear = [2018, 2019, 2021, 2022, 2035];

    let yearData = [];
    numberOfYear.forEach((year) => {
        let sumOfData = data.db_post
            .filter((item) => item.end_year === year)
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue[`${selected}`];
            }, 0);
        yearData.push(sumOfData);
        console.log(yearData);
    });

    useEffect(() => {
        let ctx = document.getElementById("myYear").getContext("2d");

        let myYear = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["2018", "2019", "2021", "2022", "2035"],
                datasets: [
                    {
                        data: yearData,
                        label: [`${selected}`],
                        backgroundColor: [
                            "rgb(255, 99, 132)",
                            "rgb(54, 162, 235)",
                            "rgb(255, 205, 86)",
                            "rgb(255, 105, 0)",
                            "rgb(155, 120, 26)",
                        ],
                        hoverOffset: 4,

                        fill: false,
                    },
                ],
            },
        })
    }, [selected])
    return (
        <>
            <div className='graphs'>
                <h1 className="heading w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">
                    Doughnut Chart
                </h1>
                <div className='title'>
                    <h3>Ed Year VS</h3>
                    <select name="Variable" id="variable" value={selected} onChange={e => setSelected(e.target.value)}>
                        <option value="intensity">Intensity</option>
                        <option value="likelihood">Likelihood</option>
                        <option value="relevance">Relevance</option>
                    </select>
                </div>
                <div className="w-[1100px] h-screen flex mx-auto my-auto">
                    <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
                        <canvas id="myYear"></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Endyeargraph