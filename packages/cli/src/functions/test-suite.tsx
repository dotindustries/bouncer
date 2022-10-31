import React from "react";
import { useApp, useInput, useStdin, Text, Box } from "ink";
import { FunctionComponentSharedProps } from "./shared";
import {
  SequentialTaskQueue,
  CancellablePromiseLike,
  TaskEntry,
} from "../utils/task-queue";
import { useEffect } from "react";
import { TaskList, Task } from "ink-task-list";
import spinners from "cli-spinners";

export const timeSince = (start: bigint) => {
  const end = process.hrtime.bigint();
  return (end - start) / BigInt(1e6);
};

export const startTimer = () => process.hrtime.bigint();

type TestCase = {
  name: string;
  description?: string;
  startedAt?: string;
  finishedAt?: string;
  result?: string;
  executionTime?: string;
  error?: any;
};

type Test = {
  type: "api" | "event";
  fn: () => void;
  cancellationToken?: CancellablePromiseLike<any>;
  data: TestCase;
};

const tests: Test[] = [
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #1 - create a new publisher",
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #2 - create a new subscription",
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #3 - Patch an existing subscription",
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #4 - Reserve a seat in the subscription",
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #5 - Redeem a reserved seat",
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: 'Test #6 - Request some "walk-up" seats',
      description: `
This subscription has 5 total_seats.
We've already occupied one of them during the seat reservation test so let's max this out
and request 4 additional seats for \"walk-up\" users.`,
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #7 - Request a limited seat",
      description: `
At this point, we've exhausted our supply of this subscription's total_seats.
This subscription is configured to provide limited seats after the supply of standard seats
has been exhausted (subscription.seating_config.limited_overflow_seating_enabled == true).`,
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #8 - Check to see if a user has a seat",
      description: `
When a user logs in to your SaaS app, you should call this API to see if that user has a seat.
If they don't have a seat, redirect them to the main Turnstile endpoint. To keep things simple,
we'll reuse the identity of the user that we just created a limited seat for.
The seat should certainly be here since we just created it!`,
    },
  },
  {
    type: "api",
    fn: async () => {},
    data: {
      name: "Test #9 - Release a user's seat",
      description: `
Seats automatically expire on a scheduled based on the chosen seating strategy.
If needed, however, tenant administrators can remove users from seats and cancel reservations.`,
    },
  },
];

export const TestSuiteContainer = ({}: FunctionComponentSharedProps) => {
  const { exit } = useApp();
  const { setRawMode, isRawModeSupported } = useStdin();
  const [finished, setFinished] = React.useState(false);

  if (isRawModeSupported) {
    setRawMode(true);

    useInput(
      async (input, _key) => {
        if (input === "q") {
          finishedHandler();
        }

        // if (input === "c") {
        //   setCanceled(true);
        // }

        // if (key.leftArrow) {
        //   // Left arrow key pressed
        // }
      },
      { isActive: !finished }
    );
  } else {
    console.warn("terminal does not support input");
  }

  const finishedHandler = React.useCallback(() => {
    setFinished(true);
    exit();
  }, []);

  return (
    <Box flexDirection="column">
      <Box marginBottom={2}>
        <Text bold>End to End test runner</Text>
      </Box>
      <TestSuite testsuite={tests} onFinished={finishedHandler} />
      {finished && isRawModeSupported && (
        <Box marginTop={2}>
          <Text color={"green"}>
            Test suite finished.... Press [Ctrl-C] to exit
          </Text>
        </Box>
      )}
    </Box>
  );
};

type TestSuiteProps = {
  isCanceled?: boolean;
  onFinished: () => void;
  testsuite: Test[];
};

const TestSuite = ({ onFinished, isCanceled, testsuite }: TestSuiteProps) => {
  const testQueue = React.useRef(new SequentialTaskQueue());

  const promises = () => testsuite.filter((test) => test.cancellationToken);

  const [data, setData] = React.useState(promises());

  const updateTasks = () => {
    setData(promises());
  };

  const refreshHandler = (_task: TaskEntry) => {
    updateTasks();
  };

  const exitHandler = () => {
    testQueue.current.close();
    removeListeners();

    onFinished();
  };

  const removeListeners = () => {
    testQueue.current.off("drained", exitHandler);
    testQueue.current.off("finished", refreshHandler);
    testQueue.current.off("progress", refreshHandler);
  };

  const runTestSuite = () => {
    testsuite.forEach((test, idx) => {
      const task = testQueue.current.push(
        (token, progress) => {
          return new Promise((resolve) => {
            const start = startTimer();
            test.data.startedAt = new Date().toLocaleTimeString();

            progress(); // started

            // dummy delay
            setTimeout(() => {
              test.data.result = "yay result";

              const execTime = timeSince(start);
              test.data.finishedAt = new Date().toLocaleTimeString();
              test.data.executionTime = `${execTime} ms`;

              // execute test
              resolve(test.fn());
            }, Math.random() * 500);
          }).then(
            (resp) =>
              new Promise((resolve, reject) => {
                if (token.cancelled) reject(token.reason ?? "canceled");
                else resolve(resp);
              })
          );
        },
        { args: [idx] }
      );
      test.cancellationToken = task;
      task.then(undefined, (reason) => {
        test.data.error = reason;
      });
      updateTasks();
    });
  };

  useEffect(() => {
    if (testsuite.length === 0) {
      onFinished();
      return;
    }

    testQueue.current.on("progress", refreshHandler);
    testQueue.current.on("finished", refreshHandler);
    testQueue.current.on("drained", exitHandler);
    runTestSuite();

    return removeListeners;
  }, []);

  useEffect(() => {
    if (isCanceled && !testQueue.current.isClosed) {
      testQueue.current.cancel();
    }
  }, [isCanceled]);

  return (
    <TaskList>
      <Task
        label="🧪 API tests"
        state={
          data.filter((t) => t.type === "api" && t.data.result).length > 0
            ? "success"
            : "loading"
        }
        isExpanded={true}
        spinner={spinners.dots}
      >
        {data
          .filter((t) => t.type === "api")
          .map((test, idx) => (
            <Box key={idx} flexDirection="column">
              <Text dimColor>{test.data.description}</Text>
              <TestTask test={test} />
            </Box>
          ))}
      </Task>
      <Task
        label="👀 Verify events"
        state={
          data.filter((t) => t.type === "api" && t.data.result).length > 0
            ? "success"
            : data.filter((t) => t.type === "api" && t.cancellationToken)
                .length > 0
            ? "loading"
            : "pending"
        }
        isExpanded={true}
        spinner={spinners.dots}
      >
        {data
          .filter((t) => t.type === "event")
          .map((test, idx) => (
            <TestTask test={test} key={idx} />
          ))}
      </Task>
    </TaskList>
  );
};

const TestTask = ({ test }: { test: Test }) => {
  return (
    <Task
      label={test.data.name}
      status={test.data.executionTime ? `${test.data.executionTime}` : ``}
      state={
        !test.cancellationToken || !test.data.startedAt
          ? "pending"
          : test.data.result
          ? "success"
          : test.data.error
          ? "error"
          : "loading"
      }
      spinner={spinners.dots}
      output={test.data.result}
    />
  );
};
