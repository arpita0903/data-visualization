import React, { useEffect, useMemo, useState } from "react";

const Countrygraph = ({ data }) => {
    const [selected, setSelected] = useState("intensity");
    const countryList = ["Mexico", "Nigeria", "China", "India"];

    let countryDatas = useMemo(() => {
        let collectData = countryList.map((country) => {
            return data.db_post
                .filter((item) => item.country === country)
                .reduce((accumulator, currentValue) => {
                    return accumulator + currentValue[`${selected}`];
                }, 0);
        });
        return collectData;
    }, [selected]);

    useEffect(() => {
        //if (window.myCountry !== "undefined") {
        //  console.log(window.myCountry.destroy());
        //  window.myCountry.destroy();
        //}
        let ctx2 = document.getElementById("myCountry").getContext("2d");
        let myCountry = new Chart(ctx2, {
            type: "line",
            data: {
                labels: ["Mexico", "Nigeria", "China", "India"],
                datasets: [
                    {
                        data: countryDatas,
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

        //return myCountry.destroy();
    }, [selected]);
    return (
        <>
            <div className="graphs">
                <h1 className="heading w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">
                    Line Chart
                </h1>
                <div className="title">
                    <h3>Country VS</h3>
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
                        <canvas id="myCountry"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Countrygraph;
