import React, { useEffect, useState, useMemo } from "react";

const Sectorgraph = ({ data }) => {
    const [selected, setSelected] = useState("intensity");
    const sectorList = ["Environment", "Retail"];

    let sectorData = useMemo(() => {
        let collectData = sectorList.map((sector) => {
            return data.db_post
                .filter((item) => item.sector === sector)
                .reduce((accumulator, currentValue) => {
                    return accumulator + currentValue[`${selected}`];
                }, 0);
        });
        return collectData;
    }, [selected]);

    useEffect(() => {
        let ctx2 = document.getElementById("mySector").getContext("2d");
        let mySector = new Chart(ctx2, {
            type: "pie",
            data: {
                labels: ["Environment", "Retail"],
                datasets: [
                    {
                        data: sectorData,
                        label: selected,
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
        });
    }, [selected]);
    return (
        <>
            <div className="graphs">
                <h1 className="heading w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">
                    Pie Chart
                </h1>
                <div className="title">
                    <h3>End Year VS</h3>

                    <select
                        name="Variable"
                        id="variable"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                    >
                        <option value="intensity">Intensity</option>
                        <option value="likelihood">Likelihood</option>
                        <option value="relevance">Relevance</option>
                    </select>
                </div>
                <div className="w-[1100px] h-screen flex mx-auto my-auto">
                    <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
                        <canvas id="mySector"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sectorgraph;
