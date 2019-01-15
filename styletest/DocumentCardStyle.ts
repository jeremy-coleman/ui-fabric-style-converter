import { mergeStyles } from "@uifabric/merge-styles";
export const rootIsCompact = mergeStyles({
  selectors: {
    ":global(.ms-DocumentCard-details)": {
      display: "flex",
      flexDirection: "column",
      flex: "2",
      justifyContent: "space-between",
      overflow: "hidden"
    }
  }
});
