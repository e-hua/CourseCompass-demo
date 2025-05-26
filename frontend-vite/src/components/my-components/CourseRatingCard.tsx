import { Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import type { User } from "@/components/my-components/Dashboard";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
    ChartConfig
} from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface UserProfileCardProps {
  user: User;
}

const chartConfig = {
  comments: {
    label: "Comments",
  },
  rated: {
    label: "Rated Courses",
    color: "hsl(359 2% 90%)",
  },
  notRated: {
    label: "Waiting for Ratings",
    color: "hsl(240 1% 74%)",
  },
} satisfies ChartConfig



export default function Component({user}: UserProfileCardProps) {

  const ratedCourses = user.courseRatings.length;
  const notRatedCourses = user.takenCourses.length - ratedCourses;
  const chartData = [
    { comment: "Rated Courses", number: ratedCourses, fill: "var(--color-rated)" },
    { comment: "Waiting for Rating", number: notRatedCourses, fill: "var(--color-notRated)" },
]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Course Rating Condition</CardTitle>
        <CardDescription>Rate more courses to help us develop! </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="number"
              nameKey="comment"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}