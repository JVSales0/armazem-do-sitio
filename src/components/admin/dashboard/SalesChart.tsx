
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Dados de exemplo para os gráficos (seria substituído por dados reais de uma API)
const salesData = [
  { day: "Segunda", sales: 1200 },
  { day: "Terça", sales: 1900 },
  { day: "Quarta", sales: 1500 },
  { day: "Quinta", sales: 2100 },
  { day: "Sexta", sales: 2400 },
  { day: "Sábado", sales: 1700 },
  { day: "Domingo", sales: 1100 },
];

const chartConfig = {
  sales: {
    label: "Vendas (R$)",
    theme: {
      light: "#22c55e", // Verde para modo claro
      dark: "#4caf50", // Verde para modo escuro
    },
  },
  data: {
    label: "Dados",
  },
};

const SalesChart = () => {
  const [chartType, setChartType] = useState<"bar" | "area">("area");

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          variant={chartType === "area" ? "default" : "outline"}
          onClick={() => setChartType("area")}
          className="dark:border-gray-700 dark:text-white"
        >
          Área
        </Button>
        <Button
          size="sm"
          variant={chartType === "bar" ? "default" : "outline"}
          onClick={() => setChartType("bar")}
          className="dark:border-gray-700 dark:text-white"
        >
          Barras
        </Button>
      </div>

      <ChartContainer
        config={chartConfig}
        className="aspect-[4/3] w-full dark:text-white"
      >
        {chartType === "area" ? (
          <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
            <XAxis 
              dataKey="day" 
              tickLine={false}
              axisLine={false}
              className="dark:text-gray-300"
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$${value}`}
              className="dark:text-gray-300"
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      indicator="line"
                      className="border-none dark:bg-dark-bg-secondary dark:text-white bg-background/80 backdrop-blur-sm"
                      payload={payload}
                      nameKey="day"
                      formatter={(value, name, entry) => (
                        <span className="font-mono dark:text-white">
                          R$ {value.toLocaleString("pt-BR")}
                        </span>
                      )}
                    />
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#4caf50"
              fill="#4caf50"
              strokeWidth={2}
              fillOpacity={0.2}
            />
          </AreaChart>
        ) : (
          <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="dark:stroke-gray-700" />
            <XAxis 
              dataKey="day" 
              tickLine={false}
              axisLine={false}
              className="dark:text-gray-300"
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$${value}`}
              className="dark:text-gray-300"
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      indicator="line"
                      className="border-none dark:bg-dark-bg-secondary dark:text-white bg-background/80 backdrop-blur-sm"
                      payload={payload}
                      nameKey="day"
                      formatter={(value, name, entry) => (
                        <span className="font-mono dark:text-white">
                          R$ {value.toLocaleString("pt-BR")}
                        </span>
                      )}
                    />
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="sales" 
              fill="#4caf50" 
              radius={[4, 4, 0, 0]}
              className="dark:fill-site-green"
            />
          </BarChart>
        )}
      </ChartContainer>
    </div>
  );
};

export default SalesChart;
