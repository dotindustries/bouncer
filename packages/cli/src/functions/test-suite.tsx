import React from "react";
import { useApp, useInput, useStdin, Text, Box } from "ink";
import { FunctionComponentSharedProps } from "./shared.js";
import { SequentialTaskQueue, TaskEntry } from "../utils/task-queue.js";
import { useEffect } from "react";
import { TaskList, Task } from "ink-task-list";
import spinners from "cli-spinners";
import { Test, tests } from "./test/api-tests.js";

export const timeSince = (start: bigint) => {
  const end = process.hrtime.bigint();
  return (end - start) / BigInt(1e6);
};

export const startTimer = () => process.hrtime.bigint();

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
    testsuite.forEach((test) => {
      const task = testQueue.current.push(
        async (token, progress, [opts]) => {
          const start = startTimer();
          test.data.startedAt = new Date().toLocaleTimeString();

          progress(); // started

          const res = await test.fn(opts);

          test.data.result = JSON.stringify(res);
          const execTime = timeSince(start);
          test.data.finishedAt = new Date().toLocaleTimeString();
          test.data.executionTime = `${execTime} ms`;

          if (token.cancelled) {
            throw new Error(token.reason ?? "canceled");
          }
          return res;
        },
        { args: [{ baseUrl: "http://localhost:3000/api/v1" }] }
      );

      task.then(undefined, (reason) => {
        test.data.error =
          typeof reason === "object" && reason.message
            ? reason.message
            : reason;
      });
      test.cancellationToken = task;
      // visual update
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
            <Box key={idx} flexDirection="column">
              <Text dimColor>{test.data.description}</Text>
              <TestTask test={test} key={idx} />
            </Box>
          ))}
      </Task>
    </TaskList>
  );
};

const TestTask = ({ test }: { test: Test }) => {
  const output = test.data.error
    ? typeof test.data.error === "object" && test.data.error.message
      ? test.data.error.message
      : test.data.error
    : test.data.result;
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
      output={output}
    />
  );
};
