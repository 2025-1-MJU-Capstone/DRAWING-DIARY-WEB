import React, { forwardRef, useCallback } from "react";
import BottomSheet, {
  BottomSheetView,
  BottomSheetProps,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

interface CustomBottomSheetProps extends BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  ({ children, snapPoints = ["35%"], ...props }, ref) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior='close'
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        style={{
          zIndex: 10,
          elevation: 10,
        }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        {...props}
      >
        <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
      </BottomSheet>
    );
  }
);

export default CustomBottomSheet;
