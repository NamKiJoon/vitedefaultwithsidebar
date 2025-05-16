import styledBase from "@emotion/styled";

export const styles = (base: any) =>
  styledBase(base, {
    shouldForwardProp: (prop) =>
      !["isActive", "isOpen", "highlighted"].includes(prop),
  });
