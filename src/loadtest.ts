import { promiseState } from "./utils/promise";
import { Duration, durationToMillis, sleep } from "./utils/time";

interface LoadTestProps {
  tps: number;
  duration: Duration;
}

type RequestResult =
  | { status: "ok" }
  | { status: "error"; errorType: "network" | "service" };

interface TestRunResults {
  successful: number;
  errors: number;
}

const MAX_PROMISE_QUEUE_SIZE = 100_000;

abstract class LoadTest {
  protected readonly tps: number;
  protected readonly duration: number;

  constructor(props: LoadTestProps) {
    this.tps = props.tps;
    this.duration = durationToMillis(props.duration);
  }

  async run(): Promise<TestRunResults> {
    const testResult: TestRunResults = {
      successful: 0,
      errors: 0,
    };
    const millisPerRequest = 1000 / this.tps;
    const endDuration = new Date(Date.now() + this.duration).getTime();
    let promiseQueue: Promise<any>[] = [];

    while (Date.now() < endDuration) {
      const startTime = Date.now();
      promiseQueue.push(
        this.doRequest().then((requestResult) => {
          switch (requestResult.status) {
            case "ok":
              testResult.successful += 1;
              break;
            case "error":
              testResult.errors += 1;
              break;
          }
        }),
      );

      if (promiseQueue.length > MAX_PROMISE_QUEUE_SIZE) {
        const onlyPendingPromises = [];
        for (const p of promiseQueue) {
          if ((await promiseState(p)) === "pending") {
            onlyPendingPromises.push(p);
          }
        }
        promiseQueue = onlyPendingPromises;
      }
      const sleepTime = millisPerRequest - (Date.now() - startTime);
      if (sleepTime > 0) {
        await sleep(sleepTime);
      }
    }

    if (promiseQueue.length > 0) {
      await Promise.allSettled(promiseQueue);
    }

    return testResult;
  }

  abstract doRequest(): Promise<RequestResult>;
}
