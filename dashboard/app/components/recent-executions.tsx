import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const data = [
  { datetime: "2023-06-01 10:30 AM", runId: "RUN-001", result: "PASSED" },
  { datetime: "2023-05-30 2:45 PM", runId: "RUN-002", result: "FAILED" },
  { datetime: "2023-05-28 9:15 AM", runId: "RUN-003", result: "PASSED" },
  { datetime: "2023-05-25 4:30 PM", runId: "RUN-004", result: "FAILED" },
  { datetime: "2023-05-22 11:00 AM", runId: "RUN-005", result: "PASSED" },
];

export function RecentExecutions() {
  return (
    <Table className="space-y-8">
      <TableHeader>
        <TableRow>
          <TableHead>Date/Time</TableHead>
          <TableHead>Run ID</TableHead>
          <TableHead>Result</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.runId}>
            <TableCell>{row.datetime}</TableCell>
            <TableCell>{row.runId}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {row.result === "PASSED" ? (
                  <FaCircleCheck className="w-5 h-5 text-green-500" />
                ) : (
                  <FaCircleXmark className="w-5 h-5 text-red-500" />
                )}
                <span>{row.result}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
