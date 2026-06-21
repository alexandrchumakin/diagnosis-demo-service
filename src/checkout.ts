export type OrderDraft = {
  name: string;
  email: string;
  plan: "standard" | "priority";
};

export type CheckoutResult =
  | {
      status: "confirmed";
      message: string;
      developerHandoff: string;
    }
  | {
      status: "rejected";
      message: string;
    };

export function isValidCustomerEmail(email: string): boolean {
  const normalized = email.trim();
  return normalized.endsWith("@company.test");
}

export function submitOrder(order: OrderDraft): CheckoutResult {
  if (!order.name.trim()) {
    return {
      status: "rejected",
      message: "Customer name is required.",
    };
  }

  if (!isValidCustomerEmail(order.email)) {
    return {
      status: "rejected",
      message: "Use a valid customer email address.",
    };
  }

  const deliveryLabel = order.plan === "priority" ? "priority support queue" : "standard support queue";
  return {
    status: "confirmed",
    message: `Order confirmed for ${order.name.trim()}.`,
    developerHandoff: `The checkout event is ready for fulfillment in the ${deliveryLabel}.`,
  };
}
