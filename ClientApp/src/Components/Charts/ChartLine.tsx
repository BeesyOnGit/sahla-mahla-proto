import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

export type LineChartProps = {
    options?: ChartOptions<"line">;
    data: ChartData<"line">;
    id: string;
};

function ChartLine({ id, data, options }: LineChartProps) {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

    return <Line id={id} style={{ width: "100%" }} data={data} />;
}

export default ChartLine;
