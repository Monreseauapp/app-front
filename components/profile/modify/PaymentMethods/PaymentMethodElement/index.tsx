import { AppContext } from "@/context/context";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { Customer } from "..";
import { styles } from "./PaymentMethodElement.styles";

const stripePromise = loadStripe(
  "pk_test_51RnbRP2HJM330Lpvyil2tDcpP7YMZ0t1IuwdJ0VrPFo4GuZt8Tkic1g3mFXApMR10HmTLe3OiwxJmjxsxy2zTWsu00AGFRm7Kb"
);

interface PaymentMethodElementProps {
  customer: Customer;
  setIsAddVisible: (visible: boolean) => void;
  refetchPaymentMethods: () => void;
}

function PaymentMethodForm({
  customer,
  setIsAddVisible,
  API_URL,
  refetchPaymentMethods,
}: PaymentMethodElementProps & { API_URL: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    elements.submit();
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      elements,
      params: {
        billing_details: {
          email: customer.email,
        },
      },
    });

    setLoading(false);
    if (error) {
      setError(error.message || "Erreur lors de l'ajout du moyen de paiement.");
    } else {
      const response = await axios.post(
        `${API_URL}/stripe/new-payment-method`,
        {
          paymentMethodId: paymentMethod.id,
          customerId: customer.id,
        }
      );
      if (response.status === 200) {
        refetchPaymentMethods();
        setIsAddVisible(false);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PaymentElement />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
          {loading ? "Chargement..." : "Ajouter"}
        </Text>
      </Pressable>
      {error && <Text>{error}</Text>}
    </ScrollView>
  );
}

export default function PaymentMethodElement({
  customer,
  setIsAddVisible,
  refetchPaymentMethods,
}: PaymentMethodElementProps) {
  const { API_URL } = useContext(AppContext);
  const [secret, setSecret] = useState<string | null>(null);

  const fetchSetupIntent = async () => {
    axios
      .post(`${API_URL}/stripe/setup-intent`, {
        customerId: customer.id,
      })
      .then((response) => {
        setSecret(response.data);
      })
      .catch((error) => {
        console.error("Error fetching setup intent:", error);
      });
  };

  useEffect(
    () => {
      if (customer) {
        fetchSetupIntent();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customer, API_URL]
  );

  if (!secret) {
    return <Text>Chargement...</Text>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={
        {
          clientSecret: secret,
          appearance: { theme: "flat" },
          paymentMethodCreation: "manual",
        } as any
      }
    >
      <PaymentMethodForm
        customer={customer}
        setIsAddVisible={setIsAddVisible}
        API_URL={API_URL || ""}
        refetchPaymentMethods={refetchPaymentMethods}
      />
    </Elements>
  );
}
