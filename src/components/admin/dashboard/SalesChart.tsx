
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
    color: "#22c55e", // Verde
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
        >
          Área
        </Button>
        <Button
          size="sm"
          variant={chartType === "bar" ? "default" : "outline"}
          onClick={() => setChartType("bar")}
        >
          Barras
        </Button>
      </div>

      <ChartContainer
        config={chartConfig}
        className="aspect-[4/3] w-full"
      >
        {chartType === "area" ? (
          <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$${value}`}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      indicator="line"
                      className="border-none bg-background/80 backdrop-blur-sm"
                      payload={payload}
                      nameKey="day"
                      formatter={(value, name, entry) => (
                        <span className="font-mono">
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
              stroke="#22c55e"
              fill="#22c55e"
              strokeWidth={2}
              fillOpacity={0.2}
            />
          </AreaChart>
        ) : (
          <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="day" 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$${value}`}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      indicator="line"
                      className="border-none bg-background/80 backdrop-blur-sm"
                      payload={payload}
                      nameKey="day"
                      formatter={(value, name, entry) => (
                        <span className="font-mono">
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
              fill="#22c55e" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )}
      </ChartContainer>
    </div>
  );
};

export default SalesChart;
