import { Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import { writeFileSync } from "fs";
import stringify from "json-stringify-safe";

interface TestData extends TestResult {
  title: string;
}

export default class PwdReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult): void {
    const data: TestData = {
      title: test.title,
      ...result,
    };
    console.log(data);
    writeFileSync("report.json", stringify(data, null, 2));
  }
}
