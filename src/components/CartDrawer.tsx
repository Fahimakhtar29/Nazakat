import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, Check, Sparkles, Gift, Truck, Phone } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { SAMPLE_VIALS_LIST } from '../data/perfumes';
import { MOBILE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_LINK } from '../constants/brand';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  activeCurrency: Currency;
  onUpdateQuantity: (productId: string, volumeMl: number, delta: number) => void;
  onRemoveItem: (productId: string, volumeMl: number) => void;
  onClearCart: () => void;
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  activeCurrency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
}) => {
  if (!isOpen) return null;

  const [selectedSamples, setSelectedSamples] = useState<string[]>(['v1', 'v2']);
  const [isGiftBoxAdded, setIsGiftBoxAdded] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Address fields
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Rajesh Sharma',
    phone: '9876543210',
    address: '42, Park Street, Near Metro Station',
    city: 'New Delhi',
    pincode: '110001',
  });

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.calculatedPriceUSD * item.quantity, 0);
  const giftBoxPrice = isGiftBoxAdded ? 2 : 0; // ~150 Rs
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const shippingPrice = 0; // Free shipping across India
  const finalTotalUSD = Math.max(0, rawSubtotal - discountAmount + giftBoxPrice + shippingPrice);

  const toggleSample = (id: string) => {
    if (selectedSamples.includes(id)) {
      setSelectedSamples(selectedSamples.filter((s) => s !== id));
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, id]);
      }
    }
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SHAHI10' || couponCode.toUpperCase() === 'ROYAL10') {
      setDiscountPercent(10);
      setCouponMsg('✓ 10% Welcome Discount Applied!');
    } else if (couponCode.toUpperCase() === 'INDIAN20') {
      setDiscountPercent(20);
      setCouponMsg('✓ 20% Heritage Discount Applied!');
    } else {
      setCouponMsg('Invalid coupon. Try "SHAHI10"');
    }
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      onCheckoutSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm font-sans">
      <div className="relative w-full max-w-lg bg-[#0E0E0E] border-l border-[#D4AF37]/30 h-full flex flex-col shadow-2xl">
        {/* Top Header */}
        <div className="p-5 bg-[#080808] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              Your Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Cart Content */}
        {!checkoutComplete ? (
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cartItems.length > 0 ? (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.volumeMl}`}
                      className="p-3.5 rounded-xl bg-[#141414] border border-zinc-800 flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 object-contain bg-[#0A0A0A] p-1 rounded border border-zinc-800"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1">
                        <h4 className="font-serif font-bold text-white text-sm">{item.product.name}</h4>
                        <div className="text-[11px] text-zinc-400">
                          {item.volumeMl}ml Bottle {item.engravingText ? `• Name: "${item.engravingText}"` : ''}
                        </div>
                        <div className="text-xs text-[#D4AF37] font-bold mt-0.5">
                          {formatPrice(item.calculatedPriceUSD, activeCurrency)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-zinc-700 rounded bg-[#0A0A0A]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.volumeMl, -1)}
                            className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.volumeMl, 1)}
                            className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id, item.volumeMl)}
                          className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free Samples */}
                <div className="p-3.5 rounded-xl bg-[#141414] border border-[#D4AF37]/30 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="uppercase tracking-wider text-[#D4AF37] font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Choose 2 FREE Sample Vials
                    </span>
                    <span className="text-[10px] text-zinc-400">{selectedSamples.length}/2 Selected</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {SAMPLE_VIALS_LIST.slice(0, 4).map((sample) => {
                      const isSelected = selectedSamples.includes(sample.id);
                      return (
                        <button
                          key={sample.id}
                          onClick={() => toggleSample(sample.id)}
                          className={`p-2 rounded text-left border text-xs flex items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-bold'
                              : 'bg-[#0A0A0A] border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span className="truncate">{sample.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Velvet Gift Box */}
                <div className="p-3.5 rounded-xl bg-[#141414] border border-zinc-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-zinc-200 font-semibold flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#D4AF37]" /> Add Royal Gift Box Wrapping (₹150)
                    </label>
                    <input
                      type="checkbox"
                      checked={isGiftBoxAdded}
                      onChange={(e) => setIsGiftBoxAdded(e.target.checked)}
                      className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                    />
                  </div>

                  {isGiftBoxAdded && (
                    <input
                      type="text"
                      placeholder="Enter gift message for card (e.g. Happy Birthday Brother!)..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      className="w-full bg-[#080808] border border-zinc-700 rounded p-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                  )}
                </div>

                {/* Coupon Code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code (Use SHAHI10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-[#141414] border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-300 text-xs font-bold uppercase rounded transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && <p className="text-xs text-[#D4AF37] font-sans">{couponMsg}</p>}

                {/* Shipping Form */}
                <form onSubmit={handleProcessOrder} className="pt-3 border-t border-zinc-800 space-y-2.5">
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                    Delivery Address Details
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Full Name"
                      className="bg-[#141414] border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="Mobile Number"
                      className="bg-[#141414] border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                  </div>

                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="House No, Colony, Landmark"
                    className="w-full bg-[#141414] border border-zinc-800 rounded p-2 text-xs text-white"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      placeholder="City"
                      className="bg-[#141414] border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      required
                      value={customerInfo.pincode}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                      placeholder="Pincode"
                      className="bg-[#141414] border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-3.5 rounded-xl bg-[#080808] border border-[#D4AF37]/30 space-y-2 text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(rawSubtotal, activeCurrency)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-{formatPrice(discountAmount, activeCurrency)}</span>
                      </div>
                    )}

                    {isGiftBoxAdded && (
                      <div className="flex justify-between text-amber-200">
                        <span>Gift Box</span>
                        <span>+{formatPrice(2, activeCurrency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Delivery Across India</span>
                      <span>FREE</span>
                    </div>

                    <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-white text-sm">
                      <span>Total Payable</span>
                      <span className="text-[#D4AF37] font-serif">
                        {formatPrice(finalTotalUSD, activeCurrency)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#f1d279] to-[#B8860B] text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" /> Placing Order...
                      </>
                    ) : (
                      <>
                        <Truck className="w-4 h-4" /> Place Order • Cash on Delivery / UPI
                      </>
                    )}
                  </button>

                  {/* Order Assistance Contact Note */}
                  <div className="text-[11px] text-zinc-400 text-center space-y-1 pt-1">
                    <p className="font-semibold text-zinc-300">Need order help or instant assistance?</p>
                    <div className="flex items-center justify-center gap-3 text-xs">
                      <a href={`tel:${MOBILE_NUMBER.replace(/\s+/g, '')}`} className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Call {MOBILE_NUMBER}
                      </a>
                      <span>•</span>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-bold">
                        WhatsApp {WHATSAPP_NUMBER}
                      </a>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-20 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-white">Your Cart is Empty</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Explore our pure Mysore Sandalwood and Kannauj Rose perfumes to add items to your cart.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#D4AF37] text-black font-bold text-xs uppercase rounded cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-5 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-white">Order Placed Successfully!</h3>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-[#D4AF37]">{customerInfo.name}</strong>! Your order number is <strong>#SS-2026-8891</strong>. We have sent the order confirmation and tracking link to your phone number.
            </p>

            <div className="p-3 bg-[#141414] border border-[#D4AF37]/40 rounded-xl text-xs space-y-1">
              <p className="text-zinc-300 font-medium">For instant delivery updates or queries:</p>
              <p className="text-[#D4AF37] font-bold">Call: {MOBILE_NUMBER} | WhatsApp: {WHATSAPP_NUMBER}</p>
            </div>

            <button
              onClick={() => {
                onClearCart();
                setCheckoutComplete(false);
                onClose();
              }}
              className="px-8 py-3 bg-[#D4AF37] text-black font-bold text-xs uppercase rounded shadow-xl cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
