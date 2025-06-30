import LeftArrow from "@/assets/icons/left-arrow.svg";
import RightArrow from "@/assets/icons/right-arrow.svg";
import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable } from "react-native";

type NavigationProps = {
  currentPage: number;
  pages: any[];
  type: string;
  scrollToPage: (page: number) => void;
};

export default function Navigation({
  currentPage,
  pages,
  type,
  scrollToPage,
}: NavigationProps) {
  return (
    <>
      {currentPage > 0 && (
        <>
          <Pressable
            onPress={() => scrollToPage(currentPage - 1)}
            style={{
              position: "absolute",
              left: 24,
              bottom: 24,
              width: 40,
              height: 40,
            }}
          >
            <LeftArrow width={40} height={40} color={Colors.background} />
          </Pressable>

          {currentPage < pages.length - 1 && type === "company" && (
            <Pressable
              onPress={() => scrollToPage(currentPage + 1)}
              style={{
                position: "absolute",
                right: 24,
                bottom: 24,
                width: 40,
                height: 40,
              }}
            >
              <RightArrow width={40} height={40} color={Colors.background} />
            </Pressable>
          )}
        </>
      )}
    </>
  );
}
