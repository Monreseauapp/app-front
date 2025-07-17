import { AppContext } from "@/context/context";
import { Stack, usePathname, useRouter } from "expo-router";
import { useContext, useEffect } from "react";

export default function AuthLayout() {
  const router = useRouter();
  const route = usePathname();
  const { userId } = useContext(AppContext);
  const isLoggedIn = !!userId;
  const isAuthRoute = ["/signin", "/signup", "/legal", "/index"].some((path) =>
    route.startsWith(path)
  );

  useEffect(() => {
    if (isLoggedIn && userId !== undefined && isAuthRoute) {
      router.replace("/home");
    }
  }, [isLoggedIn, userId, route, router]);

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name="index/index" />
      <Stack.Screen name="signin/index/index" />
      <Stack.Screen name="signup/index/index" />
      <Stack.Screen name="legal/legalNotice/index" />
    </Stack>
  );
}
