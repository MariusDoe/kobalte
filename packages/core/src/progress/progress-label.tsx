import { mergeDefaultProps } from "@kobalte/utils";
import { ComponentProps, createEffect, onCleanup, splitProps } from "solid-js";

import { Polymorphic } from "../polymorphic";
import { useProgressContext } from "./progress-context";

/**
 * An accessible label that gives the user information on the progress.
 */
export function ProgressLabel(props: ComponentProps<"span">) {
  const context = useProgressContext();

  props = mergeDefaultProps(
    {
      id: context.generateId("label"),
    },
    props
  );

  const [local, others] = splitProps(props, ["id"]);

  createEffect(() => onCleanup(context.registerLabelId(local.id!)));

  return <Polymorphic fallback="span" id={local.id} {...context.dataset()} {...others} />;
}
