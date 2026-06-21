import { FormEvent, useState } from "react";
import { CheckoutResult, OrderDraft, submitOrder } from "./checkout";
import "./style.css";

const initialOrder: OrderDraft = {
  name: "",
  email: "",
  plan: "priority",
};

export function App() {
  const [order, setOrder] = useState<OrderDraft>(initialOrder);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(submitOrder(order));
  }

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Self-explaining automation demo</p>
        <h1>Checkout Diagnostics</h1>
        <p>
          A tiny UI that represents a developer-owned service. The E2E test covers only the real
          customer flow, and AI explains the failure when a PR breaks it.
        </p>
      </section>

      <section className="panel" aria-label="Checkout form">
        <div>
          <p className="section-kicker">Release-critical flow</p>
          <h2>Priority support checkout</h2>
          <p className="muted">
            The order should accept normal customer emails like <strong>sam@example.com</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Customer name
            <input
              data-testid="customer-name"
              value={order.name}
              onChange={(event) => setOrder({ ...order, name: event.target.value })}
              placeholder="Sam Developer"
            />
          </label>

          <label>
            Customer email
            <input
              data-testid="customer-email"
              value={order.email}
              onChange={(event) => setOrder({ ...order, email: event.target.value })}
              placeholder="sam@example.com"
            />
          </label>

          <label>
            Support plan
            <select
              data-testid="support-plan"
              value={order.plan}
              onChange={(event) => setOrder({ ...order, plan: event.target.value as OrderDraft["plan"] })}
            >
              <option value="priority">Priority</option>
              <option value="standard">Standard</option>
            </select>
          </label>

          <button data-testid="submit-order" type="submit">
            Place order
          </button>
        </form>

        <div className={`result ${result?.status ?? "idle"}`} data-testid="order-status">
          {result ? result.message : "Waiting for customer details."}
        </div>

        {result?.status === "confirmed" ? (
          <div className="handoff" data-testid="developer-handoff">
            {result.developerHandoff}
          </div>
        ) : null}
      </section>
    </main>
  );
}
