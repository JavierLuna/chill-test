export const promiseState = async <T>(
  promise: Promise<T>,
): Promise<"pending" | "fulfilled" | "rejected"> => {
  return Promise.race([promise, "pending"]).then(
    (value) => (value === "pending" ? "pending" : "fulfilled"),
    () => "rejected",
  );
};
