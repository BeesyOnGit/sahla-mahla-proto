import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export type DoghNutTypeProps = {
    options?: ChartOptions<"doughnut">;
    data: ChartData<"doughnut">;
};

function ChartDoghnut({ data, options }: DoghNutTypeProps) {
    ChartJS.register(ArcElement, Tooltip, Legend, Colors);

    return <Doughnut id="2" style={{ width: "100px", height: "100px" }} data={data} options={options} />;
}

export default ChartDoghnut;
