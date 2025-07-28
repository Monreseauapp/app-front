import CreditCardIcon from "@/assets/icons/credit-card.svg";
import CrossIcon from "@/assets/icons/cross.svg";
import StarIcon from "@/assets/icons/star.svg";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { PaymentMethod } from "@stripe/stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import PaymentMethodElement from "./PaymentMethodElement";
import { styles } from "./PaymentMethods.styles";

export type Customer = {
  invoice_settings?: {
    default_payment_method?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

const { width } = Dimensions.get("window");

export default function PaymentMethods() {
  const { API_URL, companyId } = useContext(AppContext);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[] | null>(
    null
  );
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isAddVisible, setIsAddVisible] = useState(false);

  const fetchPaymentMethods = async () => {
    if (companyId) {
      await axios
        .get(`${API_URL}/company/${companyId}/customer`)
        .then((response) => {
          setCustomer(response.data);
        })
        .catch((error) => {
          console.error("Error fetching customer:", error);
          setCustomer(null);
        });
      await axios
        .get(`${API_URL}/company/${companyId}/payment-methods`)
        .then((response) => {
          setPaymentMethods(response.data);
        })
        .catch((error) => {
          console.error("Error fetching payment methods:", error);
          setPaymentMethods(null);
        });
    }
  };

  const changeDefaultPaymentMethod = async (paymentMethodId: string) => {
    if (customer) {
      try {
        await axios.patch(`${API_URL}/stripe/default-payment-method`, {
          customerId: customer.id,
          paymentMethodId,
        });
        setCustomer((prevCustomer) => ({
          ...prevCustomer,
          invoice_settings: {
            ...prevCustomer?.invoice_settings,
            default_payment_method: paymentMethodId,
          },
        }));
      } catch (error) {
        console.error("Error changing default payment method:", error);
      }
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    if (customer) {
      try {
        await axios.delete(
          `${API_URL}/stripe/payment-method/${paymentMethodId}`
        );
        setPaymentMethods(
          (prevMethods) =>
            prevMethods?.filter((method) => method.id !== paymentMethodId) ||
            null
        );
      } catch (error) {
        console.error("Error deleting payment method:", error);
      }
    }
  };

  useEffect(
    () => {
      fetchPaymentMethods();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [API_URL, companyId]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moyens de paiement</Text>
      <Text style={styles.subtitle}>Gérez vos moyens de paiement</Text>
      {paymentMethods ? (
        paymentMethods.map((method) => (
          <View key={method.id} style={styles.methodContainer}>
            <View style={styles.informationsContainer}>
              <CreditCardIcon
                style={{
                  width: 100,
                  marginRight: 15,
                }}
              />
              <View style={styles.informations}>
                <Text>
                  {method.card && method.card.brand
                    ? method.card.brand[0].toLocaleUpperCase() +
                      method.card.brand.slice(1)
                    : ""}
                </Text>
                <Text>**** **** **** {method.card?.last4}</Text>
                <Text style={styles.expiry}>
                  Expiration: {method.card?.exp_month}/{method.card?.exp_year}
                </Text>
              </View>
            </View>
            {customer &&
            customer.invoice_settings &&
            customer.invoice_settings.default_payment_method === method.id ? (
              <View style={styles.default}>
                <Text style={styles.defaultText}>Par défaut</Text>
              </View>
            ) : (
              <View style={styles.actionsContainer}>
                <Pressable
                  onPress={() => changeDefaultPaymentMethod(method.id)}
                  style={styles.actionButton}
                >
                  {width > 800 ? (

                    <StarIcon
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 10,
                      }}
                      color={Colors.violet}
                    />
                  ) : (
                    <Text style={styles.actionButtonText}>
                      Définir par défaut
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  onPress={() => handleDeletePaymentMethod(method.id)}
                  style={styles.actionButton}
                >
                  {width > 800 ? (
                    <CrossIcon
                      style={{
                        width: 45,
                        height: 45,
                        marginRight: 10,
                      }}
                    />
                  ) : (
                    <Text style={styles.actionButtonText}>Supprimer</Text>
                  )}
                </Pressable>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text>Aucun moyen de paiement trouvé.</Text>
      )}
      <Pressable
        style={styles.addButton}
        onPress={() => setIsAddVisible(!isAddVisible)}
      >
        <Text style={styles.addButtonText}>
          Ajouter un autre moyen de paiement
        </Text>
      </Pressable>
      {isAddVisible && customer && (
        <PaymentMethodElement
          customer={customer}
          setIsAddVisible={setIsAddVisible}
          refetchPaymentMethods={fetchPaymentMethods}
        />
      )}
    </View>
  );
}
