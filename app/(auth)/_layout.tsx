import { AppContext } from "@/context/context";
import useFetchUserStatus from "@/hooks/useFetchUserStatus";
import {
  RelativePathString,
  Stack,
  useFocusEffect,
  usePathname,
  useRouter,
} from "expo-router";
import { useCallback, useContext } from "react";

export default function AuthLayout() {
  const router = useRouter();
  const route = usePathname();
  const { userId } = useContext(AppContext);
  const { isLoading, hasActiveSubscription, hasAgreedToTerms, refetch } =
    useFetchUserStatus();
  const isLoggedIn = !!userId;
  const isAuthRoute = [
    "/signin",
    "/signup",
    "/legal",
    "/index",
    "/payment",
  ].some((path) => route.startsWith(path));

  useFocusEffect(
    useCallback(() => {
      const checkRedirect = async () => {
        await refetch();
        if (
          isLoggedIn &&
          userId !== undefined &&
          isAuthRoute &&
          !isLoading &&
          hasActiveSubscription &&
          hasAgreedToTerms
        ) {
          router.replace("/home" as RelativePathString);
        }
      };
      checkRedirect();
    }, [
      isLoggedIn,
      userId,
      router,
      isAuthRoute,
      hasActiveSubscription,
      hasAgreedToTerms,
      isLoading,
      refetch,
    ])
  );

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name="index/index" />
      <Stack.Screen name="signin/index/index" />
      <Stack.Screen name="signup/index/index" />
      <Stack.Screen name="legal/legalNotice/index" />
    </Stack>
  );
}
