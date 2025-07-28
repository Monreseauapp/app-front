import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  ScrollView,
  Text,
} from "react-native";

const stripePromise = loadStripe(
  "pk_test_51RnbRP2HJM330Lpvyil2tDcpP7YMZ0t1IuwdJ0VrPFo4GuZt8Tkic1g3mFXApMR10HmTLe3OiwxJmjxsxy2zTWsu00AGFRm7Kb"
);

const { width } = Dimensions.get("window");

function CheckoutForm({ secret }: { secret: string }) {
  const { new_pm, subscribe } = useLocalSearchParams();
  const { API_URL } = useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: GestureResponderEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    if (subscribe) {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://your-site.com/payment-success",
        },
      });
      setLoading(false);
      if (error) setError(error.message || "Payment failed.");
    } else if (new_pm) {
      elements.submit();
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        elements,
        params: {
          billing_details: {
            email: "test@example.com",
          },
        },
      });
      setLoading(false);
      if (error) {
        setError(error.message || "Failed to create payment method.");
      } else {
        const response = await axios.patch(
          `${API_URL}/stripe/update-user-default-payment-method`,
          {
            customerId: "cus_SjRaOhEDuqR6z3",
            paymentMethodId: paymentMethod.id,
          }
        );
      }
      return;
    }
  };
  return (
    <ScrollView
      style={{
        width: width >= 768 ? "60%" : "90%",
        alignSelf: "center",
        marginTop: 150,
        padding: 20,
      }}
    >
      <PaymentElement />
      <Pressable
        onPress={(e: GestureResponderEvent) => handleSubmit(e)}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: Colors.violet,
          width: width >= 768 ? "40%" : "60%",
          alignSelf: "center",
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: Colors.white,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {loading ? "Chargement..." : "Payer"}
        </Text>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </Pressable>
    </ScrollView>
  );
}

export default function StripeComponent() {
  const { API_URL } = useContext(AppContext);
  const { new_pm, subscribe } = useLocalSearchParams();
  const [options, setOptions] = useState<{
    clientSecret: string;
    appearance?: {
      theme?: "stripe" | "flat" | "night";
    };
    paymentMethodCreation?: "automatic" | "manual";
  }>({
    clientSecret: "",
  });

  const handleSubscribe = async () => {
    const customer = await axios
      .post(`${API_URL}/stripe/create-customer`, {
        email: "test@example.com",
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error creating customer:", err);
      });
    const subscription = await axios
      .post(`${API_URL}/stripe/create-subscription`, {
        customerId: customer.id,
        priceId: "price_1RnfGh2HJM330Lpv8uxiHPQ8",
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error creating subscription:", err);
      });
    setOptions({
      clientSecret:
        subscription.latest_invoice.confirmation_secret.client_secret,
      appearance: {
        theme: "flat",
      },
      paymentMethodCreation: "manual",
    });
  };
  if (!options.clientSecret) {
    return (
      <Pressable onPress={handleSubscribe}>
        <Text>{subscribe ? "Subscribe" : "Update payment method"}</Text>
      </Pressable>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm secret={options.clientSecret} />
    </Elements>
  );
}
