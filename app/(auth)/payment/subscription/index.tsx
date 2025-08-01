import { AppContext } from "@/context/context";
import { Subscription, SubscriptionState, SubscriptionType } from "@/types";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  GestureResponderEvent,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles, webStyles } from "./subscription.styles";
const stripePromise = loadStripe(
  process.env.EXPO_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY || "",
);
export default function SubscriptionPage() {
  const { email, success, redirect } = useLocalSearchParams();
  const pathname = window.location.href;
  const router = useRouter();
  const { API_URL } = useContext(AppContext);
  const [secret, setSecret] = useState();
  const [error, setError] = useState<string | null>(null);
  const subscriptionTypesKey: Record<SubscriptionType, string> = {
    [SubscriptionType.Indep]: "monthly_indep",
    [SubscriptionType.VSB]: "monthly_tpe",
    [SubscriptionType.SMB]: "monthly_pme",
  };
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined,
  );
  const redirectUrl = decodeURIComponent((redirect as string) || "");
  useEffect(() => {
    const fetchSubscription = async () => {
      const company = await axios
        .get(`${API_URL}/company/email/${email}`)
        .then((response) => response.data)
        .catch(() => {
          setError(
            "L'utilisateur n'existe pas. Veuillez vous inscrire avant de souscrire.",
          );
        });
      if (company && company.subscriptionId) {
        const subscriptionData = await axios
          .get(`${API_URL}/subscription/${company.subscriptionId}`)
          .then((response) => response.data)
          .catch(() => {
            setError(
              "L'utilisateur n'existe pas. Veuillez vous inscrire avant de souscrire.",
            );
          });
        setSubscription(subscriptionData);
      } else {
        setError(
          "L'utilisateur n'existe pas. Veuillez vous inscrire avant de souscrire.",
        );
      }
    };
    fetchSubscription();
  }, [success, email, API_URL]);
  useEffect(
    () => {
      const findCustomer = async () => {
        const response = await axios.get(`${API_URL}/stripe/customer/${email}`);
        return response.data;
      };
      const findSubscription = async (customerId: string) => {
        const response = await axios.get(
          `${API_URL}/stripe/subscription/customer/${customerId}`,
        );
        return response.data;
      };
      const initializeStripe = async () => {
        const customer = await findCustomer();
        if (customer) {
          const stripeSubscription = await findSubscription(customer.id);
          if (
            stripeSubscription &&
            stripeSubscription.latest_invoice.status === "paid" &&
            subscription
          ) {
            await axios.patch(`${API_URL}/subscription/${subscription.id}`, {
              state: SubscriptionState.ACTIVE,
              startDate: new Date(
                stripeSubscription.start_date * 1000,
              ).toISOString(),
              endDate: stripeSubscription.ended_at
                ? new Date(stripeSubscription.ended_at * 1000).toISOString()
                : null,
            });
            if (!pathname.includes("success")) {
              router.push(`${pathname}&success=true` as RelativePathString);
            }
            return;
          } else if (
            stripeSubscription &&
            stripeSubscription.latest_invoice.confirmation_secret.client_secret
          ) {
            setSecret(
              stripeSubscription.latest_invoice.confirmation_secret
                .client_secret,
            );
            return;
          }
        }
        try {
          let stripeCustomer;
          if (!customer) {
            stripeCustomer = await axios
              .post(`${API_URL}/stripe/create-customer`, {
                email,
              })
              .then((response) => response.data)
              .catch(() => {
                setError("Essayer de recharger la page.");
              });
          } else {
            stripeCustomer = customer;
          }
          const company = await axios
            .get(`${API_URL}/company/email/${email}`)
            .then((response) => response.data)
            .catch(() => {
              setError("Essayer de recharger la page.");
            });
          if (company) {
            await axios.patch(`${API_URL}/company/${company.id}`, {
              stripeCustomerId: stripeCustomer.id,
            });
          } else {
            setError(
              "L'utilisateur n'existe pas. Veuillez vous inscrire avant de souscrire.",
            );
          }
          const stripeSubscription = await axios
            .post(`${API_URL}/stripe/create-subscription`, {
              customerId: stripeCustomer.id,
              lookupKey:
                subscriptionTypesKey[subscription?.type as SubscriptionType],
            })
            .then((response) => response.data)
            .catch(() => {
              setError("Essayer de recharger la page.");
            });
          setSecret(
            stripeSubscription.latest_invoice.confirmation_secret.client_secret,
          );
        } catch {
          setError("Essayer de recharger la page.");
        }
      };
      if (subscription) {
        initializeStripe();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subscription, email, API_URL, pathname, router],
  );
  if (!email && !success) {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Email is required for subscription.</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.main}>
        <Text style={{ ...styles.title, color: "red" }}>{error}</Text>
      </View>
    );
  }
  if (!secret && !success) {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <Image
        source={require("@/assets/images/white-logo.png")}
        style={Platform.select({
          web: webStyles.logo,
          default: styles.logo,
        })}
      />
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: secret,
          appearance: {
            theme: "flat",
          },
        }}
      >
        {success ? (
          <>
            <Text style={styles.title}>Souscription réussie!</Text>
            <Pressable
              onPress={() => {
                router.dismissAll();
                router.push(
                  redirectUrl
                    ? (redirectUrl.toString() as RelativePathString)
                    : (("/legal/legalNotice?email=" +
                        email) as RelativePathString),
                );
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Continuer</Text>
            </Pressable>
          </>
        ) : (
          <SubscriptionForm pathname={pathname} subscription={subscription} />
        )}
      </Elements>
    </View>
  );
}
function SubscriptionForm({
  pathname,
  subscription,
}: {
  pathname: string;
  subscription?: Subscription;
}) {
  const { API_URL } = useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: GestureResponderEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${pathname}&success=true`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Payment failed.");
    } else {
      await axios.patch(`${API_URL}/subscription/${subscription?.id}`, {
        status: SubscriptionState.ACTIVE,
        startDate: new Date().toISOString(),
      });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <PaymentElement />
      <Pressable
        onPress={handleSubmit}
        disabled={!stripe || loading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {loading ? "Chargement..." : "Payer"}
        </Text>
      </Pressable>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </ScrollView>
  );
}
