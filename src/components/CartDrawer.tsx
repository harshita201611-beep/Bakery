import { FormEvent, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartQuantities: Record<string, number>;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

interface ConfirmedOrder {
  orderId: string;
  fulfillment: 'pickup' | 'delivery';
  slot: string;
  total: number;
  customerName: string;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartQuantities,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [slot, setSlot] = useState('Today · 11:30 AM Hearth Pull');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  if (!isOpen) return null;

  const cartEntries = Object.entries(cartQuantities)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = MENU_ITEMS.find((item) => item.id === id);
      return product ? { product, qty } : null;
    })
    .filter((entry): entry is { product: MenuItem; qty: number } => entry !== null);

  const subtotal = cartEntries.reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0
  );

  const freeDeliveryThreshold = 1000;
  const deliveryFee =
    fulfillment === 'delivery' && subtotal > 0 && subtotal < freeDeliveryThreshold ? 80 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (cartEntries.length === 0) return;

    const orderNum = Math.floor(4300 + Math.random() * 699);
    setConfirmedOrder({
      orderId: `#HR-${orderNum}`,
      fulfillment,
      slot,
      total: grandTotal,
      customerName: customerName.trim() || 'Guest',
    });
    onClearCart();
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1d261a]/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-[#fdf9f3] h-full flex flex-col border-l border-[#d3c3bd] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#d3c3bd]/60 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#3e4e38]" />
            <h2 className="font-serif text-xl font-semibold text-[#3e4e38]">
              Your Bakery Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close bag"
            className="p-2 rounded-full text-[#4f4540] hover:bg-[#f1ede7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrder ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-[#d6e8cd] text-[#3e4e38] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#556b2f] mb-1">
                Order {confirmedOrder.orderId} Confirmed
              </p>
              <h3 className="font-serif text-2xl font-semibold text-[#3e4e38] mb-3">
                Reserved in the Hearth Queue
              </h3>
              <p className="text-sm text-[#4f4540] leading-relaxed mb-6">
                Thank you, {confirmedOrder.customerName}. Your fresh batch is reserved for{' '}
                <span className="font-medium text-[#3e4e38]">{confirmedOrder.slot}</span> (
                {confirmedOrder.fulfillment === 'pickup'
                  ? 'Studio Pickup at Sector 43'
                  : 'Gurgaon Local Delivery'}
                ).
              </p>
              <div className="bg-white rounded-xl border border-[#d3c3bd]/70 p-4 text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#4f4540]">Order Reference</span>
                  <span className="font-semibold text-[#3e4e38] tabular-nums">
                    {confirmedOrder.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4f4540]">Total Payable (UPI / COD / Counter)</span>
                  <span className="font-semibold text-[#24140b] tabular-nums">
                    ₹{confirmedOrder.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-full bg-[#3e4e38] text-white text-sm font-medium hover:bg-[#323d2e] transition-colors"
              >
                Continue Exploring Menu
              </button>
            </div>
          ) : cartEntries.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="w-10 h-10 text-[#81756f] mx-auto mb-3" />
              <h3 className="font-serif text-xl font-medium text-[#3e4e38] mb-2">
                Your bag is currently empty
              </h3>
              <p className="text-sm text-[#4f4540] mb-6">
                Add freshly baked loaves, laminated viennoiserie, or single-estate coffees from the menu.
              </p>
              <a
                href="#menu"
                onClick={handleClose}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#97472e] text-white text-sm font-medium hover:bg-[#772f18] transition-colors"
              >
                Browse Daily Menu
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Itemized List */}
              <ul className="space-y-4">
                {cartEntries.map(({ product, qty }) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-3.5 bg-white p-3 rounded-xl border border-[#d3c3bd]/60"
                  >
                    <div className="w-16 h-14 rounded-lg overflow-hidden bg-[#f1ede7] shrink-0">
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-[#3e4e38] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#584237] tabular-nums mt-0.5">
                        ₹{product.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        aria-label={`Remove one ${product.name}`}
                        className="w-7 h-7 rounded-full border border-[#d3c3bd] flex items-center justify-center text-[#3e4e38] hover:bg-[#f1ede7]"
                      >
                        {qty === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                      </button>
                      <span className="w-5 text-center text-xs font-bold tabular-nums text-[#3e4e38]">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        aria-label={`Add one ${product.name}`}
                        className="w-7 h-7 rounded-full border border-[#d3c3bd] flex items-center justify-center text-[#3e4e38] hover:bg-[#f1ede7]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Fulfillment & Checkout Form */}
              <form id="bag-checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-[#d3c3bd]/60">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#584237] mb-2">
                    Fulfillment Method
                  </span>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#f1ede7] rounded-xl border border-[#d3c3bd]/60">
                    <button
                      type="button"
                      onClick={() => setFulfillment('pickup')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                        fulfillment === 'pickup'
                          ? 'bg-white text-[#3e4e38] shadow-sm'
                          : 'text-[#4f4540]'
                      }`}
                    >
                      Studio Pickup (Free)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillment('delivery')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                        fulfillment === 'delivery'
                          ? 'bg-white text-[#3e4e38] shadow-sm'
                          : 'text-[#4f4540]'
                      }`}
                    >
                      Gurgaon Delivery
                    </button>
                  </div>
                  {fulfillment === 'delivery' && subtotal < freeDeliveryThreshold && (
                    <p className="text-[11px] text-[#556b2f] mt-1.5 tabular-nums">
                      Add ₹{freeDeliveryThreshold - subtotal} more for complimentary Gurgaon delivery.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bag-slot"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#584237] mb-1.5"
                  >
                    Hearth Batch Slot
                  </label>
                  <select
                    id="bag-slot"
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 text-xs text-[#323d2e] focus:outline-none focus:border-[#3e4e38]"
                  >
                    <option>Today · 11:30 AM Hearth Pull</option>
                    <option>Today · 4:00 PM Afternoon Batch</option>
                    <option>Tomorrow · 8:00 AM Morning Pull</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="bag-name" className="block text-xs font-medium text-[#3e4e38] mb-1">
                      Your Name
                    </label>
                    <input
                      id="bag-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Rohan Kapoor"
                      className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 text-xs text-[#323d2e] focus:outline-none focus:border-[#3e4e38]"
                    />
                  </div>
                  <div>
                    <label htmlFor="bag-phone" className="block text-xs font-medium text-[#3e4e38] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="bag-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98110..."
                      className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 text-xs text-[#323d2e] focus:outline-none focus:border-[#3e4e38]"
                    />
                  </div>
                </div>

                {fulfillment === 'delivery' && (
                  <div>
                    <label htmlFor="bag-address" className="block text-xs font-medium text-[#3e4e38] mb-1">
                      Gurgaon Delivery Address &amp; Pin Code
                    </label>
                    <input
                      id="bag-address"
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Tower B, DLF Crest, Sector 54, 122002"
                      className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 text-xs text-[#323d2e] focus:outline-none focus:border-[#3e4e38]"
                    />
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {!confirmedOrder && cartEntries.length > 0 && (
          <div className="p-6 bg-white border-t border-[#d3c3bd]/70 space-y-3">
            <div className="space-y-1.5 text-xs text-[#4f4540]">
              <div className="flex justify-between">
                <span>Subtotal (incl. GST)</span>
                <span className="tabular-nums font-medium text-[#323d2e]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{fulfillment === 'pickup' ? 'Sector 43 Studio Pickup' : 'Local Courier'}</span>
                <span className="tabular-nums font-medium text-[#323d2e]">
                  {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#d3c3bd]/40 text-sm font-semibold text-[#3e4e38]">
                <span>Total Payable (UPI / COD / Counter)</span>
                <span className="font-serif text-lg tabular-nums text-[#24140b]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="bag-checkout-form"
              className="w-full py-3.5 rounded-full bg-[#97472e] hover:bg-[#772f18] text-white text-sm font-medium transition-colors"
            >
              Confirm {fulfillment === 'pickup' ? 'Pickup' : 'Delivery'} Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
