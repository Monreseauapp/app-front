import LeftArrow from "@/assets/icons/left-arrow.svg";
import RightArrow from "@/assets/icons/right-arrow.svg";
import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "TEXTAREA", "BUTTON", "SELECT"].includes(tag)) return;
      e.preventDefault();
      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        if (currentPage > 0) {
          scrollToPage(currentPage - 1);
        }
      } else if (e.key === "ArrowRight" || e.key === " ") {
        if (currentPage < pages.length - 1 && type === "company") {
          scrollToPage(currentPage + 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, pages.length, type, scrollToPage]);
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
            <LeftArrow width={40} height={40} color={Colors.white} />
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
              <RightArrow width={40} height={40} color={Colors.white} />
            </Pressable>
          )}
        </>
      )}
    </>
  );
}
