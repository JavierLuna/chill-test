import { AtLeastOne } from "./types";

export const sleep = (millis: number) =>
  new Promise((resolve) => setTimeout(resolve, millis));

export type Duration = AtLeastOne<{
  hours?: number;
  minutes?: number;
  seconds?: number;
}>;

export const durationToMillis = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
}: Duration): number => (seconds + minutes * 60 + hours * 60 * 60) * 1000;
